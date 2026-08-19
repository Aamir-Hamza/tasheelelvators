"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { useBrand } from "@/components/providers/brand-provider";
import { useI18n } from "@/i18n/LanguageProvider";
import { useTranslatedBrand } from "@/i18n/useBrandCopy";

const LINK_KEYS: Record<string, string> = {
  "/elevators": "footer.elevatorsPortal",
  "/smart-systems": "footer.smartPortal",
  "/engineering": "footer.engineeringPortal",
  "/projects": "footer.projects",
  "/quote": "footer.requestProposal",
  "/products": "footer.elevatorModels",
  "/elevators#solutions": "footer.installation",
  "/elevators#projects": "footer.projectsGallery",
  "/elevators#amc": "footer.amcPlans",
  "/quote?service=elevators": "footer.requestQuote",
  "/smart-systems#solutions": "footer.cctvProducts",
  "/smart-systems#projects": "footer.caseStudies",
  "/quote?service=security-audit": "footer.securityAudit",
  "/smart-systems#contact": "footer.contactSecurity",
  "/services/engineering-design": "footer.designServices",
  "/engineering#amc": "footer.facilities",
  "/engineering#contact": "footer.emergencyResponse",
  "/quote?service=maintenance": "footer.requestMaintenance",
};

function footerLinkLabel(href: string, fallback: string, t: (key: string) => string) {
  const key = LINK_KEYS[href];
  if (!key) return fallback;
  const value = t(key);
  return value === key ? fallback : value;
}

export function Footer() {
  const { footerBrand, isPortalPage } = useBrand();
  const { t } = useI18n();
  const copy = useTranslatedBrand(footerBrand.id);
  const about = footerBrand.id === "group" ? copy.about : copy.footerAbout;
  const portalCta = footerBrand.id === "group" ? copy.cta : copy.portalCta;

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at bottom left, ${footerBrand.accent.soft}, transparent 45%)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={56} href="/" withWordmark lightWordmark dynamicBrand={false} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{about}</p>

            {isPortalPage && (
              <Link
                href={footerBrand.portalHref}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                style={{ borderColor: `${footerBrand.accent.hex}55` }}
              >
                {portalCta} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}

            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>{t("contact.address")}</p>
              <p>{t("common.poBox", { box: SITE.address.poBox, code: SITE.address.postalCode })}</p>
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
              <p className="text-xs text-slate-500">{t("common.cr", { number: SITE.crNumber })}</p>
              <p className="pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
                {t("common.emergency")}: {SITE.emergency}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: footerBrand.accent.hex }}
            >
              {isPortalPage ? t("footer.divisionLinks") : t("footer.quickLinks")}
            </h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {footerBrand.quickLinks.map((item) => (
                <li key={`${footerBrand.id}-${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {footerLinkLabel(item.href, item.label, t)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: footerBrand.accent.hex }}
            >
              {t("footer.connect")}
            </h3>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm text-slate-400 transition hover:text-white">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
                >
                  {t("common.requestProposal")} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  className="text-sm text-slate-400 transition hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("common.whatsapp")}
                </a>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-slate-400 transition hover:text-white">
                  {t("footer.careers")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.legalName}. {t("common.rights")}
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white">
              {t("common.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {t("common.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
