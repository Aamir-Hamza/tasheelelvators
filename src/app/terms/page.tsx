import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description="Website use and informational content terms."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />
      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-muted leading-relaxed">
          <p>
            Content on this website is provided for general information. Product specifications,
            timelines, and pricing estimates are indicative until confirmed in a written proposal
            or contract with {SITE.legalName}.
          </p>
          <p>
            Unauthorized use of branding, imagery, or documents without written permission is
            prohibited. Service engagements are governed by separate commercial agreements.
          </p>
          <p>
            Questions:{" "}
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
