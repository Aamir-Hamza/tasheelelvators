import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your information."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-muted leading-relaxed">
          <p>
            {SITE.legalName} respects your privacy. Information submitted through contact forms,
            quote requests, or career applications is used solely to respond to your enquiry and
            deliver related services.
          </p>
          <p>
            We do not sell personal data. Access is limited to authorized staff and service
            providers required to operate this website and respond to enquiries.
          </p>
          <p>
            For privacy requests, contact{" "}
            <a href={`mailto:${SITE.email}`} className="text-electric">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
