import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Tasheel Engineering account to request plans and store your project details securely.",
};

export default function SignupPage() {
  return (
    <>
      <PageHero
        title="Create account"
        description="Register to request maintenance plans, security audits, and elevator proposals."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sign up" }]}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-md px-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
              <SignupForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
