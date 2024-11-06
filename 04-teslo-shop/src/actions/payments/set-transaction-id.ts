"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { transactionId },
    });
    if (!order) throw new Error("No se encontró la orden");

    return { ok: true, message: "Orden actualizada correctamente" };
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};
