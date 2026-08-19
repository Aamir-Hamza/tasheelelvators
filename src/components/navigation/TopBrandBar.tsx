"use client";

import { motion } from "framer-motion";
import { BRANDS_DATA, DIVISION_ORDER } from "@/config/brandsData";
import { useBrand } from "@/context/BrandContext";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LanguageProvider";

type TopBrandBarProps = {
  inverted?: boolean;
  onSelect?: () => void;
};

const SHORT_KEYS = {
  elevators: "brandBar.elevators",
  "smart-systems": "brandBar.smartSystems",
  engineering: "brandBar.engineering",
} as const;

export function TopBrandBar({ inverted = false, onSelect }: TopBrandBarProps) {
  const { brandId, setBrandId, isHome } = useBrand();
  const { t } = useI18n();

  return (
    <div
      className={cn(
        "border-b",
        inverted ? "border-white/10 bg-black/20" : "border-slate-200/70 bg-slate-50/95"
      )}
    >
      <div
        className="mx-auto flex h-9 max-w-[1400px] items-center gap-1.5 overflow-x-auto px-4 sm:h-10 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label={t("nav.tasheelDivisions")}
      >
        {DIVISION_ORDER.map((id) => {
          const item = BRANDS_DATA[id];
          const active = brandId === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setBrandId(id, { navigate: !isHome });
                onSelect?.();
              }}
              className={cn(
                "relative shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-3.5 sm:text-[11px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-1",
                active
                  ? "text-white"
                  : inverted
                    ? "text-white/70 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
              )}
            >
              {active && (
                <motion.span
                  layoutId="brand-indicator"
                  className={cn("absolute inset-0 rounded-full shadow-sm", item.colors.pillActive)}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-[1]">{t(SHORT_KEYS[id])}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
