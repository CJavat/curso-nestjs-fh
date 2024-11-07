export const revalidate = 60;

import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

import type { Gender } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log(parent);

  // read route params
  const gender = (await params).gender;

  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Todos",
  };

  return {
    title: `Categoría: ${labels[gender]}`,
    description: `Mira todos nuestros productos de ${gender} y agrega al carrito los artículos que más te gusten`,

    openGraph: {
      title: `${gender}`,
      description: `Mira todos nuestros productos de ${gender} y agrega al carrito los artículos que más te gusten`,
      images: [`/teslo-shop-logo.png`],
    },
  };
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
