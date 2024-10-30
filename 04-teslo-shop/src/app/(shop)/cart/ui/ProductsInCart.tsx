"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";

interface Props {}

export const ProductsInCart = ({}: Props) => {
  const updateProductQuantity = useCartStore(
    (state) => state.UpdateProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

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
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              {product.size + "-" + product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
              quantity={product.quantity}
            />
            <button
              onClick={() => removeProductFromCart(product)}
              className="underline hover:text-blue-500 mt-3"
            >
              Eliminar Producto
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
