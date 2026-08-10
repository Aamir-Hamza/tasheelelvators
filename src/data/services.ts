export type CoreService = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: "PenTool" | "Wrench" | "ClipboardCheck" | "Siren";
  highlights: string[];
};

export const coreServices: CoreService[] = [
  {
    slug: "engineering-design",
    name: "Engineering Design & Consulting",
    tagline: "Blueprints that build with precision",
    description:
      "Structural, mechanical, and electrical design with consultant-grade documentation for architects, developers, and government projects across Oman and the GCC.",
    icon: "PenTool",
    highlights: [
      "MEP & structural design coordination",
      "Specification writing & value engineering",
      "Shop drawing review",
      "Authority compliance support",
    ],
  },
  {
    slug: "maintenance",
    name: "Comprehensive Maintenance",
    tagline: "Predictive care. Measured uptime.",
    description:
      "Planned preventive maintenance, predictive diagnostics, and SLA-backed response for elevators, security systems, and building engineering assets.",
    icon: "Wrench",
    highlights: [
      "Preventive & predictive programmes",
      "Digital service reports",
      "Genuine parts supply",
      "Priority AMC response",
    ],
  },
  {
    slug: "systems-auditing",
    name: "Systems Auditing",
    tagline: "Know the health of every asset",
    description:
      "Independent audits of vertical transport and security infrastructure — risk scoring, compliance gaps, and modernization roadmaps.",
    icon: "ClipboardCheck",
    highlights: [
      "Safety & code gap analysis",
      "Lifecycle costing",
      "Modernization roadmap",
      "Executive reporting",
    ],
  },
  {
    slug: "emergency",
    name: "Emergency Response",
    tagline: "When minutes define outcomes",
    description:
      "24/7 emergency teams for trapped passenger rescue, critical security faults, and urgent engineering interventions.",
    icon: "Siren",
    highlights: [
      "24/7 emergency hotline",
      "Trained rescue technicians",
      "Rapid fault diagnosis",
      "GCC coverage network",
    ],
  },
];

export function getCoreService(slug: string) {
  return coreServices.find((s) => s.slug === slug);
}
