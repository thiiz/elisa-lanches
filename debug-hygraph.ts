
import { getAllProducts } from "./lib/hygraph";

console.log("Testing Hygraph connection...");
// Masking the actual values for security in logs, but printing existence/length
console.log("Endpoint defined:", !!process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT);
console.log("Endpoint value (partial):", process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT?.substring(0, 20) + "...");
console.log("Token defined:", !!process.env.HYGRAPH_TOKEN);
console.log("Token length:", process.env.HYGRAPH_TOKEN?.length);

try {
  const products = await getAllProducts();
  console.log("Success! Products found:", products.length);
} catch (error) {
  console.error("Caught error during fetch:");
  console.error(error);
}
