"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { useBrand } from "@/components/providers/brand-provider";

export function Footer() {
  const { chromeBrand, isPortalPage } = useBrand();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at bottom left, ${chromeBrand.accent.soft}, transparent 45%)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* Footer stays on Group branding during homepage tab preview */}
            <Logo height={56} href="/" withWordmark lightWordmark dynamicBrand={false} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {chromeBrand.footerAbout}
            </p>

            {isPortalPage && (
              <Link
                href={chromeBrand.portalHref}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                style={{ borderColor: `${chromeBrand.accent.hex}55` }}
              >
                {chromeBrand.portalCtaLabel} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}

            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>{SITE.address.full}</p>
              <p>
                P.O. Box {SITE.address.poBox}, P.C. {SITE.address.postalCode}
              </p>
              <p>
                <a href={SITE.phoneHref} className="hover:text-white">
                  {SITE.phone}
                </a>
                {" · "}
                <a href={SITE.phoneAltHref} className="hover:text-white">
                  {SITE.phoneAlt}
                </a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </p>
              <p className="text-xs text-slate-500">C.R. {SITE.crNumber}</p>
              <p className="pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
                Emergency: {SITE.emergency}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: chromeBrand.accent.hex }}
            >
              {isPortalPage ? "Division Quick Links" : "Portals & Links"}
            </h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {chromeBrand.quickLinks.map((item) => (
                <li key={`${chromeBrand.id}-${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: chromeBrand.accent.hex }}
            >
              Connect
            </h3>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm text-slate-400 transition hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
                >
                  Request a Proposal <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  className="text-sm text-slate-400 transition hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-slate-400 transition hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
