"use client";

import Link from "next/link";
import { ArrowRight, Check, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/home/cta-band";
import { SITE } from "@/lib/constants";
import { DIVISION_PORTALS, type DivisionPortal } from "@/data/division-portals";
import type { HeroSlideId } from "@/data/hero-slides";
import { useI18n } from "@/i18n/LanguageProvider";
import { useTranslatedBrand } from "@/i18n/useBrandCopy";
import type { DivisionId } from "@/config/brandsData";

const PORTAL_TO_BRAND: Record<HeroSlideId, DivisionId> = {
  elevators: "elevators",
  cctv: "smart-systems",
  maintenance: "engineering",
};

export function DivisionPortalPage({ id }: { id: HeroSlideId }) {
  const portal: DivisionPortal = DIVISION_PORTALS[id];
  const { t } = useI18n();
  const copy = useTranslatedBrand(PORTAL_TO_BRAND[id]);

  return (
    <>
      <PageHero
        title={copy.displayName}
        description={copy.subheadline}
        breadcrumbs={[
          { labelKey: "common.home", href: `/?division=${id}` },
          { labelKey: "nav.divisions", href: "/divisions" },
          { label: copy.displayName },
        ]}
      />

      <section className="border-b border-border bg-slate-50 py-10 dark:bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-3">
          {portal.heroStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card px-5 py-4">
              <p className="font-mono text-2xl font-semibold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="solutions" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.22em] ${portal.accentClass}`}>
            {portal.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
            {t("portal.productsSolutions")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {t("portal.productsBody")}
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portal.solutions.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-slate-950 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            {t("portal.caseStudies")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            {t("portal.projectsTitle")}
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {portal.projects.map((project) => (
              <article
                key={project.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  {project.location}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.summary}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="secondary" className="rounded-full">
              <Link href="/projects">
                {t("portal.viewAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="amc" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t("portal.amcTitle")}</h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {t("portal.amcBody")}
          </p>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {portal.amcPlans.map((plan) => (
              <div key={plan.name} className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted">{plan.summary}</p>
                <ul className="mt-5 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className={`mt-6 rounded-full ${portal.accentBtnClass}`}>
                  <Link
                    href={`/plans/checkout?division=${portal.id}&plan=${encodeURIComponent(plan.name)}`}
                  >
                    {t("portal.requestPlan")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-border bg-slate-50 py-20 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <p className={`font-mono text-xs font-semibold uppercase tracking-[0.22em] ${portal.accentClass}`}>
                {t("portal.divisionContact")}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold">{t("portal.talkToTeam")}</h2>
              <p className="mt-4 text-muted leading-relaxed">{portal.contactBlurb}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className={`rounded-full ${portal.accentBtnClass}`}>
                  <Link href={portal.quoteHref}>
                    {t("portal.getQuote")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/contact">{t("portal.contactForm")}</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 rounded-2xl border border-border px-5 py-4 transition hover:border-sky-300"
              >
                <Phone className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="text-sm font-semibold">{t("common.callNow")}</p>
                  <p className="text-sm text-muted">{SITE.phone}</p>
                </div>
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border px-5 py-4 transition hover:border-emerald-300"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold">{t("common.whatsapp")}</p>
                  <p className="text-sm text-muted">{SITE.whatsapp}</p>
                </div>
              </a>
              <div className="rounded-2xl border border-border px-5 py-4 text-sm text-muted">
                <p className="font-semibold text-foreground">{t("contact.office")}</p>
                <p className="mt-1">{t("contact.address")}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-amber-600">
                  {t("common.emergency")}: {SITE.emergency}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
