import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface Props {
  children: React.ReactNode;
}

export default async function CheckoutLayout({ children }: Props) {
  const session = await auth();

  if (!session?.user) redirect("/auth/login?redirectTo=/checkout/address");

  return <>{children}</>;
}
