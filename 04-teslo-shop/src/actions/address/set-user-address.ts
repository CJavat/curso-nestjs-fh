"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddres = async (address: Address, userId: string) => {
  try {
    const newAddres = await createOrRepalceAddress(address, userId);

    return {
      ok: true,
      message: "Dirección guardada correctamente",
      address: newAddres,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo guardar la dirección",
    };
  }
};

const createOrRepalceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);

    throw new Error("No se pudo guardar la dirección");
  }
};
