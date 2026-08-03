"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { values } from "@/lib/data/content";

export function AboutPreview() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="About Tasheel"
            title="Engineering trust into every vertical journey"
            description="From Muscat to the wider GCC, Tasheel Elevators delivers manufacturing-grade quality with installation precision and lifelong maintenance partnerships."
          />
          <Button asChild variant="outline" className="mt-8">
            <Link href="/about">
              Our Story <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <p className="font-display text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
