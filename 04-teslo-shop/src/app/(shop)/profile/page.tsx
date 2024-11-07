import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Title } from "@/components";
import { auth } from "@/auth.config";

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const session = await auth();

  const userName = session?.user.name ?? "No Name";

  return {
    title: `Perfil De ${userName}`,
    description: "Información del perfil del usuario logeado",

    openGraph: {
      title: `Perfil De ${userName}`,
      description: "Información del perfil del usuario logeado",
      images: [`${session?.user.image}`],
    },
  };
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session.user, null, 4)}</pre>
      {session.user.role}
    </div>
  );
}
