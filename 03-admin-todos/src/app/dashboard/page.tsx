import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { WidgetItem } from "@/components";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <WidgetItem title="Usuario conectado S-Side">
        <Image
          src={session.user?.image ?? ""}
          alt={session.user?.name ?? ""}
          width={500}
          height={500}
        />
        <h2 className="text-2xl text-blue-500">{session.user?.name}</h2>
        <p className="text-gray-600">{session.user?.email}</p>

        <pre className="text-red-500 font-bold overflow-x-auto">
          {JSON.stringify(session.user, null, 2)}
        </pre>
      </WidgetItem>
    </div>
  );
}
