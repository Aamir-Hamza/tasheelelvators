"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isLocale, LANG_COOKIE, LANG_STORAGE_KEY, localeDir, type Locale } from "./config";
import { getMessages, translate, type Messages } from "./translate";

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  document.cookie = `${LANG_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = locale === "ar" ? "ar" : "en";
  document.documentElement.dir = localeDir(locale);
  document.documentElement.dataset.locale = locale;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (isLocale(stored) && stored !== initialLocale) {
        setLocaleState(stored);
        persistLocale(stored);
        return;
      }
    } catch {
      /* ignore */
    }
    persistLocale(initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const messages = getMessages(locale);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: localeDir(locale),
      isRtl: locale === "ar",
      messages,
      setLocale,
      t: (key, vars) => translate(messages, key, vars),
    }),
    [locale, messages, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
