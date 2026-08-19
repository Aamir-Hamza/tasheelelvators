"use client";

import { PageHero } from "@/components/shared/page-hero";
import { careers } from "@/lib/data/content";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export function CareersContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        titleKey="careers.title"
        descriptionKey="careers.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.careers" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-5 px-6">
          {careers.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold">{t(`catalog.${job.id}.title`)}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">{t(`catalog.${job.id}.description`)}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {t(`catalog.${job.id}.location`)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" /> {t(`catalog.${job.id}.type`)}
                  </span>
                </div>
              </div>
              <Button asChild>
                <a href={`mailto:${SITE.email}?subject=Application: ${job.title}`}>
                  {t("common.applyNow")}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
