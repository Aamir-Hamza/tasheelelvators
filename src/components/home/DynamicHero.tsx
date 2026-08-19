"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBrand } from "@/context/BrandContext";
import { cn } from "@/lib/utils";
import { useTranslatedBrand } from "@/i18n/useBrandCopy";

export function DynamicHero() {
  const { brand } = useBrand();
  const copy = useTranslatedBrand(brand.id);
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950 h-[62svh] min-h-[400px] max-h-[620px] sm:h-[72svh] sm:min-h-[480px] sm:max-h-none lg:h-[86vh] lg:min-h-[620px]"
      aria-labelledby="brand-hero-heading"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={brand.id}
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduceMotion ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Crop to the photo side so baked-in slider typography is off-canvas */}
          <Image
            src={brand.hero.image}
            alt={brand.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-[88%_center] sm:object-[90%_center]"
          />

          {/* Full veil + left mask so image headlines never show through */}
          <div className="absolute inset-0 bg-slate-950/50" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950 from-[12%] via-slate-950/92 via-[52%] to-slate-950/25 rtl:bg-gradient-to-l"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 start-0 w-[min(100%,42rem)] bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent rtl:bg-gradient-to-l"
            aria-hidden
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-end sm:items-center">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-0 sm:pt-28 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${brand.id}-copy`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
              transition={{ duration: 0.35 }}
              className="max-w-xl lg:max-w-2xl"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:text-[11px]">
                {copy.eyebrow}
              </p>
              <h1
                id="brand-hero-heading"
                className="mt-3 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl"
              >
                {copy.headline}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg">
                {copy.subheadline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={brand.hero.primaryCta.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition sm:px-6 sm:py-3",
                    brand.colors.ctaClass
                  )}
                >
                  {copy.primaryCta}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
                <Link
                  href={brand.hero.secondaryCta.href}
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:px-6 sm:py-3"
                >
                  {copy.secondaryCta}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
