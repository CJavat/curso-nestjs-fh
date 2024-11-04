"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();
    // Verificación de usuario.
    const userId = session?.user.id;
    if (!userId)
      return {
        ok: false,
        message: "No hay sessión de usuario",
      };

    // Obtener la información de los productos.
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((product) => product.productId),
        },
      },
    });

    // Calcular los montos.
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    // Totales de tax, subTotal y Total.
    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(
          (product) => product.id === item.productId
        );
        if (!product)
          throw new Error(
            `No se encontró el producto con ID ${item.productId}`
          );

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
      },
      { subTotal: 0, tax: 0, total: 0 }
    );

    // Crear la transacción de Base de Datos.
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos.
      const updatedProductsPromises = products.map((product) => {
        // Acomular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => acc + item.quantity, 0);
        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene una cantidad definida`);
        }
        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      // Verificar valores negativos en las existencias - No hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(`${product.title} no tiene inventario suficiente`);
      });

      // 2. Crear la orden - Encabezado - Detalles.
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      // Validar si el precio es 0, lanzar un error.

      // 3. Crear la dirección de la orden.
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
