import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
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
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric text-sm font-bold">
                TE
              </span>
              <span className="font-display text-xl font-bold">
                Tasheel Elevators
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver/80">
              {SITE.description}
            </p>
            <div className="mt-6 space-y-2 text-sm text-silver/75">
              <p>{SITE.address.full}</p>
              <p>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </p>
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
                  href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
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
