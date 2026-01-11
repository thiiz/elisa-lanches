import { HomeClient } from "@/components/home-client";
import { getAllProducts } from "@/lib/hygraph";

export default async function Home() {
  const allProducts = await getAllProducts();
  const products = allProducts.filter((p) => p.category === "nossos salgados");
  const combos = allProducts.filter((p) => p.category === "combos especiais");

  return <HomeClient products={products} combos={combos} />;
}
