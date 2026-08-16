import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { AccountDashboard } from "@/components/auth/account-dashboard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Tasheel Engineering account and plan requests.",
};

export default function AccountPage() {
  return (
    <>
      <PageHero
        title="My account"
        description="View your profile and submitted plan requests."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Account" }]}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AccountDashboard />
        </div>
      </section>
    </>
  );
}
