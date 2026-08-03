"use client";

import { motion } from "framer-motion";
import {
  Zap,
  BadgeCheck,
  Clock,
  Package,
  Shield,
  FileCheck,
  ClipboardList,
  Wallet,
} from "lucide-react";
import { whyChoose } from "@/lib/data/content";
import { SectionHeading } from "@/components/shared/section-heading";

const icons = {
  Zap,
  BadgeCheck,
  Clock,
  Package,
  Shield,
  FileCheck,
  ClipboardList,
  Wallet,
} as const;

export function WhyChooseUs() {
  return (
    <section className="border-y border-border bg-light-gray/50 py-24 dark:bg-white/[0.02] md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Tasheel"
          title="Built for developers who refuse compromise"
          description="Certified engineering, genuine parts, transparent proposals, and AMC programmes designed for Oman and GCC operating realities."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Shield;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="rounded-2xl border border-border bg-card p-6 transition hover:border-electric/30 hover:shadow-[var(--shadow-soft)]"
              >
                <Icon className="h-6 w-6 text-electric" />
                <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
