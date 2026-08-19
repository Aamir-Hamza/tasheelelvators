export const LANG_COOKIE = "tasheel-lang";
export const LANG_STORAGE_KEY = "tasheel-lang";

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function localeDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const BRAND_I18N_KEY = {
  group: "group",
  elevators: "elevators",
  "smart-systems": "smartSystems",
  engineering: "engineering",
} as const;
