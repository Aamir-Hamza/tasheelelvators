"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { HEADER_NAV } from "@/lib/constants";
import { BRANDS_DATA, DIVISION_ORDER } from "@/config/brandsData";
import { useBrand } from "@/context/BrandContext";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LanguageProvider";

type NavbarProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
  inverted?: boolean;
};

function navLabel(t: (key: string) => string, id: string) {
  return t(`nav.${id}`);
}

function divisionNavCopy(t: (key: string) => string) {
  return {
    elevators: {
      aria: t("brand.elevators.aria"),
      subtitle: t("brand.elevators.subtitle"),
      short: t("brand.elevators.short"),
    },
    "smart-systems": {
      aria: t("brand.smartSystems.aria"),
      subtitle: t("brand.smartSystems.subtitle"),
      short: t("brand.smartSystems.short"),
    },
    engineering: {
      aria: t("brand.engineering.aria"),
      subtitle: t("brand.engineering.subtitle"),
      short: t("brand.engineering.short"),
    },
  };
}

function DivisionsDropdown({
  inverted,
  onNavigate,
}: {
  inverted?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { brandId, setBrandId } = useBrand();
  const { t } = useI18n();
  const copyById = divisionNavCopy(t);
  const [open, setOpen] = useState(false);
  const active =
    pathname === "/divisions" ||
    pathname.startsWith("/elevators") ||
    pathname.startsWith("/smart-systems") ||
    pathname.startsWith("/engineering") ||
    pathname.startsWith("/cctv-smart-systems") ||
    pathname.startsWith("/maintenance");

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/divisions"
        className={cn(
          "group relative inline-flex items-center gap-1 rounded-sm px-2.5 py-2 text-[12px] font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] 2xl:px-3 2xl:text-[13px]",
          inverted
            ? active
              ? "text-white"
              : "text-white/80 hover:text-white"
            : active
              ? "text-slate-900"
              : "text-slate-600 hover:text-slate-900"
        )}
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {t("nav.divisions")}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        <span
          className={cn(
            "absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-start rounded-full bg-[var(--brand-accent)] transition-transform duration-300",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          )}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute start-0 top-full z-50 pt-3"
          >
            <div className="min-w-[280px] rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl" role="menu">
              {DIVISION_ORDER.map((id) => {
                const item = BRANDS_DATA[id];
                const copy = copyById[id];
                const selected = brandId === id;
                return (
                  <Link
                    key={id}
                    href={item.href}
                    role="menuitem"
                    onClick={() => {
                      setBrandId(id);
                      onNavigate?.();
                    }}
                    className={cn(
                      "flex flex-col rounded-xl px-4 py-3 transition hover:bg-slate-50",
                      selected && "bg-slate-50"
                    )}
                  >
                    <span className="text-sm font-semibold text-slate-900">{copy.aria}</span>
                    <span className={cn("mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em]", item.colors.className)}>
                      {copy.subtitle}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar({ onNavigate, variant = "desktop", inverted = false }: NavbarProps) {
  const pathname = usePathname();
  const { brandId, setBrandId } = useBrand();
  const { t } = useI18n();
  const copyById = divisionNavCopy(t);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  if (variant === "mobile") {
    return (
      <nav aria-label={t("nav.mobilePrimary")} className="flex flex-col gap-1">
        <p className="px-4 pb-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {t("nav.divisions")}
        </p>
        {DIVISION_ORDER.map((id) => {
          const item = BRANDS_DATA[id];
          const copy = copyById[id];
          const selected = brandId === id;
          return (
            <Link
              key={id}
              href={item.href}
              onClick={() => {
                setBrandId(id);
                onNavigate?.();
              }}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                selected ? "text-slate-900" : "text-slate-700 hover:bg-slate-50"
              )}
              style={selected ? { backgroundColor: item.colors.soft } : undefined}
            >
              {copy.short}
            </Link>
          );
        })}

        {HEADER_NAV.filter((link) => link.id !== "divisions").map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <div key={link.href} className="border-b border-slate-100 py-1">
              <Link
                href={link.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-semibold transition-colors sm:text-lg",
                  active ? "bg-sky-50 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                )}
                aria-current={active ? "page" : undefined}
              >
                {navLabel(t, link.id)}
              </Link>
              {"children" in link && link.children && (
                <div className="mb-2 ms-2 space-y-1 sm:ms-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-4 py-2 text-sm text-slate-500 hover:text-slate-900"
                    >
                      {navLabel(t, child.id)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      aria-label={t("nav.primary")}
      className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
    >
      {HEADER_NAV.map((link) => {
        if (link.id === "divisions") {
          return <DivisionsDropdown key="divisions" inverted={inverted} onNavigate={onNavigate} />;
        }

        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        const hasChildren = "children" in link && !!link.children;

        return (
          <div
            key={link.href}
            className="relative"
            onMouseEnter={() => setOpenMenu(hasChildren ? link.id : null)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              href={link.href}
              className={cn(
                "group relative inline-flex items-center gap-1 rounded-sm px-2.5 py-2 text-[12px] font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] 2xl:px-3 2xl:text-[13px]",
                inverted
                  ? active
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                  : active
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
              )}
              aria-current={active ? "page" : undefined}
              aria-expanded={hasChildren ? openMenu === link.id : undefined}
            >
              {navLabel(t, link.id)}
              {hasChildren && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              <span
                className={cn(
                  "absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-start rounded-full bg-[var(--brand-accent)] transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>

            <AnimatePresence>
              {hasChildren && openMenu === link.id && link.children && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute start-0 top-full z-50 pt-3"
                >
                  <div className="min-w-[240px] rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {navLabel(t, child.id)}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
