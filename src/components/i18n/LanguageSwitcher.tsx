"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type Props = {
  solid?: boolean;
  className?: string;
  fullWidth?: boolean;
};

export function LanguageSwitcher({ solid = true, className, fullWidth = false }: Props) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={cn(
        "items-center rounded-full border p-0.5",
        fullWidth ? "flex w-full" : "hidden xl:flex",
        solid ? "border-slate-200" : "border-white/25",
        className
      )}
      role="group"
      aria-label={t("header.languageSwitcher")}
    >
      {(["en", "ar"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "rounded-full px-2.5 py-1.5 text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]",
            fullWidth && "flex-1 py-2.5 text-sm",
            locale === code
              ? solid
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900"
              : solid
                ? "text-slate-500 hover:text-slate-900"
                : "text-white/75 hover:text-white"
          )}
          aria-pressed={locale === code}
          lang={code === "ar" ? "ar" : "en"}
        >
          {code === "en" ? "EN" : "AR"}
        </button>
      ))}
    </div>
  );
}
