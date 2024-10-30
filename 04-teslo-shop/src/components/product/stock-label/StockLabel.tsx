"use client";

import { useEffect, useState } from "react";
import { getStockBySlug } from "@/actions";

import { titleFont } from "@/config/fonts";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = async () => {
    setIsLoading(true);
    const inStock = await getStockBySlug(slug);

    setStock(inStock);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <>
      {isLoading ? (
        <p className={`bg-gray-400 animate-pulse`}>&nbsp;</p>
      ) : (
        <p className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </p>
      )}
    </>
  );
};
