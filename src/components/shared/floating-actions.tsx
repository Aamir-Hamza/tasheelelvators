"use client";

import { useState } from "react";
import { MessageCircle, Phone, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useI18n } from "@/i18n/LanguageProvider";

export function FloatingActions() {
  const { t, locale } = useI18n();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);

  const replies: Record<string, string> = {
    quote: t("chat.rQuote"),
    amc: t("chat.rAmc"),
    emergency: t("chat.rEmergency", { phone: SITE.emergency }),
    products: t("chat.rProducts"),
  };

  function ask(key: keyof typeof replies, label: string) {
    setMessages((prev) => {
      const start =
        prev.length === 0 ? [{ role: "bot" as const, text: t("chat.welcome") }] : prev;
      return [...start, { role: "user", text: label }, { role: "bot", text: replies[key] }];
    });
  }

  const visibleMessages =
    messages.length > 0 ? messages : [{ role: "bot" as const, text: t("chat.welcome") }];

  return (
    <>
      <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              key={locale}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              className="flex h-[420px] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-deep shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <p className="font-display text-sm font-semibold text-white">{t("chat.title")}</p>
                  <p className="text-xs text-silver/60">{t("chat.subtitle")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="rounded-full p-1.5 text-silver hover:bg-white/10"
                  aria-label={t("common.closeChat")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {visibleMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "bot" ? "bg-white/10 text-silver" : "ms-auto bg-electric text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-3">
                {[
                  { key: "quote" as const, label: t("chat.quote") },
                  { key: "amc" as const, label: t("chat.amc") },
                  { key: "emergency" as const, label: t("chat.emergency") },
                  { key: "products" as const, label: t("chat.products") },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => ask(item.key, item.label)}
                    className="rounded-xl bg-white/5 px-2 py-2 text-xs text-silver transition hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 border-t border-white/10 p-3">
                <Button asChild size="sm" className="flex-1">
                  <a href="/contact">
                    <Send className="h-3.5 w-3.5" /> {t("chat.contactTeam")}
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-end gap-3">
          <a
            href={SITE.emergencyHref}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110"
            aria-label={t("common.emergencyCall")}
          >
            <Phone className="h-5 w-5" />
          </a>

          <WhatsAppButton phone={SITE.whatsappNumber} />

          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-electric text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
            aria-label={t("common.openAssistant")}
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
