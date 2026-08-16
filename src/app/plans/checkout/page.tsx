import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import { PlanCheckoutForm } from "@/components/auth/plan-checkout-form";

export const metadata: Metadata = {
  title: "Request a Plan",
  description: "Submit an AMC or service plan request to Tasheel Engineering.",
};

export default function PlanCheckoutPage() {
  return (
    <>
      <PageHero
        title="Request a plan"
        description="Sign in to save your plan request. We store your order securely and follow up with our specialists."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Plans", href: "/plans/checkout" },
        ]}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-6">
          <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
            <PlanCheckoutForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
