"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { clients, testimonials } from "@/lib/data/content";
import { SectionHeading } from "@/components/shared/section-heading";

export function ClientsTestimonials() {
  const loop = [...clients, ...clients];

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Clients & Reviews"
          title="Trusted by builders of Oman’s skyline"
          description="From developers and hospitals to hospitality groups—teams who expect precision choose Tasheel."
          align="center"
          className="mb-12"
        />

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />
          <div className="marquee-track flex w-max gap-12 px-6">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-lg font-semibold tracking-wide text-muted/70 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
            >
              <div className="flex gap-1 text-electric">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">“{t.quote}”</p>
              <footer className="mt-6">
                <p className="font-display font-semibold">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
