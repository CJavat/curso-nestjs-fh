import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Address } from "@/interfaces";

interface State {
  address: Address;

  // Methods
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
