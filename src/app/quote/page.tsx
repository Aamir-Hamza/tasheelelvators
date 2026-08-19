import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { QuoteCalculator } from "@/components/forms/quote-calculator";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Get an indicative elevator project estimate and request a formal proposal from Tasheel Elevators.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        titleKey="quote.title"
        descriptionKey="quote.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.quote" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <QuoteCalculator />
        </div>
      </section>
    </>
  );
}
