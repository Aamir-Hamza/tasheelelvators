export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "installation",
    name: "Installation",
    tagline: "Precision from shaft to handover",
    description:
      "End-to-end elevator and escalator installation by certified engineers—coordinated with your construction timeline across Oman and the GCC.",
    icon: "HardHat",
    highlights: [
      "Project planning & shaft survey",
      "OEM-grade installation methods",
      "Safety-first site protocols",
      "Commissioning & training",
    ],
  },
  {
    slug: "maintenance",
    name: "Maintenance & AMC",
    tagline: "Predictable uptime, year after year",
    description:
      "Annual Maintenance Contracts with scheduled inspections, original parts, and 24/7 response—keeping your vertical transport reliable.",
    icon: "Wrench",
    highlights: [
      "Preventive maintenance schedules",
      "Genuine spare parts",
      "Digital service reports",
      "Priority AMC response",
    ],
  },
  {
    slug: "modernization",
    name: "Modernization",
    tagline: "Bring legacy systems into the future",
    description:
      "Controller upgrades, cabin renewals, and safety enhancements that extend asset life while improving energy efficiency and passenger experience.",
    icon: "RefreshCw",
    highlights: [
      "Controller & drive upgrades",
      "Cabin & door modernization",
      "Safety code updates",
      "Minimal downtime planning",
    ],
  },
  {
    slug: "emergency",
    name: "Emergency Repairs",
    tagline: "Rapid response when minutes matter",
    description:
      "Round-the-clock emergency teams for trapped passenger rescue, fault diagnosis, and critical repairs across Muscat and major GCC cities.",
    icon: "Siren",
    highlights: [
      "24/7 emergency hotline",
      "Trained rescue technicians",
      "Fast fault diagnosis",
      "GCC coverage network",
    ],
  },
  {
    slug: "consultation",
    name: "Consultation",
    tagline: "Engineering advice from day one",
    description:
      "Specification support for architects, consultants, and developers—traffic analysis, shaft design, and product selection for every building type.",
    icon: "MessageSquare",
    highlights: [
      "Traffic & capacity studies",
      "Shaft design guidance",
      "Specification writing",
      "Value engineering",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
