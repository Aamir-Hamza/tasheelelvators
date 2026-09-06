"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRANDS_DATA, DIVISION_ORDER, type DivisionId } from "@/config/brandsData";
import { useBrand } from "@/context/BrandContext";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LanguageProvider";
import { scrollPageToTop } from "@/lib/scroll-to-top";

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
  const { brandId, setBrandId, isHome, isPortalPage } = useBrand();
  const pathname = usePathname();
  const stayOnPage = isHome || pathname === "/projects" || pathname.startsWith("/projects/");
  const { t, isRtl } = useI18n();
  const tabRefs = useRef<Partial<Record<DivisionId, HTMLButtonElement | null>>>({});
  const portalHref = BRANDS_DATA[brandId].href;
  const onThisPortal =
    pathname === portalHref || pathname.startsWith(`${portalHref}/`);

  const select = (id: DivisionId) => {
    const shouldScroll = isHome || pathname === "/projects" || pathname.startsWith("/projects/");
    setBrandId(id, { navigate: !stayOnPage });
    if (shouldScroll) {
      scrollPageToTop();
    }
    onSelect?.();
  };

  const move = (from: DivisionId, delta: number) => {
    const idx = DIVISION_ORDER.indexOf(from);
    const next = DIVISION_ORDER[(idx + delta + DIVISION_ORDER.length) % DIVISION_ORDER.length];
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className={cn(
        "border-b",
        inverted ? "border-white/10 bg-black/20" : "border-slate-200/70 bg-slate-50/95"
      )}
    >
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-2 px-4 sm:h-10 sm:px-6">
        <div
          className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={t("nav.tasheelDivisions")}
          onKeyDown={(e) => {
            const forward = isRtl ? "ArrowLeft" : "ArrowRight";
            const back = isRtl ? "ArrowRight" : "ArrowLeft";
            if (e.key === forward) {
              e.preventDefault();
              move(brandId, 1);
            } else if (e.key === back) {
              e.preventDefault();
              move(brandId, -1);
            } else if (e.key === "Home") {
              e.preventDefault();
              select(DIVISION_ORDER[0]);
              tabRefs.current[DIVISION_ORDER[0]]?.focus();
            } else if (e.key === "End") {
              e.preventDefault();
              const last = DIVISION_ORDER[DIVISION_ORDER.length - 1];
              select(last);
              tabRefs.current[last]?.focus();
            }
          }}
        >
          {DIVISION_ORDER.map((id) => {
            const item = BRANDS_DATA[id];
            const active = brandId === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[id] = el;
                }}
                type="button"
                role="tab"
                id={`category-tab-${id}`}
                aria-selected={active}
                aria-controls="category-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => select(id)}
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
                    layoutId="activeIndicator"
                    className={cn("absolute inset-0 rounded-full shadow-sm", item.colors.pillActive)}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-[1]">{t(SHORT_KEYS[id])}</span>
              </button>
            );
          })}
        </div>

        <Link
          href={onThisPortal || isPortalPage ? "/divisions" : portalHref}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition sm:px-3.5 sm:text-xs",
            inverted
              ? "bg-white text-slate-900 hover:bg-slate-100"
              : "bg-slate-900 text-white hover:bg-slate-800"
          )}
        >
          {onThisPortal || isPortalPage
            ? t("nav.allServices")
            : t("nav.seeDivision", { name: t(SHORT_KEYS[brandId]) })}
          <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
