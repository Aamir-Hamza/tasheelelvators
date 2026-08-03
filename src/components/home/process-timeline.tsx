"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data/content";
import { SectionHeading } from "@/components/shared/section-heading";

export function ProcessTimeline() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Process"
          title="From consultation to lifelong care"
          description="A clear, interactive journey that keeps architects, contractors, and owners aligned at every milestone."
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-electric via-electric/40 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
                className={`relative flex flex-col gap-3 pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-electric text-xs font-bold text-white md:left-1/2 md:-translate-x-1/2">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
