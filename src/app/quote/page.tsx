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
        title="Request a Quote"
        description="Use our capacity-aware calculator for planning ranges, then submit details for an engineer-reviewed proposal."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Quote" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <QuoteCalculator />
        </div>
      </section>
    </>
  );
}
