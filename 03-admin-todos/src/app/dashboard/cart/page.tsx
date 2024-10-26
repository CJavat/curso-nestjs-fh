import { cookies } from "next/headers";

import { ItemCard } from "@/shopping-cart";

import type { Product } from "@/products/data/products";
import { products } from "@/products/data/products";
import { WidgetItem } from "@/components";

export const metadata = {
  title: "Carrito de Compras",
  description: "Productos en el carrito de compras",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const productId of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === productId);

    if (product) {
      productsInCart.push({ product, quantity: cart[productId] });
    }
  }

  return productsInCart;
};

export default async function CartPage() {
  const cookiesStore = await cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };

  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce(
    (acc, curr) => curr.product.price * curr.quantity + acc,
    0
  );

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map((item) => (
            <ItemCard key={item.product.id} {...item} />
          ))}
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos del 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
