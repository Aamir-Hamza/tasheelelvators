"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CategoryData } from "@/data/servicesData";

export function DynamicCTA({ content }: { content: CategoryData }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${content.theme.glow}, transparent 55%)`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          {content.ctaBadge}
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold md:text-5xl">{content.ctaHeadline}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-slate-300">{content.ctaBody}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/quote?service=${encodeURIComponent(content.ctaFormContext)}`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition",
              content.theme.cta
            )}
          >
            Request a proposal <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={SITE.emergencyHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            <Phone className="h-4 w-4" /> Emergency
          </a>
        </div>
      </div>
    </section>
  );
}
