import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { products } from "@/lib/data/products";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download Tasheel Elevators product brochures and technical documents.",
};

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        title="Download Center"
        description="Brochures and specification sheets for architects, consultants, and contractors."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Downloads" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.slug}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div>
                <h2 className="font-display text-lg font-semibold">{product.name}</h2>
                <p className="mt-1 text-sm text-muted">PDF brochure</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={product.brochure}>
                  <Download className="h-4 w-4" /> Download
                </a>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
