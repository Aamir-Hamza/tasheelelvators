"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { getCoreService } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";
import { useI18n } from "@/i18n/LanguageProvider";

export function ServiceDetailContent({ slug }: { slug: string }) {
  const { t } = useI18n();
  const service = getCoreService(slug);
  if (!service) return null;

  return (
    <>
      <PageHero
        title={t(`catalog.${slug}.name`)}
        description={t(`catalog.${slug}.tagline`)}
        breadcrumbs={[
          { labelKey: "common.home", href: "/" },
          { labelKey: "nav.services", href: "/services" },
          { label: t(`catalog.${slug}.name`) },
        ]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="max-w-3xl text-lg text-muted leading-relaxed">{t(`catalog.${slug}.description`)}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <Check className="mt-0.5 h-5 w-5 text-sky-600" />
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-10" size="lg">
            <Link href="/quote">
              {t("common.discussProject")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
