"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { coreServices } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";
import { useI18n } from "@/i18n/LanguageProvider";

export function ServicesContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        titleKey="services.title"
        descriptionKey="services.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.services" }]}
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
                  <h2 className="font-display text-2xl font-semibold">
                    {t(`catalog.${service.slug}.name`)}
                  </h2>
                  <p className="mt-2 text-sm text-sky-700">{t(`catalog.${service.slug}.tagline`)}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:text-sky-600 rtl:rotate-180" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {t(`catalog.${service.slug}.description`)}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
