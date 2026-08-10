import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { products } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Elevators & Escalators",
  description:
    "Tasheel Elevators & Escalators — passenger, freight, hospital, panoramic, MRL elevators, escalators, modernization, and AMC across Oman and the GCC.",
};

export default function ElevatorsDivisionPage() {
  return (
    <>
      <PageHero
        title="Tasheel Elevators & Escalators"
        description="Vertical mobility solutions engineered for safety, performance, and Gulf operating conditions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Divisions", href: "/divisions" },
          { label: "Elevators & Escalators" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Division of Tasheel Engineering
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              From shaft survey to lifelong AMC
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              We supply, install, modernize, and maintain elevators and escalators for commercial
              towers, hospitals, hotels, malls, residences, and government projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/products">
                  Browse products <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/quote">Request elevator proposal</Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-border bg-card p-5 transition hover:border-sky-300"
              >
                <h3 className="font-display font-semibold">{p.name}</h3>
                <p className="mt-2 text-xs text-muted">{p.tagline}</p>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-slate-50 p-8 dark:bg-white/5">
            <h3 className="font-display text-xl font-bold">Service capabilities</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "New installation & commissioning",
                "Modernization & controller upgrades",
                "Preventive AMC programmes",
                "24/7 emergency rescue & repairs",
                "Traffic analysis & consulting",
                "Genuine spare parts supply",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 text-sky-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
