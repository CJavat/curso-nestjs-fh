import { cookies } from "next/headers";

import { TabBar } from "@/todos";

export const metadata = {
  title: "Cookies Page",
  description: "Página para aprender sobre el uso de Cookies",
};

export default async function CookiesPage() {
  const cookieStore = await cookies();
  const cookieTab = cookieStore.get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className=" flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={+cookieTab} />
      </div>
    </div>
  );
}
