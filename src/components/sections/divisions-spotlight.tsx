"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Camera } from "lucide-react";
import { DIVISIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";

export function DivisionsSpotlight() {
  return (
    <section id="divisions" className="border-y border-slate-200 bg-slate-50 py-24 dark:border-white/10 dark:bg-slate-950/50 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Specialized Divisions"
          title="One engineering house. Two precision arms."
          description="Tasheel Engineering leads design and maintenance — while dedicated divisions deliver vertical mobility and intelligent security."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {DIVISIONS.map((division, i) => {
            const isCyan = division.accent === "cyan";
            const Icon = isCyan ? Building2 : Camera;
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
                  className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 ${
                    isCyan
                      ? "bg-[radial-gradient(circle_at_top_right,rgba(2,132,199,0.12),transparent_55%)]"
                      : "bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.14),transparent_55%)]"
                  }`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isCyan
                        ? "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p
                    className={`mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      isCyan ? "text-sky-700" : "text-amber-700"
                    }`}
                  >
                    Division
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                    {division.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">{division.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {division.description}
                  </p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {division.highlights.map((item) => (
                      <li key={item} className="text-sm text-slate-600 dark:text-slate-400">
                        · {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={division.href}
                    className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] ${
                      isCyan ? "bg-sky-600 hover:bg-sky-500" : "bg-amber-600 hover:bg-amber-500"
                    }`}
                  >
                    {division.cta} <ArrowRight className="h-4 w-4" />
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
