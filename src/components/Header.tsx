"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

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
            : "border-b border-transparent bg-slate-950/20 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between gap-4 px-6 lg:h-[88px]">
          <Logo priority withWordmark lightWordmark={!solid} />

          <Navbar inverted={!solid} />

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="hidden items-center rounded-full border p-0.5 md:flex"
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

            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:scale-[1.03] hover:bg-amber-700 sm:inline-flex"
              aria-label="Call Now"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">Call Now</span>
            </a>

            <WhatsAppButton
              variant="inline"
              className="hidden !px-3 !py-2.5 sm:inline-flex xl:!px-4"
              label="WhatsApp"
            />

            <Link
              href="/quote"
              className={cn(
                "hidden items-center rounded-full px-4 py-2.5 text-sm font-semibold transition hover:scale-[1.03] lg:inline-flex",
                solid
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-slate-100"
              )}
            >
              Request a Proposal
            </Link>

            <button
              type="button"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden",
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
