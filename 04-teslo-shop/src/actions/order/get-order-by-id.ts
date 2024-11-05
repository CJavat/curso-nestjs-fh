"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  try {
    const session = await auth();
    if (!session?.user)
      return { ok: false, message: "Debes estar autenticado" };

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          include: {
            country: {
              select: {
                name: true,
              },
            },
          },
        },
        OrderItem: {
          include: {
            product: {
              include: {
                ProductImage: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) return { ok: false, message: "Order no encontrada" };
    if (session.user.role === "user") {
      if (session.user.id !== order.userId) throw `${id} no es de ese usuario`;
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo obtener la orden" + error,
    };
  }
};
