export const revalidate = 0;

import { redirect } from "next/navigation";
import { Title } from "@/components";
import { UsersTable } from "./ui/UsersTable";

import { getPaginatedUsers } from "@/actions";

export const metadata = {
  title: "Usuarios (Admin)",
  description:
    "Administración de los usuarios, página solo válida para administradores",
};

export default async function AdminUsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();
  if (!ok) redirect("/auth/login");

  return (
    <>
      <Title title="Mantenimiento De Usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
