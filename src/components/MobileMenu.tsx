"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { SITE } from "@/lib/constants";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  lang: "en" | "ar";
  onLangChange: (lang: "en" | "ar") => void;
};

export function MobileMenu({ open, onClose, lang, onLangChange }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#0a1628]/45 backdrop-blur-sm"
            aria-label="Close menu overlay"
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
              <Logo height={52} href="/" withWordmark />
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#0a1628] transition hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b8fff]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <Navbar variant="mobile" onNavigate={onClose} />
            </div>

            <div className="space-y-3 border-t border-black/5 px-6 py-5">
              <div className="flex gap-2" role="group" aria-label="Language">
                {(["en", "ar"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onLangChange(code)}
                    className={`flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition ${
                      lang === code
                        ? "bg-[#0a1628] text-white"
                        : "border border-black/10 text-[#0a1628] hover:bg-black/[0.04]"
                    }`}
                    aria-pressed={lang === code}
                  >
                    {code === "en" ? "English" : "العربية"}
                  </button>
                ))}
              </div>

              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full bg-[#0a1628] px-5 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
