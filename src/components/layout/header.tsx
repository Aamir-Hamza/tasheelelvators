"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Sun,
  Moon,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-navy-deep/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group relative z-10 flex items-center gap-3" aria-label="Tasheel Elevators home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric text-sm font-bold text-white shadow-[0_0_24px_rgba(27,143,255,0.45)]">
            TE
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Tasheel<span className="text-electric-bright"> Elevators</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setMega(link.children ? link.label : null)}
              onMouseLeave={() => setMega(null)}
            >
              <Link
                href={link.href}
                className="focus-ring flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white"
              >
                {link.label}
                {link.children && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </Link>
              <AnimatePresence>
                {link.children && mega === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="glass min-w-[280px] rounded-2xl bg-navy/95 p-3 shadow-2xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="focus-ring rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Call us"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="focus-ring rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Button asChild size="sm" className="ml-1">
            <Link href="/quote">Get Quote</Link>
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring rounded-full p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-navy-deep lg:hidden"
          >
            <div className="max-h-[80vh] space-y-1 overflow-y-auto px-6 py-6">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="border-b border-white/5 py-2">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-lg font-semibold text-white"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="mb-2 ml-2 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 text-sm text-silver/80"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/quote" onClick={() => setOpen(false)}>
                    Get Quote
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="flex-1">
                  <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
