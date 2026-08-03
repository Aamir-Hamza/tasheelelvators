import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Shield, FileCheck, AlertTriangle, Award, ClipboardCheck, LifeBuoy } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Safety & Quality",
  description:
    "Tasheel Elevators safety standards—EN 81, EN 115, ISO practices, quality control, emergency rescue, and compliance certificates.",
};

const items = [
  {
    icon: Shield,
    title: "International Standards",
    text: "Systems aligned with EN 81-20/50 for elevators and EN 115 for escalators and moving walks.",
  },
  {
    icon: Award,
    title: "ISO Quality Practices",
    text: "Documented processes for installation quality, supplier control, and continuous improvement.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Control",
    text: "Multi-stage inspections from factory acceptance through site commissioning and handover.",
  },
  {
    icon: FileCheck,
    title: "Testing & Commissioning",
    text: "Load tests, safety gear verification, door timing, and emergency system validation.",
  },
  {
    icon: LifeBuoy,
    title: "Emergency Rescue",
    text: "Trained technicians for trapped passenger release with 24/7 emergency coverage.",
  },
  {
    icon: AlertTriangle,
    title: "Compliance",
    text: "Civil Defence and authority documentation prepared for Oman and GCC project requirements.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <PageHero
        title="Safety & Quality"
        description="Passenger trust begins with engineering discipline—codes, testing, and emergency readiness."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Safety" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-border bg-card p-7">
              <item.icon className="h-7 w-7 text-electric" />
              <h2 className="mt-5 font-display text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6">
          <div className="rounded-3xl bg-navy-deep p-8 text-white md:p-12">
            <h2 className="font-display text-3xl font-bold">Certificates & documentation</h2>
            <p className="mt-4 max-w-2xl text-silver/80">
              Project dossiers include conformity declarations, test records, operation manuals,
              and maintenance schedules. Request sample documentation with your proposal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["EN 81-20/50", "EN 115", "ISO QMS", "Civil Defence", "OEM Training"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-silver"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
