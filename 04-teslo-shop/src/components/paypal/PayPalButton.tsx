"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import type { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending)
    return (
      <div className="animate-pulse mb-10">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          // invoice_id: 'order_id',
          amount: {
            value: `${roundedAmount}`,
            currency_code: "USD",
          },
        },
      ],
    });

    const { ok, message } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      console.log(message);
      throw new Error(message);
    }

    console.log("Transaction completed!", transactionId);

    return transactionId;
  };

  return <PayPalButtons createOrder={createOrder} />;
};
