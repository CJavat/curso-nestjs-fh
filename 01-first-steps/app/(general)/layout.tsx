import { Navbar } from "@/components";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center p-24">
        <h1 className="text-lg">Holla Mundo</h1>
        {children}
      </main>
    </>
  );
}
