"use client";

import { motion } from "framer-motion";
import { Shield, Award, FileCheck, BadgeCheck } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

const items = [
  { icon: Shield, titleKey: "home.safety0Title", textKey: "home.safety0Text" },
  { icon: Award, titleKey: "home.safety1Title", textKey: "home.safety1Text" },
  { icon: FileCheck, titleKey: "home.safety2Title", textKey: "home.safety2Text" },
  { icon: BadgeCheck, titleKey: "home.safety3Title", textKey: "home.safety3Text" },
] as const;

export function SafetyBanner() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] bg-slate-900 px-8 py-12 text-white md:px-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
            {t("home.safetyEyebrow")}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
            {t("home.safetyTitle")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <item.icon className="h-5 w-5 text-sky-300" />
                <h3 className="mt-4 font-semibold">{t(item.titleKey)}</h3>
                <p className="mt-2 text-sm text-slate-400">{t(item.textKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
