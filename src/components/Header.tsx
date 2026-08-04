"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
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
            ? "border-b border-[#2B4169]/10 bg-white/95 shadow-[0_8px_30px_rgba(43,65,105,0.10)] backdrop-blur-xl"
            : "border-b border-transparent bg-[#0a1628]/25 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between gap-4 px-6 lg:h-[92px]">
          {/* Brand mark from letterhead */}
          <Logo priority withWordmark lightWordmark={!solid} />

          {/* Center: Navigation */}
          <Navbar inverted={!solid} />

          {/* Right: Actions */}
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
                    "rounded-full px-2.5 py-1.5 text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b8fff]",
                    lang === code
                      ? solid
                        ? "bg-[#2B4169] text-white"
                        : "bg-white text-[#2B4169]"
                      : solid
                        ? "text-[#2B4169]/60 hover:text-[#2B4169]"
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
              className={cn(
                "hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F57E25] sm:inline-flex",
                "bg-[#F57E25] text-white shadow-md hover:bg-[#e06f1c] hover:shadow-lg"
              )}
              aria-label="Call Now"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">Call Now</span>
            </a>

            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:scale-[1.03] hover:bg-[#1ebe57] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] sm:inline-flex"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            <button
              type="button"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b8fff] xl:hidden",
                solid
                  ? "border border-black/10 text-[#0a1628] hover:bg-black/[0.04]"
                  : "border border-white/30 text-white hover:bg-white/10"
              )}
              aria-expanded={open}
              aria-controls="mobile-menu"
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
