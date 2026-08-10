import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SITE, DIVISIONS } from "@/lib/constants";
import { CtaBand } from "@/components/home/cta-band";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Tasheel",
  description:
    "About Tasheel Engineering — specialized engineering design, comprehensive maintenance, and divisions in elevators and CCTV & smart home across Oman and the GCC.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Tasheel Engineering"
        description="A Muscat-based engineering company delivering design precision, master maintenance, and specialized division excellence across Oman and the GCC."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Tasheel" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              Mission
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Engineer systems people and buildings can trust
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              We provide specialized engineering design and comprehensive maintenance — then deliver
              through focused divisions in elevators & escalators and CCTV & smart home systems.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
              Vision
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              The region’s most trusted engineering partner
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              To be the first call for developers, architects, and facility managers who need
              precision design, reliable uptime, and accountable after-sales engineering.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-slate-50 py-20 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold">Our structure</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 md:col-span-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-700">Parent</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{SITE.name}</h3>
              <p className="mt-3 text-sm text-muted">
                Engineering design, consulting, systems auditing, and master maintenance programmes.
              </p>
            </div>
            {DIVISIONS.map((d) => (
              <Link
                key={d.slug}
                href={d.href}
                className="rounded-2xl border border-border bg-card p-6 transition hover:border-sky-300"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700">
                  Division
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">{d.shortName}</h3>
                <p className="mt-3 text-sm text-muted">{d.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-sky-300">Leadership</p>
          <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug md:text-3xl">
            “Every system we design or maintain carries the Tasheel name — safety, documentation,
            and service never end at handover.”
          </blockquote>
          <p className="mt-6 text-slate-400">Leadership Team · {SITE.legalName}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
