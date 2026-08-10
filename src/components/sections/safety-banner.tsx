"use client";

import { motion } from "framer-motion";
import { Shield, Award, FileCheck, BadgeCheck } from "lucide-react";

const items = [
  { icon: Shield, title: "Safety First", text: "EN / ISO aligned practices across vertical transport and security systems." },
  { icon: Award, title: "Quality Systems", text: "Documented installation, commissioning, and maintenance protocols." },
  { icon: FileCheck, title: "Compliance Ready", text: "Authority documentation and audit trails for Oman & GCC projects." },
  { icon: BadgeCheck, title: "Certified Teams", text: "Factory-trained technicians and engineering specialists." },
];

export function SafetyBanner() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] bg-slate-900 px-8 py-12 text-white md:px-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
            Safety · Quality · Certification
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
            Engineering discipline you can audit
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <item.icon className="h-5 w-5 text-sky-300" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
