export const revalidate = 60;

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export const metadata = {
  title: "Inicio",
  description:
    "Teslo Shop es la mejor tienda de ropa que puedes encontrar en este universo, anímate a comprar con nosotros y te aseguramos que no te vas a arrepentir.",
};

export default async function Home({ searchParams }: Props) {
  const page = (await searchParams).page
    ? parseInt((await searchParams).page ?? "")
    : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });
  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Tienda" subtitle="Todos Los Productos" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
