"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, UserRound } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const { user, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("tasheel-lang");
    if (stored === "ar" || stored === "en") setLang(stored);
  }, []);

  function handleLangChange(next: "en" | "ar") {
    setLang(next);
    window.localStorage.setItem("tasheel-lang", next);
    document.documentElement.lang = next === "ar" ? "ar" : "en";
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  }

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-b border-transparent bg-slate-950/25 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:h-20 xl:gap-4">
          {/* Brand */}
          <div className="min-w-0 shrink">
            <Logo
              priority
              withWordmark
              lightWordmark={!solid}
              dynamicBrand
              className="h-9 sm:h-10 lg:h-11"
            />
          </div>

          {/* Desktop nav — xl to avoid crowding with CTAs */}
          <Navbar inverted={!solid} />

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div
              className="hidden items-center rounded-full border p-0.5 xl:flex"
              role="group"
              aria-label="Language switcher"
            >
              {(["en", "ar"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLangChange(code)}
                  className={cn(
                    "rounded-full px-2.5 py-1.5 text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                    lang === code
                      ? solid
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-900"
                      : solid
                        ? "text-slate-500 hover:text-slate-900"
                        : "text-white/75 hover:text-white"
                  )}
                  aria-pressed={lang === code}
                >
                  {code === "en" ? "EN" : "AR"}
                </button>
              ))}
            </div>

            {!loading && (
              <Link
                href={user ? "/account" : "/login"}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full transition xl:h-auto xl:w-auto xl:gap-2 xl:px-3 xl:py-2",
                  solid
                    ? "border border-slate-200 text-slate-800 hover:bg-slate-50"
                    : "border border-white/25 text-white hover:bg-white/10"
                )}
                aria-label={user ? "Account" : "Sign in"}
              >
                <UserRound className="h-4 w-4" />
                <span className="hidden text-sm font-semibold 2xl:inline">
                  {user ? "Account" : "Sign in"}
                </span>
              </Link>
            )}

            <a
              href={SITE.phoneHref}
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white shadow-md transition hover:bg-amber-700 xl:inline-flex 2xl:h-auto 2xl:w-auto 2xl:gap-2 2xl:px-3.5 2xl:py-2"
              aria-label="Call Now"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden text-sm font-semibold 2xl:inline">Call Now</span>
            </a>

            <WhatsAppButton
              variant="inline"
              className="hidden !h-10 !w-10 !items-center !justify-center !px-0 !py-0 xl:!inline-flex 2xl:!h-auto 2xl:!w-auto 2xl:!px-3.5 2xl:!py-2"
              label={<span className="hidden 2xl:inline">WhatsApp</span>}
            />

            <Link
              href="/quote"
              className={cn(
                "hidden items-center rounded-full px-3.5 py-2 text-sm font-semibold transition hover:scale-[1.02] lg:inline-flex xl:px-4",
                solid
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-slate-100"
              )}
            >
              <span className="xl:hidden">Proposal</span>
              <span className="hidden xl:inline">Request a Proposal</span>
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
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        lang={lang}
        onLangChange={handleLangChange}
      />
    </>
  );
}
