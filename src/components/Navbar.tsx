"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { HEADER_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavbarProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
  inverted?: boolean;
};

export function Navbar({ onNavigate, variant = "desktop", inverted = false }: NavbarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  if (variant === "mobile") {
    return (
      <nav aria-label="Mobile primary" className="flex flex-col gap-1">
        {HEADER_NAV.map((link) => {
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
                {link.label}
              </Link>
              {"children" in link && link.children && (
                <div className="mb-2 ml-2 space-y-1 sm:ml-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-4 py-2 text-sm text-slate-500 hover:text-slate-900"
                    >
                      {child.label}
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
      aria-label="Primary"
      className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
    >
      {HEADER_NAV.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        const hasChildren = "children" in link && !!link.children;

        return (
          <div
            key={link.href}
            className="relative"
            onMouseEnter={() => setOpenMenu(hasChildren ? link.label : null)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              href={link.href}
              className={cn(
                "group relative inline-flex items-center gap-1 rounded-sm px-2.5 py-2 text-[12px] font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 2xl:px-3 2xl:text-[13px]",
                inverted
                  ? active
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                  : active
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
              )}
              aria-current={active ? "page" : undefined}
              aria-expanded={hasChildren ? openMenu === link.label : undefined}
            >
              {link.label}
              {hasChildren && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              <span
                className={cn(
                  "absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-amber-600 transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>

            <AnimatePresence>
              {hasChildren && openMenu === link.label && link.children && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full z-50 pt-3"
                >
                  <div className="min-w-[240px] rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {child.label}
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
