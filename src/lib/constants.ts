export const SITE = {
  name: "Tasheel Engineering",
  shortName: "Tasheel",
  legalName: "Tasheel Engineering LLC",
  crNumber: "1565950",
  tagline: "Precision Engineering. Master Maintenance.",
  description:
    "Tasheel Engineering delivers specialized engineering design and comprehensive maintenance across Oman and the GCC — with dedicated divisions in elevators & escalators and CCTV & smart home systems.",
  url: "https://tasheelevators.com",
  email: "info@tasheelelevators.com",
  salesEmail: "sale@tasheelelevators.com",
  phone: "+968 79123229",
  phoneAlt: "+968 95595521",
  whatsapp: "+968 79123229",
  emergency: "+968 79123229",
  phoneHref: "tel:+96879123229",
  phoneAltHref: "tel:+96895595521",
  whatsappNumber: "96879123229",
  whatsappHref:
    "https://api.whatsapp.com/send?phone=96879123229&text=Hello%21%20I%20am%20inquiring%20about%20Tasheel%20Engineering%20services.",
  emergencyHref: "tel:+96879123229",
  address: {
    line1: "Office No. 13, First Floor",
    line2: "Al-Khoudh, As Salam Street, Oman Oil",
    city: "Muscat",
    country: "Sultanate of Oman",
    poBox: "122",
    postalCode: "121",
    full: "Office No. 13, First Floor, Al-Khoudh, As Salam Street, Oman Oil, Muscat, Sultanate of Oman",
    short: "Al-Khoudh, As Salam Street, Muscat, Oman",
  },
  hours: "Sunday – Thursday, 8:00 AM – 6:00 PM",
  social: {
    linkedin: "https://linkedin.com/company/tasheel-engineering",
    instagram: "https://instagram.com/tasheelengineering",
    facebook: "https://facebook.com/tasheelengineering",
    youtube: "https://youtube.com/@tasheelengineering",
  },
  stats: [
    { label: "Projects Delivered", value: 850, suffix: "+" },
    { label: "Maintenance Contracts", value: 320, suffix: "+" },
    { label: "Uptime Rate", value: 99, suffix: "%" },
    { label: "Years Experience", value: 18, suffix: "+" },
  ],
} as const;

export const DIVISIONS = [
  {
    slug: "elevators",
    name: "Tasheel Elevators & Escalators",
    shortName: "Elevators & Escalators",
    href: "/elevators",
    accent: "cyan" as const,
    tagline: "Vertical mobility engineered for safety and performance",
    description:
      "Passenger elevators, freight lifts, escalators, modernizations, and preventive maintenance for commercial, residential, and institutional buildings.",
    highlights: [
      "Passenger & freight elevators",
      "Escalators & moving walkways",
      "Modernization & safety upgrades",
      "AMC & 24/7 emergency response",
    ],
    cta: "View Vertical Mobility Solutions",
  },
  {
    slug: "cctv-smart-home",
    name: "Tasheel Smart Systems",
    shortName: "Smart Systems",
    href: "/smart-systems",
    accent: "amber" as const,
    tagline: "Intelligent security and connected living",
    description:
      "Enterprise CCTV, AI surveillance, smart lighting, climate automation, and IoT infrastructure for homes, offices, and critical facilities.",
    highlights: [
      "AI-ready CCTV & NVRs",
      "Smart lighting & climate",
      "Access control & alarms",
      "IoT integration & monitoring",
    ],
    cta: "Explore Smart Automation",
  },
  {
    slug: "engineering",
    name: "Tasheel Engineering",
    shortName: "Engineering",
    href: "/engineering",
    accent: "slate" as const,
    tagline: "Architectural design and facilities maintenance",
    description:
      "End-to-end architectural and MEP design plus reliable technical and facilities maintenance for buildings across Oman and the GCC.",
    highlights: [
      "CAD, 3D modeling & MEP design",
      "Structural planning support",
      "HVAC, electrical & mechanical care",
      "Preventive facility audits",
    ],
    cta: "Explore Engineering Portal",
  },
] as const;

export const HEADER_NAV = [
  {
    id: "services",
    href: "/services",
    children: [
      { id: "engineeringDesign", href: "/services/engineering-design" },
      { id: "comprehensiveMaintenance", href: "/engineering" },
      { id: "systemsAuditing", href: "/services/systems-auditing" },
      { id: "emergencyResponse", href: "/services/emergency" },
    ],
  },
  {
    id: "divisions",
    href: "/divisions",
    children: [
      { id: "elevators", href: "/elevators" },
      { id: "smartSystems", href: "/smart-systems" },
      { id: "engineering", href: "/engineering" },
    ],
  },
  { id: "projects", href: "/projects" },
  { id: "about", href: "/about" },
  { id: "contact", href: "/contact" },
] as const;
