import { HomeClient } from "@/components/home-client";
import { getAllProducts } from "@/lib/hygraph";

export default async function Home() {
  const allProducts = await getAllProducts();
  
  // Agrupa os produtos por categoria dinamicamente
  const productsByCategory = allProducts.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, typeof allProducts>);

  return <HomeClient productsByCategory={productsByCategory} />;
}
