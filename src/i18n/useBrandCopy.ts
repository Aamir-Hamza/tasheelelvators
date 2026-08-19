"use client";

import { useI18n } from "./LanguageProvider";
import { BRAND_I18N_KEY } from "./config";
import type { DivisionId } from "@/config/brandsData";
import type { BrandId } from "@/data/hero-slides";

export function useTranslatedBrand(id: DivisionId | BrandId) {
  const { t } = useI18n();
  const key = BRAND_I18N_KEY[id];
  const p = `brand.${key}`;

  return {
    name: t("common.tasheel"),
    subtitle: t(`${p}.subtitle`),
    short: t(`${p}.short`),
    aria: t(`${p}.aria`),
    displayName: t(`${p}.name`),
    eyebrow: t(`${p}.eyebrow`),
    headline: t(`${p}.headline`),
    subheadline: t(`${p}.subheadline`),
    primaryCta: t(`${p}.primaryCta`),
    secondaryCta: t(`${p}.secondaryCta`),
    servicesEyebrow: t(`${p}.servicesEyebrow`),
    servicesTitle: t(`${p}.servicesTitle`),
    servicesDescription: t(`${p}.servicesDescription`),
    footerAbout: t(`${p}.footerAbout`),
    portalCta: t(`${p}.portalCta`),
    about: t(`${p}.about`),
    cta: t(`${p}.cta`),
    service: (i: number) => ({
      title: t(`${p}.service${i}Title`),
      description: t(`${p}.service${i}Desc`),
    }),
  };
}

export function useFilterLabel() {
  const { t } = useI18n();
  return (category: string) => {
    const value = t(`filters.${category}`);
    return value === `filters.${category}` ? category : value;
  };
}
