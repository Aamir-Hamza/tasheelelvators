import Link from "next/link";
import { SITE, DIVISIONS, HEADER_NAV } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const services =
    HEADER_NAV.find((l) => l.label === "Services")?.children ?? [];

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(2,132,199,0.12),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={56} href="/" withWordmark lightWordmark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {SITE.description}
            </p>
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

          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Divisions
            </h3>
            <ul className="mt-5 space-y-2.5">
              {DIVISIONS.map((d) => (
                <li key={d.slug}>
                  <Link href={d.href} className="text-sm text-slate-400 transition hover:text-white">
                    {d.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-sm text-slate-400 transition hover:text-white">
                  Elevator Products
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-slate-400 transition hover:text-white">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
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
            <form className="mt-6 space-y-2" action="#" method="post">
              <label htmlFor="newsletter" className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Newsletter
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold hover:bg-sky-500"
                >
                  Join
                </button>
              </div>
            </form>
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
