"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { currencyFormatted } from "@/utils";
import { useAddressStore, useCartStore } from "@/store";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";

interface SumaryInformation {
  tax: number;
  subTotal: number;
  total: number;
  itemsInCart: number;
}

export const PlaceOrder = () => {
  const router = useRouter();

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSumaryInformation = useCartStore(
    (state) => state.getSumaryInformation
  );

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [summary, setSummary] = useState<SumaryInformation>({
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
  }, [getSumaryInformation]);

  useEffect(() => {
    if (loaded && cart.length === 0) {
      router.replace("/empty");
    }
  }, [cart, loaded]);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    //* Todo salió bien.
    clearCart();
    router.replace(`/orders/${resp.order?.id}`);
    setIsPlacingOrder(false);
    setErrorMessage("");
  };

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de Entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

      <h2 className="text-2xl mb-2">Resumen de Orden</h2>

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

      <div className="mb-2 mt-5 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot;Colocar Orden &quot;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>

        {errorMessage && (
          <p className="text-red-500 font-bold my-2 text-xs">{errorMessage}</p>
        )}
        <button
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={onPlaceOrder}
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
