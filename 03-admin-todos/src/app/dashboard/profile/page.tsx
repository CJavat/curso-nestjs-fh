"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("client side");
  }, []);

  return (
    <div>
      <h1>Hello Profile Page</h1>
      <hr />

      <div className="flex flex-col">
        {session?.user?.image && (
          <Image
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
            width={500}
            height={500}
          />
        )}
        <h2 className="text-2xl text-blue-500">
          {session?.user?.name ?? "No name"}
        </h2>
        <p className="text-gray-600">{session?.user?.email ?? "No email"}</p>
      </div>
    </div>
  );
}
