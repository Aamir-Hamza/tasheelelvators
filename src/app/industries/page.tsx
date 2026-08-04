import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { CtaBand } from "@/components/home/cta-band";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Tasheel Elevators solutions for commercial, residential, hospitality, healthcare, retail, and government projects across Oman and the GCC.",
};

const industries = [
  {
    title: "Commercial Towers",
    description: "High-traffic passenger systems with destination control and regenerative drives.",
    href: "/projects",
  },
  {
    title: "Residential & Villas",
    description: "Quiet MRL and home elevators tailored for apartments and luxury villas.",
    href: "/products/home-elevators",
  },
  {
    title: "Hotels & Hospitality",
    description: "Guest, service, and panoramic elevators designed for continuous operations.",
    href: "/projects",
  },
  {
    title: "Hospitals & Healthcare",
    description: "Bed elevators with hygienic finishes, precise leveling, and emergency modes.",
    href: "/products/hospital-elevators",
  },
  {
    title: "Shopping Malls",
    description: "Escalators, moving walkways, and public elevators for peak retail traffic.",
    href: "/products/escalators",
  },
  {
    title: "Government & Institutions",
    description: "Secure, reliable vertical transport with audit-ready documentation.",
    href: "/services",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Industries"
        description="Vertical mobility engineered for the buildings that define Oman and the GCC."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-border bg-card p-7 transition hover:border-electric/30 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-xl font-semibold">{item.title}</h2>
                <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-electric" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
