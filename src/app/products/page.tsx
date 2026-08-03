import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { products } from "@/lib/data/products";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Tasheel Elevators products—passenger, hospital, freight, home, panoramic, MRL elevators, escalators, and moving walkways.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products"
        description="Premium elevators and people-moving systems engineered for safety, performance, and Gulf operating conditions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-navy via-navy-deep to-[#0d2848] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,143,255,0.3),transparent_55%)]" />
                <span className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 text-xs text-silver">
                  {product.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-xl font-semibold">{product.name}</h2>
                  <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-electric" />
                </div>
                <p className="mt-2 text-sm text-muted">{product.tagline}</p>
                <div className="mt-4 flex gap-4 text-xs text-muted">
                  <span>{product.capacity}</span>
                  <span>{product.speed}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
