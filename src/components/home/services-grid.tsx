"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HardHat,
  Wrench,
  RefreshCw,
  Siren,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { SectionHeading } from "@/components/shared/section-heading";

const icons = {
  HardHat,
  Wrench,
  RefreshCw,
  Siren,
  MessageSquare,
} as const;

export function ServicesGrid() {
  return (
    <section className="bg-navy-deep py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="End-to-end vertical mobility"
          description="Installation, modernization, emergency response, and AMC—delivered by certified engineers across Oman and the GCC."
          light
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? HardHat;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group gradient-border block h-full rounded-3xl bg-white/[0.03] p-7 transition duration-500 hover:bg-white/[0.06]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric/15 text-electric-bright transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm text-electric-bright/90">{service.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-silver/70">{service.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-white/80 transition group-hover:text-electric-bright">
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
