"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import type { ReactNode } from "react";
import { useI18n } from "@/i18n/LanguageProvider";

type WhatsAppButtonProps = {
  phone?: string;
  message?: string;
  className?: string;
  variant?: "fab" | "inline";
  label?: ReactNode;
};

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * api.whatsapp.com is more reliable than wa.me
 * (wa.me often fails with ERR_CONNECTION_RESET on some networks).
 */
export function getWhatsAppUrl(phone: string, message?: string) {
  const number = digitsOnly(phone);
  const params = new URLSearchParams({ phone: number });
  if (message) params.set("text", message);
  return `https://api.whatsapp.com/send?${params.toString()}`;
}

export function WhatsAppButton({
  phone = SITE.whatsappNumber,
  message,
  className,
  variant = "fab",
  label,
}: WhatsAppButtonProps) {
  const { t } = useI18n();
  const text = message ?? t("common.whatsappMessage");
  const href = getWhatsAppUrl(phone, text);
  const shownLabel = label ?? t("common.whatsapp");

  const baseFab =
    "flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-110 hover:bg-[#1ebe57] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2";

  const baseInline =
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-[#1ebe57] active:scale-95";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("common.chatOnWhatsApp")}
      className={cn(variant === "fab" ? baseFab : baseInline, className)}
    >
      <MessageCircle className={variant === "fab" ? "h-7 w-7" : "h-4 w-4"} aria-hidden />
      {variant === "inline" ? shownLabel : null}
    </a>
  );
}
