import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { coreServices } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tasheel Engineering services — engineering design & consulting, comprehensive maintenance, systems auditing, and emergency response across Oman and the GCC.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        description="Design, maintain, audit, and respond — the core engineering capabilities behind every Tasheel division."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2">
          {coreServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-3xl border border-border bg-card p-8 transition hover:border-sky-300 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{service.name}</h2>
                  <p className="mt-2 text-sm text-sky-700">{service.tagline}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:text-sky-600" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
