"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormatted } from "@/utils";

export const OrderSumary = () => {
  const cart = useCartStore((state) => state.cart);
  const getSumaryInformation = useCartStore(
    (state) => state.getSumaryInformation
  );
  const [loaded, setLoaded] = useState(false);
  const [summary, setSummary] = useState<{
    tax: number;
    subTotal: number;
    total: number;
    itemsInCart: number;
  }>({
    tax: 0,
    subTotal: 0,
    total: 0,
    itemsInCart: 0,
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    setSummary(getSumaryInformation());
  }, [cart, getSumaryInformation]);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <span className="">No. Productos</span>
        <span className="text-right">
          {summary.itemsInCart === 1
            ? "1 artículo"
            : `${summary.itemsInCart} artículos`}
        </span>

        <span className="">Subtotal</span>
        <span className="text-right">
          {currencyFormatted(summary.subTotal)}
        </span>

        <span className="">Impuestos (15%)</span>
        <span className="text-right">{currencyFormatted(summary.tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormatted(summary.total)}
        </span>
      </div>
    </>
  );
};
