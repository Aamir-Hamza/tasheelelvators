"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, ShieldCheck, Wifi } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export function SmartHomeFeature() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[#0c0a09] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(180,140,60,0.12),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Half image — top lifestyle crop of the ORVIBO collage */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]"
        >
          <Image
            src="/cctv/orvibo-smart-lock.png"
            alt="ORVIBO smart door lock in a luxury smart home living space"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_12%] transition duration-700 hover:scale-[1.03]"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0a09]/80 max-lg:bg-gradient-to-t max-lg:from-[#0c0a09] max-lg:via-[#0c0a09]/40 max-lg:to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8">
            <span className="inline-flex rounded-full border border-amber-400/30 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200/90 backdrop-blur-sm">
              {t("home.smartAccess")}
            </span>
          </div>
        </motion.div>

        {/* Copy half */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative flex flex-col justify-center px-6 py-14 md:px-12 md:py-20 lg:px-14"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400/90">
            {t("home.smartEyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {t("home.smartTitle")}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-stone-300">
            {t("home.smartBody")}
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Fingerprint, label: t("home.smartF0") },
              { icon: Wifi, label: t("home.smartF1") },
              { icon: ShieldCheck, label: t("home.smartF2") },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-start gap-3 border-s border-amber-500/25 ps-3"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm leading-snug text-stone-300">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/smart-systems"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
            >
              {t("home.smartExplore")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/quote?service=security-audit"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-400/50 hover:bg-white/5"
            >
              {t("home.smartAudit")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
