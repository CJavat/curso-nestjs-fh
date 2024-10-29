export const revalidate = 60;

import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

import type { Gender } from "@prisma/client";

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;
  // const {page} =await searchParams;
  const page = (await searchParams).page
    ? parseInt((await searchParams).page ?? "")
    : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });
  if (products.length === 0) redirect(`/gender/${gender}`);

  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Todos",
  };

  // if (id !== "kid" || id !== "men" || id !== "women") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={labels[gender]}
        subtitle={`Artículos Para ${labels[gender]}`}
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
