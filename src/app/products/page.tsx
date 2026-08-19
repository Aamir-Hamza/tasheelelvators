import type { Metadata } from "next";
import { ProductsContent } from "./products-content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Tasheel Elevators products—passenger, hospital, freight, home, panoramic, MRL elevators, escalators, and moving walkways.",
};

export default function ProductsPage() {
  return <ProductsContent />;
}
