import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { DIVISIONS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Divisions",
  description:
    "Tasheel Engineering divisions — Elevators & Escalators and CCTV & Smart Home systems across Oman and the GCC.",
};

export default function DivisionsPage() {
  return (
    <>
      <PageHero
        title="Our Divisions"
        description="Specialized arms of Tasheel Engineering — vertical mobility and intelligent security."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Divisions" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {DIVISIONS.map((d) => (
            <Link
              key={d.slug}
              href={d.href}
              className="group rounded-3xl border border-border bg-card p-8 transition hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">{d.name}</h2>
                <ArrowUpRight className="h-5 w-5 text-muted group-hover:text-sky-600" />
              </div>
              <p className="mt-2 text-sm text-sky-700">{d.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{d.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
