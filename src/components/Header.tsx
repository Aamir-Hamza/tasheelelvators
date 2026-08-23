"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/navigation/Navbar";
import { TopBrandBar } from "@/components/navigation/TopBrandBar";
import { MobileMenu } from "@/components/MobileMenu";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import { useI18n } from "@/i18n/LanguageProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-b border-transparent bg-slate-950/30 backdrop-blur-md"
        )}
      >
        <TopBrandBar inverted={!solid} />
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:h-20 xl:gap-4">
          <div className="min-w-0 shrink">
            <Logo
              priority
              withWordmark
              lightWordmark={!solid}
              dynamicBrand
              className="h-9 sm:h-10 lg:h-11"
            />
          </div>

          <Navbar inverted={!solid} />

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher solid={solid} />

            {!loading && (
              <Link
                href={user ? "/account" : "/login"}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full transition xl:h-auto xl:w-auto xl:gap-2 xl:px-3 xl:py-2",
                  solid
                    ? "border border-slate-200 text-slate-800 hover:bg-slate-50"
                    : "border border-white/25 text-white hover:bg-white/10"
                )}
                aria-label={user ? t("common.account") : t("common.signIn")}
              >
                <UserRound className="h-4 w-4" />
                <span className="hidden text-sm font-semibold 2xl:inline">
                  {user ? t("common.account") : t("common.signIn")}
                </span>
              </Link>
            )}

            <Link
              href="/quote"
              className={cn(
                "hidden items-center rounded-full px-3.5 py-2 text-sm font-semibold transition hover:scale-[1.02] lg:inline-flex xl:px-4",
                solid
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-slate-100"
              )}
            >
              <span className="xl:hidden">{t("common.proposal")}</span>
              <span className="hidden xl:inline">{t("common.requestProposal")}</span>
            </Link>

            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition xl:hidden",
                solid
                  ? "border border-slate-200 text-slate-900 hover:bg-slate-50"
                  : "border border-white/30 text-white hover:bg-white/10"
              )}
              aria-expanded={open}
              aria-label={open ? t("common.closeMenu") : t("common.openMenu")}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
