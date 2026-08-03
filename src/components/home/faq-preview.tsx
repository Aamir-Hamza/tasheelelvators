"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { faqs } from "@/lib/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FaqPreview() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before you ask"
            description="Clear guidance on products, AMC, timelines, and compliance for projects across Oman and the GCC."
          />
          <Button asChild variant="outline" className="mt-8">
            <Link href="/faq">View all FAQs</Link>
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, 5).map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
