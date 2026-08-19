"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ArrowUpRight,
  Cpu,
  Video,
  HardHat,
  KeyRound,
  PenTool,
  RefreshCw,
  ShieldCheck,
  Wrench,
  Building2,
} from "lucide-react";
import { useBrand } from "@/context/BrandContext";
import { SectionHeading } from "@/components/shared/section-heading";
import type { BrandService } from "@/config/brandsData";
import { useI18n } from "@/i18n/LanguageProvider";
import { useTranslatedBrand } from "@/i18n/useBrandCopy";

const ICONS: Record<BrandService["icon"], typeof PenTool> = {
  Building2,
  Wrench,
  Video,
  KeyRound,
  Cpu,
  ArrowUpDown,
  RefreshCw,
  ShieldCheck,
  PenTool,
  HardHat,
};

export function ServicesSection() {
  const { brand } = useBrand();
  const { t } = useI18n();
  const copy = useTranslatedBrand(brand.id);

  return (
    <section id="services" className="py-24 md:py-32" aria-labelledby="brand-services-heading">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={copy.servicesEyebrow}
          title={copy.servicesTitle}
          description={copy.servicesDescription}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {brand.services.map((service, i) => {
              const Icon = ICONS[service.icon];
              const translated = copy.service(i);
              return (
                <motion.div
                  key={service.href + i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={service.href}
                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-slate-900"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: brand.colors.soft, color: brand.colors.hex }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-slate-900 dark:text-white">
                      {translated.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{translated.description}</p>
                    <span
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                      style={{ color: brand.colors.hex }}
                    >
                      {t("common.learnMore")}{" "}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
