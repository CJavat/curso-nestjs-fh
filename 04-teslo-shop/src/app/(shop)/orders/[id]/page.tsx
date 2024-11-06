import Image from "next/image";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { PayPalButton, Title } from "@/components";

import { currencyFormatted } from "../../../../utils/currencyFormatter";
import { getOrderById } from "@/actions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  //* Server Action
  const { ok, message, order } = await getOrderById(id);
  if (!ok) redirect("/");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs text-white mb-5",
                {
                  "bg-red-500": !order?.isPaid,
                  "bg-green-700": order?.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              {order?.isPaid ? (
                <span className="mx-2">Orden Pagada</span>
              ) : (
                <span className="mx-2">Pendiente De Pago</span>
              )}
            </div>

            {/* Items */}
            {order?.OrderItem.map((item) => (
              <div
                key={`${item.product.slug}-${item.size}`}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{ width: "100px", height: "100px" }}
                />

                <div>
                  <p>
                    {item.size} - {item.product.title}
                  </p>
                  <p>
                    {currencyFormatted(item.product.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormatted(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de Entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {order?.OrderAddress?.firstName} {order?.OrderAddress?.lastName}
              </p>
              <p>{order?.OrderAddress?.address} Privada Hidalgo #8</p>
              <p>{order?.OrderAddress?.address2} Col. Indígena De Mezquitán</p>
              <p>
                {order?.OrderAddress?.city},{order?.OrderAddress?.country.name}
              </p>
              <p>{order?.OrderAddress?.postalCode}</p>
              <p>{order?.OrderAddress?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Resumen de Orden</h2>

            <div className="grid grid-cols-2">
              <span className="">No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span className="">Subtotal</span>
              <span className="text-right">
                {currencyFormatted(order!.subTotal)}
              </span>

              <span className="">Impuestos (15%)</span>
              <span className="text-right">
                {currencyFormatted(order!.tax)}
              </span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">
                {currencyFormatted(order!.total)}
              </span>
            </div>

            <div className="mb-2 mt-5 w-full">
              <PayPalButton amount={order!.total} orderId={order!.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
