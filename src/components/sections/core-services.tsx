"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, Wrench, ClipboardCheck, Siren, ArrowUpRight } from "lucide-react";
import { coreServices } from "@/data/services";
import { SectionHeading } from "@/components/shared/section-heading";

const icons = { PenTool, Wrench, ClipboardCheck, Siren } as const;

export function CoreServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Tasheel Engineering"
          title="Core services architecture"
          description="Master engineering design and lifecycle maintenance — the foundation behind every Tasheel division."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {coreServices.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-slate-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.highlights.map((item) => (
                      <li key={item} className="text-sm text-slate-500 dark:text-slate-400">
                        · {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition group-hover:text-sky-700 dark:text-white">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
