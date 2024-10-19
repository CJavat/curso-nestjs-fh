import { CartCounter } from "@/shopping-cart";

export const metadata = {
  title: "Counter Page",
  description: "Se muestra los productos que están en el carrito",
};

export default function CounterPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>

      <CartCounter value={20} />
    </div>
  );
}
