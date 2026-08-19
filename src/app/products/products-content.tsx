"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { products } from "@/lib/data/products";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";
import { useI18n } from "@/i18n/LanguageProvider";

export function ProductsContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        titleKey="products.title"
        descriptionKey="products.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "products.title" }]}
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
                <span className="absolute start-4 top-4 rounded-full bg-black/35 px-3 py-1 text-xs text-silver">
                  {t(`catalog.${product.slug}.category`)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-xl font-semibold">{t(`catalog.${product.slug}.name`)}</h2>
                  <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-electric rtl:rotate-180" />
                </div>
                <p className="mt-2 text-sm text-muted">{t(`catalog.${product.slug}.tagline`)}</p>
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
