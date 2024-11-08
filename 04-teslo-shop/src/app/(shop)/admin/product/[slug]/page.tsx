import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log(parent);

  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",

    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") redirect("/admin/products");

  const title = slug === "new" ? "Nuevo Producto" : "Editar Producto";

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
