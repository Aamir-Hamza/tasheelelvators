"use client";

import { useState } from "react";
import { MessageCircle, Phone, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const replies: Record<string, string> = {
  quote:
    "You can request a detailed proposal on our Quote page. Share floors, capacity, and drawings for a precise estimate.",
  amc: "Our AMC packages include preventive visits, genuine parts options, digital reports, and priority emergency response.",
  emergency:
    `For trapped passengers or critical faults, call our emergency line: ${SITE.emergency}. AMC clients receive priority dispatch.`,
  products:
    "We supply passenger, hospital, freight, home, panoramic, and MRL elevators plus escalators and moving walkways.",
};

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    {
      role: "bot",
      text: "Welcome to Tasheel Elevators. Ask about products, AMC, quotes, or emergencies.",
    },
  ]);

  function ask(key: keyof typeof replies, label: string) {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: label },
      { role: "bot", text: replies[key] },
    ]);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              className="flex h-[420px] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-deep shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <p className="font-display text-sm font-semibold text-white">Tasheel Assistant</p>
                  <p className="text-xs text-silver/60">Typically replies instantly</p>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="rounded-full p-1.5 text-silver hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "bot"
                        ? "bg-white/10 text-silver"
                        : "ml-auto bg-electric text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-3">
                {[
                  { key: "quote" as const, label: "Get a quote" },
                  { key: "amc" as const, label: "AMC plans" },
                  { key: "emergency" as const, label: "Emergency" },
                  { key: "products" as const, label: "Products" },
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
                    <Send className="h-3.5 w-3.5" /> Contact team
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
            aria-label="Emergency call"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* Working WhatsApp click-to-chat */}
          <WhatsAppButton phone={SITE.whatsappNumber} />

          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-electric text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
            aria-label="Open AI assistant"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
