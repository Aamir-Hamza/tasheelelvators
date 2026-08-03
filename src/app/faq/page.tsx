import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { faqs } from "@/lib/data/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Tasheel Elevators products, AMC, installation timelines, and safety standards in Oman and the GCC.",
};

export default function FaqPage() {
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Practical answers for developers, facility managers, and consultants."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="font-display text-2xl font-semibold">{category}</h2>
              <Accordion type="single" collapsible className="mt-4">
                {faqs
                  .filter((f) => f.category === category)
                  .map((faq, i) => (
                    <AccordionItem key={faq.question} value={`${category}-${i}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
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
