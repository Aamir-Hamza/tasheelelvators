"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryData } from "@/data/servicesData";
import { useI18n } from "@/i18n/LanguageProvider";
import { BRAND_I18N_KEY } from "@/i18n/config";

export function CategoryHero({ content }: { content: CategoryData }) {
  const { t, locale } = useI18n();
  const prefix = `category.${BRAND_I18N_KEY[content.id]}`;
  const showEmbeddedBanner = Boolean(content.embeddedHeroCopy) && locale !== "ar";

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      aria-labelledby="category-hero-heading"
    >
      <div className="relative h-[62vh] min-h-[420px] max-h-[680px] sm:h-[74vh] sm:min-h-[520px] sm:max-h-none lg:h-[86vh] lg:min-h-[640px]">
        <Image
          src={content.heroImage}
          alt={content.heroImageAlt}
          fill
          priority
          quality={75}
          sizes="100vw"
          className={
            showEmbeddedBanner
              ? "object-cover object-center"
              : "scale-110 object-cover object-[88%_center]"
          }
        />
        {!showEmbeddedBanner && (
          <>
            <div className="absolute inset-0 bg-slate-950/55" aria-hidden />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-slate-950 from-[12%] via-slate-950/90 via-[52%] to-slate-950/20 rtl:bg-gradient-to-l",
                locale === "ar" && "from-[8%] via-slate-950/95 via-[68%] to-slate-950/50"
              )}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(ellipse at 20% 40%, ${content.theme.glow}, transparent 55%)`,
              }}
              aria-hidden
            />
          </>
        )}
        {showEmbeddedBanner && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/35 to-transparent"
            aria-hidden
          />
        )}

        <div
          className={cn(
            "relative z-10 flex h-full",
            showEmbeddedBanner ? "items-end" : "items-end sm:items-center"
          )}
        >
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
            {showEmbeddedBanner ? (
              <>
                <h1 id="category-hero-heading" className="sr-only">
                  {t(`${prefix}.embeddedHeadline`)}
                </h1>
                <Link href="/engineering#solutions" className="sr-only">
                  {t(`${prefix}.embeddedCta`)}
                </Link>
              </>
            ) : (
              <>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md sm:text-[11px]">
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
              </>
            )}

            <dl className={cn("grid max-w-3xl gap-3 sm:grid-cols-3", showEmbeddedBanner ? "mt-5" : "mt-10")}>
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </dd>
                  {stat.hint ? <p className="mt-1 text-xs text-slate-300">{stat.hint}</p> : null}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
