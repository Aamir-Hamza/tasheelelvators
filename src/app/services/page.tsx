import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { services } from "@/lib/data/services";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tasheel Elevators services—installation, maintenance & AMC, modernization, emergency repairs, and consultation across Oman and the GCC.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        description="Full-lifecycle support from first consultation through decades of reliable operation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-3xl border border-border bg-card p-8 transition hover:border-electric/30 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{service.name}</h2>
                  <p className="mt-2 text-sm text-electric">{service.tagline}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:text-electric" />
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
