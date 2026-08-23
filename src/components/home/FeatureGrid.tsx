"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpDown,
  ArrowUpRight,
  Building2,
  Cpu,
  Eye,
  Gauge,
  HardHat,
  KeyRound,
  Layers,
  Monitor,
  MoveHorizontal,
  PenTool,
  Ruler,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Video,
  Warehouse,
  Wrench,
} from "lucide-react";
import type { CategoryData, LucideIconName } from "@/data/servicesData";

const ICONS: Record<LucideIconName, typeof ArrowUpDown> = {
  ArrowUpDown,
  Building2,
  Cpu,
  Eye,
  Gauge,
  HardHat,
  KeyRound,
  Layers,
  Monitor,
  MoveHorizontal,
  PenTool,
  Ruler,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Video,
  Warehouse,
  Wrench,
};

export function FeatureGrid({ content }: { content: CategoryData }) {
  return (
    <section id="services" className="bg-slate-950 py-20 text-white md:py-28" aria-labelledby="feature-grid-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">{content.eyebrow}</p>
        <h2 id="feature-grid-heading" className="mt-3 max-w-2xl font-display text-3xl font-bold md:text-4xl">
          {content.servicesTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
          {content.servicesDescription}
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1"
                style={{ boxShadow: `0 0 0 1px transparent` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span
                    className="absolute start-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: content.theme.accentSoft, color: content.theme.accent }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.specs.map((spec) => (
                      <li
                        key={spec}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-200"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <span
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: content.theme.accent }}
                  >
                    Learn more <ArrowUpRight className="h-4 w-4 rtl:rotate-180" />
                  </span>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${content.theme.accent}, 0 18px 50px ${content.theme.glow}`,
                  }}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
