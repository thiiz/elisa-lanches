import { Product } from "../types";

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

interface HygraphAsset {
  url: string;
}

interface HygraphProduct {
  id: string;
  name: string;
  price: number;
  desc: string;
  img: HygraphAsset[];
  category: string;
}

interface ProductsResponse {
  products: HygraphProduct[];
}

async function fetchFromHygraph<T>(query: string): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (HYGRAPH_TOKEN) {
    headers["Authorization"] = `Bearer ${HYGRAPH_TOKEN}`;
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Hygraph API Error: ${response.status} ${response.statusText}`, errorText);
    throw new Error(`Hygraph fetch failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error("Hygraph errors:", json.errors);
    throw new Error(json.errors[0]?.message || "Unknown Hygraph error");
  }

  return json.data;
}

function mapHygraphProduct(product: HygraphProduct): Product {
  // Normaliza a categoria: "combosEspeciais" ou "combos_especiais" -> "combos especiais"
  const normalizedCategory = product.category
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase para space
    .replace(/_/g, " ") // snake_case para space
    .toLowerCase()
    .trim();

  return {
    id: product.id,
    name: product.name,
    desc: product.desc || "",
    price: product.price,
    img: product.img[0]?.url || "/placeholder.jpg",
    category: normalizedCategory as Product["category"],
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const query = `
    query GetAllProducts {
      products(stage: PUBLISHED) {
        id
        name
        price
        desc
        img {
          url
        }
        category
      }
    }
  `;

  const data = await fetchFromHygraph<ProductsResponse>(query);
  return data.products.map(mapHygraphProduct);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const categoryEnum = category.toUpperCase().replace(/ /g, "_");
  
  const query = `
    query GetProductsByCategory {
      products(where: { category: ${categoryEnum} }, stage: PUBLISHED) {
        id
        name
        price
        desc
        img {
          url
        }
        category
      }
    }
  `;

  const data = await fetchFromHygraph<ProductsResponse>(query);
  console.log();
  return data.products.map(mapHygraphProduct);
}

