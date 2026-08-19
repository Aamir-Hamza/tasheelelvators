"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Camera, Wrench } from "lucide-react";
import { DIVISIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/LanguageProvider";

const COPY_KEYS = {
  elevators: {
    name: "brand.elevators.name",
    tagline: "divisionsList.elevatorsTagline",
    desc: "divisionsList.elevatorsDesc",
    highlights: [
      "divisionsList.elevatorsH0",
      "divisionsList.elevatorsH1",
      "divisionsList.elevatorsH2",
      "divisionsList.elevatorsH3",
    ],
    cta: "divisionsList.elevatorsCta",
  },
  "cctv-smart-home": {
    name: "brand.smartSystems.name",
    tagline: "divisionsList.smartTagline",
    desc: "divisionsList.smartDesc",
    highlights: [
      "divisionsList.smartH0",
      "divisionsList.smartH1",
      "divisionsList.smartH2",
      "divisionsList.smartH3",
    ],
    cta: "divisionsList.smartCta",
  },
  engineering: {
    name: "brand.engineering.name",
    tagline: "divisionsList.engTagline",
    desc: "divisionsList.engDesc",
    highlights: [
      "divisionsList.engH0",
      "divisionsList.engH1",
      "divisionsList.engH2",
      "divisionsList.engH3",
    ],
    cta: "divisionsList.engCta",
  },
} as const;

export function DivisionsSpotlight() {
  const { t } = useI18n();

  return (
    <section
      id="divisions"
      className="border-y border-slate-200 bg-slate-50 py-24 dark:border-white/10 dark:bg-slate-950/50 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t("home.divisionsEyebrow")}
          title={t("home.divisionsTitle")}
          description={t("home.divisionsDescription")}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {DIVISIONS.map((division, i) => {
            const keys = COPY_KEYS[division.slug];
            const Icon =
              division.accent === "cyan"
                ? Building2
                : division.accent === "amber"
                  ? Camera
                  : Wrench;
            const tone =
              division.accent === "cyan"
                ? {
                    glow: "bg-[radial-gradient(circle_at_top_right,rgba(2,132,199,0.12),transparent_55%)]",
                    icon: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
                    label: "text-sky-700",
                    btn: "bg-sky-600 hover:bg-sky-500",
                  }
                : division.accent === "amber"
                  ? {
                      glow: "bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.14),transparent_55%)]",
                      icon: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
                      label: "text-amber-700",
                      btn: "bg-amber-600 hover:bg-amber-500",
                    }
                  : {
                      glow: "bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_55%)]",
                      icon: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-sky-300",
                      label: "text-sky-700",
                      btn: "bg-slate-800 hover:bg-slate-700",
                    };

            return (
              <motion.article
                key={division.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900 md:p-10"
              >
                <div
                  className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 ${tone.glow}`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tone.icon}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p
                    className={`mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.label}`}
                  >
                    {t("home.divisionPortal")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                    {t(keys.name)}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">{t(keys.tagline)}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {t(keys.desc)}
                  </p>
                  <ul className="mt-6 grid gap-2">
                    {keys.highlights.map((item) => (
                      <li key={item} className="text-sm text-slate-600 dark:text-slate-400">
                        · {t(item)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={division.href}
                    className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] ${tone.btn}`}
                  >
                    {t(keys.cta)} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
