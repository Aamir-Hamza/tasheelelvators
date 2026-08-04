import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const products = NAV_LINKS.find((l) => l.label === "Products")?.children ?? [];
  const services = NAV_LINKS.find((l) => l.label === "Services")?.children ?? [];

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(27,143,255,0.12),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center">
              <Logo height={72} href="/" withWordmark lightWordmark />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver/80">
              {SITE.description}
            </p>
            <div className="mt-6 space-y-2 text-sm text-silver/75">
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
              <p>
                <a href={`mailto:${SITE.salesEmail}`} className="hover:text-white">
                  {SITE.salesEmail}
                </a>
              </p>
              <p className="text-xs text-silver/50">C.R. {SITE.crNumber}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-electric-bright">
              Products
            </h3>
            <ul className="mt-5 space-y-2.5">
              {products.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-silver/75 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-electric-bright">
              Services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-silver/75 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-electric-bright">
              Company
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Safety", href: "/safety" },
                { label: "Careers", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "Downloads", href: "/downloads" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-silver/75 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-electric-bright">
              Connect
            </h3>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm text-silver/75 transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/quote" className="inline-flex items-center gap-1 text-sm text-silver/75 transition hover:text-white">
                  Request Quote <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-silver/75 transition hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  className="text-sm text-silver/75 transition hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-silver/50">Emergency: {SITE.emergency}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-silver/50">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-silver/50">
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
