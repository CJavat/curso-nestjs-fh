import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";

import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

interface Props {
  params: {
    id: Category;
  };
}

const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  const products = seedProducts.filter((product) => product.gender === id);
  const labels: Record<Category, string> = {
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
        title={labels[id]}
        subtitle={`Artículos Para ${labels[id]}`}
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
