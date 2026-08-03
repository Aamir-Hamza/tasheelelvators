import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { timeline, values } from "@/lib/data/content";
import { SITE } from "@/lib/constants";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Tasheel Elevators—mission, vision, values, and our journey engineering vertical excellence across Oman and the GCC.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Tasheel Elevators"
        description="A Muscat-born engineering company dedicated to safer, smarter vertical mobility across Oman and the GCC."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">Mission</p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Engineer vertical excellence people can trust
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              We design, supply, install, and maintain elevators and escalators that meet
              international safety standards while respecting the climate, codes, and construction
              realities of the Gulf.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">Vision</p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              The region’s most trusted vertical mobility partner
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              To be the first call for architects, developers, and facility managers who refuse to
              compromise on safety, uptime, or craftsmanship.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-light-gray/40 py-20 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold">Values</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold">Company journey</h2>
          <div className="mt-12 space-y-8 border-l border-electric/40 pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[39px] top-1 h-3 w-3 rounded-full bg-electric" />
                <p className="text-sm font-semibold text-electric">{item.year}</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-electric-bright">CEO Message</p>
          <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug md:text-3xl">
            “Every elevator we deliver carries our name. That means safety is non-negotiable,
            schedules are respected, and service never ends at handover.”
          </blockquote>
          <p className="mt-6 text-silver/70">Leadership Team · {SITE.legalName}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
