"use client";

import { IoCalculatorOutline } from "react-icons/io5";
import { SimpleWidget } from "./SimpleWidget";
import { useEffect } from "react";
import { useAppSelector } from "@/stores";

export const WidgetsGrid = () => {
  const isCart = useAppSelector((state) => state.counter.count);

  return (
    <div className="flex flex-wrap p-2">
      <SimpleWidget
        title={isCart.toString()}
        subTitle="Redux Counter"
        icon={<IoCalculatorOutline size={50} className="text-blue-500" />}
        label="Contador"
        href="/dashboard/counter"
      />
    </div>
  );
};
