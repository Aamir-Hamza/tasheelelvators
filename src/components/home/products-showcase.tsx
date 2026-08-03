"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/data/products";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function ProductsShowcase() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Products"
            title="Engineered for every building typology"
            description="Passenger, hospital, freight, panoramic, MRL, escalators, and moving walkways—specified for Gulf climates and international codes."
          />
          <Button asChild variant="outline" className="shrink-0 self-start md:self-auto">
            <Link href="/products">
              View all products <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-border bg-card transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-[#0d2848]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,143,255,0.35),transparent_55%)] transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-electric-bright">
                      {product.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-silver/75">{product.tagline}</p>
                    <div className="mt-4 flex gap-4 text-xs text-white/60">
                      <span>{product.capacity}</span>
                      <span>{product.speed}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
