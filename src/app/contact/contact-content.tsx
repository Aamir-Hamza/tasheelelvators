"use client";

import type { ComponentType } from "react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { SITE } from "@/lib/constants";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export function ContactContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        titleKey="contact.title"
        descriptionKey="contact.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.contact" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Info icon={MapPin} label={t("contact.office")} value={t("contact.address")} />
            <Info
              icon={MapPin}
              label={t("contact.poBox")}
              value={t("common.poBox", { box: SITE.address.poBox, code: SITE.address.postalCode })}
            />
            <Info icon={Phone} label={t("contact.tel")} value={SITE.phone} href={SITE.phoneHref} />
            <Info icon={Phone} label={t("contact.telAlt")} value={SITE.phoneAlt} href={SITE.phoneAltHref} />
            <Info
              icon={MessageCircle}
              label={t("common.whatsapp")}
              value={SITE.whatsapp}
              href={SITE.whatsappHref}
            />
            <Info icon={Mail} label={t("contact.info")} value={SITE.email} href={`mailto:${SITE.email}`} />
            <Info
              icon={Mail}
              label={t("contact.sales")}
              value={SITE.salesEmail}
              href={`mailto:${SITE.salesEmail}`}
            />
            <Info icon={Clock} label={t("contact.hours")} value={t("contact.hoursValue")} />
            <p className="px-1 text-xs text-muted">{t("common.cr", { number: SITE.crNumber })}</p>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
                {t("contact.emergency")}
              </p>
              <a
                href={SITE.emergencyHref}
                className="mt-2 block font-display text-2xl font-bold text-red-500"
              >
                {SITE.emergency}
              </a>
              <p className="mt-2 text-sm text-muted">{t("contact.emergencyBody")}</p>
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title={t("contact.mapTitle")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.2!2d58.4!3d23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzAwLjAiTiA1OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2som!4v1700000000000"
              className="h-[380px] w-full border-0 grayscale invert-[0.85] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-xs text-muted">{t("contact.mapHint")}</p>
        </div>
      </section>
    </>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a
      href={href}
      className="font-medium hover:text-electric"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      {value}
    </a>
  ) : (
    <p className="font-medium">{value}</p>
  );

  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
        <div className="mt-1">{content}</div>
      </div>
    </div>
  );
}
