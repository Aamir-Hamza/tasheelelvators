import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Camera, Home, Wifi, Shield } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "CCTV & Smart Home",
  description:
    "Tasheel CCTV & Smart Home — enterprise surveillance, AI analytics, smart lighting, climate automation, and IoT infrastructure in Oman and the GCC.",
};

const offerings = [
  {
    icon: Camera,
    title: "Enterprise CCTV",
    text: "IP cameras, NVRs, AI analytics, and centralized monitoring for commercial and critical sites.",
  },
  {
    icon: Home,
    title: "Smart Home Automation",
    text: "Lighting, climate, shades, and scenes engineered for villas and premium residences.",
  },
  {
    icon: Shield,
    title: "Access & Alarms",
    text: "Door controllers, intrusion detection, and integrated security workflows.",
  },
  {
    icon: Wifi,
    title: "IoT Infrastructure",
    text: "Reliable networking, remote monitoring, and scalable building connectivity.",
  },
];

export default function CctvDivisionPage() {
  return (
    <>
      <PageHero
        title="Tasheel CCTV & Smart Home"
        description="Intelligent security and connected living — designed, installed, and maintained by Tasheel Engineering."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Divisions", href: "/divisions" },
          { label: "CCTV & Smart Home" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
              Division of Tasheel Engineering
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Security and automation with engineering discipline
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              From AI-ready surveillance grids to villa automation, we deliver systems that are
              secure, maintainable, and designed for Oman’s climate and compliance needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-amber-600 hover:bg-amber-500">
                <Link href="/quote">
                  Request smart systems proposal <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Talk to a specialist</Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {offerings.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <item.icon className="h-6 w-6 text-amber-600" />
                <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-amber-50/50 p-8 dark:bg-amber-500/5">
            <h3 className="font-display text-xl font-bold">Delivery checklist</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Site survey & threat modeling",
                "Network & storage design",
                "Professional installation",
                "User training & handover",
                "Preventive maintenance contracts",
                "Remote monitoring options",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 text-amber-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
