"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryData } from "@/data/servicesData";

export function CategoryHero({ content }: { content: CategoryData }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      aria-labelledby="category-hero-heading"
    >
      <div className="relative h-[62svh] min-h-[420px] max-h-[680px] sm:h-[74svh] sm:min-h-[520px] sm:max-h-none lg:h-[86vh] lg:min-h-[640px]">
        <Image
          src={content.heroImage}
          alt={content.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover object-[88%_center]"
        />
        <div className="absolute inset-0 bg-slate-950/55" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950 from-[12%] via-slate-950/90 via-[52%] to-slate-950/20 rtl:bg-gradient-to-l"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at 20% 40%, ${content.theme.glow}, transparent 55%)`,
          }}
          aria-hidden
        />

        <div className="relative z-10 flex h-full items-end sm:items-center">
          <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-0 sm:pt-28 lg:px-8">
            <p
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md sm:text-[11px]"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: content.theme.accent }}
                aria-hidden
              />
              {content.label}
            </p>
            <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 sm:text-[11px]">
              {content.eyebrow}
            </p>
            <h1
              id="category-hero-heading"
              className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {content.headline}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg">
              {content.subheadline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={content.primaryCta.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition sm:px-6 sm:py-3",
                  content.theme.cta
                )}
              >
                {content.primaryCta.label}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:px-6 sm:py-3"
              >
                {content.secondaryCta.label}
              </Link>
            </div>

            <dl className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {content.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </dd>
                  {stat.hint ? <p className="mt-1 text-xs text-slate-300">{stat.hint}</p> : null}
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
