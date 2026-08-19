"use client";

import { PageHero } from "@/components/shared/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/home/cta-band";
import { useI18n } from "@/i18n/LanguageProvider";

const FAQ_ITEMS = [
  { cat: "general", q: "q0", a: "a0" },
  { cat: "general", q: "q1", a: "a1" },
  { cat: "products", q: "q2", a: "a2" },
  { cat: "products", q: "q3", a: "a3" },
  { cat: "services", q: "q4", a: "a4" },
  { cat: "services", q: "q5", a: "a5" },
  { cat: "safety", q: "q6", a: "a6" },
  { cat: "projects", q: "q7", a: "a7" },
  { cat: "pricing", q: "q8", a: "a8" },
] as const;

const CATEGORIES = ["general", "products", "services", "safety", "projects", "pricing"] as const;

export function FaqContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        titleKey="faq.title"
        descriptionKey="faq.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.faq" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          {CATEGORIES.map((category) => (
            <div key={category}>
              <h2 className="font-display text-2xl font-semibold">{t(`faq.${category}`)}</h2>
              <Accordion type="single" collapsible className="mt-4">
                {FAQ_ITEMS.filter((f) => f.cat === category).map((faq, i) => (
                  <AccordionItem key={faq.q} value={`${category}-${i}`}>
                    <AccordionTrigger>{t(`faq.${faq.q}`)}</AccordionTrigger>
                    <AccordionContent>{t(`faq.${faq.a}`)}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
