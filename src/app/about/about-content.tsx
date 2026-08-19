"use client";

import { SITE, DIVISIONS } from "@/lib/constants";
import { CtaBand } from "@/components/home/cta-band";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { useI18n } from "@/i18n/LanguageProvider";

const DIVISION_NAME_KEYS = {
  elevators: "brand.elevators.short",
  "cctv-smart-home": "brand.smartSystems.short",
  engineering: "brand.engineering.short",
} as const;

const DIVISION_TAGLINE_KEYS = {
  elevators: "divisionsList.elevatorsTagline",
  "cctv-smart-home": "divisionsList.smartTagline",
  engineering: "divisionsList.engTagline",
} as const;

export function AboutContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        titleKey="about.title"
        descriptionKey="about.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.about" }]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              {t("about.mission")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{t("about.missionTitle")}</h2>
            <p className="mt-5 text-muted leading-relaxed">{t("about.missionBody")}</p>
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
              {t("about.vision")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{t("about.visionTitle")}</h2>
            <p className="mt-5 text-muted leading-relaxed">{t("about.visionBody")}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-slate-50 py-20 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold">{t("about.structure")}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 md:col-span-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-700">
                {t("about.parent")}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{SITE.name}</h3>
              <p className="mt-3 text-sm text-muted">{t("about.parentBody")}</p>
            </div>
            {DIVISIONS.map((d) => (
              <Link
                key={d.slug}
                href={d.href}
                className="rounded-2xl border border-border bg-card p-6 transition hover:border-sky-300"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700">
                  {t("about.division")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {t(DIVISION_NAME_KEYS[d.slug])}
                </h3>
                <p className="mt-3 text-sm text-muted">{t(DIVISION_TAGLINE_KEYS[d.slug])}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-sky-300">{t("about.leadership")}</p>
          <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug md:text-3xl">
            “{t("about.quote")}”
          </blockquote>
          <p className="mt-6 text-slate-400">
            {t("about.team")} · {SITE.legalName}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
