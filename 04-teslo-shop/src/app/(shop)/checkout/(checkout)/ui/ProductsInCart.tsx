"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import { currencyFormatted } from "@/utils";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{ width: "100px", height: "100px" }}
          />

          <div>
            <span>{`${product.size}-${product.title} (${product.quantity})`}</span>
            <p className="font-bold">
              {currencyFormatted(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
