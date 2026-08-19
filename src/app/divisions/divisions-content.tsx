"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { DIVISIONS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";
import { useI18n } from "@/i18n/LanguageProvider";

const COPY = {
  elevators: {
    name: "brand.elevators.name",
    tagline: "divisionsList.elevatorsTagline",
    desc: "divisionsList.elevatorsDesc",
  },
  "cctv-smart-home": {
    name: "brand.smartSystems.name",
    tagline: "divisionsList.smartTagline",
    desc: "divisionsList.smartDesc",
  },
  engineering: {
    name: "brand.engineering.name",
    tagline: "divisionsList.engTagline",
    desc: "divisionsList.engDesc",
  },
} as const;

export function DivisionsContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        titleKey="divisionsPage.title"
        descriptionKey="divisionsPage.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.divisions" }]}
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
                <h2 className="font-display text-2xl font-bold">{t(COPY[d.slug].name)}</h2>
                <ArrowUpRight className="h-5 w-5 text-muted group-hover:text-sky-600 rtl:rotate-180" />
              </div>
              <p className="mt-2 text-sm text-sky-700">{t(COPY[d.slug].tagline)}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t(COPY[d.slug].desc)}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
