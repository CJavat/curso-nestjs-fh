"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  console.log(userId);
  try {
    if (!userId) return;

    await prisma.userAddress.delete({ where: { userId: userId } });

    return {
      ok: true,
      message: "Dirección borrada correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo borrar la dirección",
    };

    // throw new Error("Ocurrió un error al borrar la dirección");
  }
};
