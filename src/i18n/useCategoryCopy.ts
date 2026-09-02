"use client";

import { useMemo } from "react";
import { useI18n } from "./LanguageProvider";
import { BRAND_I18N_KEY } from "./config";
import type { CategoryData } from "@/data/servicesData";
import type { DivisionId } from "@/config/brandsData";

function tx(t: (key: string) => string, key: string, fallback: string) {
  const value = t(key);
  return value && value !== key ? value : fallback;
}

export function useLocalizedCategory(content: CategoryData): CategoryData {
  const { t, locale } = useI18n();
  const prefix = `category.${BRAND_I18N_KEY[content.id]}`;

  return useMemo(() => {
    return {
      ...content,
      label: tx(t, `${prefix}.label`, content.label),
      eyebrow: tx(t, `${prefix}.eyebrow`, content.eyebrow),
      headline: tx(t, `${prefix}.headline`, content.headline),
      subheadline: tx(t, `${prefix}.subheadline`, content.subheadline),
      heroImageAlt: tx(t, `${prefix}.heroImageAlt`, content.heroImageAlt),
      primaryCta: {
        ...content.primaryCta,
        label: tx(t, `${prefix}.primaryCta`, content.primaryCta.label),
      },
      secondaryCta: {
        ...content.secondaryCta,
        label: tx(t, `${prefix}.secondaryCta`, content.secondaryCta.label),
      },
      stats: content.stats.map((stat, i) => ({
        label: tx(t, `${prefix}.stat${i}Label`, stat.label),
        value: tx(t, `${prefix}.stat${i}Value`, stat.value),
        hint: stat.hint ? tx(t, `${prefix}.stat${i}Hint`, stat.hint) : stat.hint,
      })),
      servicesTitle: tx(t, `${prefix}.servicesTitle`, content.servicesTitle),
      servicesDescription: tx(t, `${prefix}.servicesDescription`, content.servicesDescription),
      services: content.services.map((service, i) => ({
        ...service,
        title: tx(t, `${prefix}.service${i}Title`, service.title),
        description: tx(t, `${prefix}.service${i}Desc`, service.description),
        specs: service.specs.map((spec, j) => tx(t, `${prefix}.service${i}Spec${j}`, spec)),
      })),
      showcaseTitle: tx(t, `${prefix}.showcaseTitle`, content.showcaseTitle),
      showcaseDescription: tx(t, `${prefix}.showcaseDescription`, content.showcaseDescription),
      showcase: content.showcase.map((item, i) => ({
        ...item,
        title: tx(t, `${prefix}.showcase${i}Title`, item.title),
        description: tx(t, `${prefix}.showcase${i}Desc`, item.description),
        badge: tx(t, `${prefix}.showcase${i}Badge`, item.badge),
      })),
      ctaBadge: tx(t, `${prefix}.ctaBadge`, content.ctaBadge),
      ctaHeadline: tx(t, `${prefix}.ctaHeadline`, content.ctaHeadline),
      ctaBody: tx(t, `${prefix}.ctaBody`, content.ctaBody),
    };
  }, [content, prefix, t, locale]);
}

export function useLocalizedProject(slug: string, fallback: { title: string; location: string; summary: string }) {
  const { t } = useI18n();
  return {
    title: tx(t, `gallery.${slug}.title`, fallback.title),
    location: tx(t, `gallery.${slug}.location`, fallback.location),
    summary: tx(t, `gallery.${slug}.summary`, fallback.summary),
  };
}

export function categoryPrefix(id: DivisionId) {
  return `category.${BRAND_I18N_KEY[id]}`;
}
