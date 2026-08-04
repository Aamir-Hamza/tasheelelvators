import { SITE } from "@/lib/constants";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: "OM",
      postOfficeBoxNumber: SITE.address.poBox,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.salesEmail,
        contactType: "sales",
        areaServed: ["OM", "AE", "SA", "QA", "BH", "KW"],
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneAlt,
        email: SITE.email,
        contactType: "customer service",
        areaServed: ["OM", "AE", "SA", "QA", "BH", "KW"],
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.whatsapp,
        contactType: "customer support",
        areaServed: "OM",
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.emergency,
        contactType: "emergency",
        areaServed: "OM",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    sameAs: Object.values(SITE.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
