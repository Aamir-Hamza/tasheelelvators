import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Tasheel Engineering account to manage plan requests and quotes.",
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        titleKey="auth.loginTitle"
        descriptionKey="auth.loginBody"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "common.signIn" }]}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-md px-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <Suspense fallback={<p className="text-sm text-muted">…</p>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
