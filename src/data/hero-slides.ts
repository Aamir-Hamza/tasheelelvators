export type BrandId = "group" | "elevators" | "cctv" | "maintenance";

export type BrandAccent = {
  hex: string;
  soft: string;
  glow: string;
  className: string;
};

export type BrandQuickLink = { label: string; href: string };

export type BrandProfile = {
  id: BrandId;
  name: string;
  subtitle: string;
  ariaLabel: string;
  accent: BrandAccent;
  /** Dedicated portal route */
  portalHref: string;
  footerAbout: string;
  quickLinks: BrandQuickLink[];
  portalCtaLabel: string;
};

export const BRANDS: Record<BrandId, BrandProfile> = {
  group: {
    id: "group",
    name: "TASHEEL",
    subtitle: "GROUP",
    ariaLabel: "Tasheel Group home",
    accent: {
      hex: "#00A8E8",
      soft: "rgba(0,168,232,0.18)",
      glow: "rgba(0,168,232,0.35)",
      className: "text-[#00A8E8]",
    },
    portalHref: "/",
    footerAbout:
      "Tasheel Group delivers specialized engineering design and comprehensive maintenance across Oman and the GCC — with dedicated divisions in elevators, smart security, and technical AMC.",
    quickLinks: [
      { label: "Elevators Portal", href: "/elevators" },
      { label: "Smart Systems Portal", href: "/cctv-smart-systems" },
      { label: "Maintenance Portal", href: "/maintenance" },
      { label: "Projects", href: "/projects" },
      { label: "Request a Proposal", href: "/quote" },
    ],
    portalCtaLabel: "Explore Tasheel Group",
  },
  elevators: {
    id: "elevators",
    name: "TASHEEL",
    subtitle: "ELEVATORS & ESCALATORS",
    ariaLabel: "Tasheel Elevators & Escalators",
    accent: {
      hex: "#00A8E8",
      soft: "rgba(0,168,232,0.18)",
      glow: "rgba(0,168,232,0.4)",
      className: "text-[#00A8E8]",
    },
    portalHref: "/elevators",
    footerAbout:
      "Tasheel Elevators & Escalators designs, installs, modernizes, and maintains passenger elevators, freight lifts, and escalators for commercial, residential, and institutional projects across Oman & the GCC.",
    quickLinks: [
      { label: "Elevator Models", href: "/products" },
      { label: "Installation & Modernization", href: "/elevators#solutions" },
      { label: "Projects Gallery", href: "/elevators#projects" },
      { label: "AMC Plans", href: "/elevators#amc" },
      { label: "Request Quote", href: "/quote?service=elevators" },
    ],
    portalCtaLabel: "Visit Full Elevator Portal",
  },
  cctv: {
    id: "cctv",
    name: "TASHEEL",
    subtitle: "SMART SYSTEMS",
    ariaLabel: "Tasheel Smart Systems",
    accent: {
      hex: "#F59E0B",
      soft: "rgba(245,158,11,0.18)",
      glow: "rgba(245,158,11,0.4)",
      className: "text-amber-400",
    },
    portalHref: "/cctv-smart-systems",
    footerAbout:
      "Tasheel Smart Systems delivers enterprise CCTV, access control, smart automation, and AI-powered monitoring for commercial and residential assets across Oman & the GCC.",
    quickLinks: [
      { label: "CCTV Products", href: "/cctv-smart-systems#solutions" },
      { label: "Access Control", href: "/cctv-smart-systems#solutions" },
      { label: "Case Studies", href: "/cctv-smart-systems#projects" },
      { label: "Security Audit", href: "/quote?service=security-audit" },
      { label: "Contact Security Team", href: "/cctv-smart-systems#contact" },
    ],
    portalCtaLabel: "Visit Full Smart Systems Portal",
  },
  maintenance: {
    id: "maintenance",
    name: "TASHEEL",
    subtitle: "MAINTENANCE SERVICES",
    ariaLabel: "Tasheel Maintenance Services",
    accent: {
      hex: "#38BDF8",
      soft: "rgba(56,189,248,0.16)",
      glow: "rgba(56,189,248,0.35)",
      className: "text-sky-400",
    },
    portalHref: "/maintenance",
    footerAbout:
      "Tasheel Maintenance Services provides predictive AMC programmes for elevators, security systems, and electro-mechanical infrastructure — engineered for zero downtime and rapid emergency response.",
    quickLinks: [
      { label: "AMC Plans", href: "/maintenance#amc" },
      { label: "Emergency Response", href: "/maintenance#contact" },
      { label: "Service Coverage", href: "/maintenance#solutions" },
      { label: "Schedule Visit", href: "/quote?service=maintenance" },
      { label: "Contact Dispatch", href: "/maintenance#contact" },
    ],
    portalCtaLabel: "Visit Full Maintenance Portal",
  },
};

/** Map portal pathnames → brand */
export const PORTAL_PATH_TO_BRAND: Record<string, BrandId> = {
  "/elevators": "elevators",
  "/cctv-smart-systems": "cctv",
  "/maintenance": "maintenance",
};

export const DIVISION_QUERY_KEY = "division";

export type HeroSlideId = Exclude<BrandId, "group">;

export type HeroStat = {
  value: string;
  label: string;
  numeric?: number;
  suffix?: string;
};

export type HeroSlide = {
  id: HeroSlideId;
  brandId: HeroSlideId;
  tab: string;
  brandName: string;
  taglineBanner: string;
  headline: string;
  subheadline: string;
  stats: HeroStat[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  nodes: [{ id: "01"; label: string }, { id: "02"; label: string }, { id: "03"; label: string }];
  scene: HeroSlideId;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "elevators",
    brandId: "elevators",
    tab: "ELEVATORS",
    brandName: "TASHEEL ELEVATORS & ESCALATORS",
    taglineBanner: "VERTICAL TRANSPORTATION • ENGINEERING DESIGN • OMAN & GCC",
    headline: "Tasheel Elevators. Precision Motion That Scales.",
    subheadline:
      "Specialized engineering design, installation, and modernization for passenger elevators, freight lifts, and escalators across Oman & the GCC.",
    stats: [
      { value: "850+", label: "Projects Delivered", numeric: 850, suffix: "+" },
      { value: "EN81", label: "European Compliance" },
      { value: "99.8%", label: "System Uptime" },
    ],
    primaryCta: { label: "Explore Elevator Portal", href: "/elevators" },
    secondaryCta: { label: "Request Installation Quote", href: "/quote?service=elevators" },
    nodes: [
      { id: "01", label: "Glass Cab" },
      { id: "02", label: "Drive & Safety" },
      { id: "03", label: "Escalator Run" },
    ],
    scene: "elevators",
  },
  {
    id: "cctv",
    brandId: "cctv",
    tab: "CCTV / SMART SYSTEMS",
    brandName: "TASHEEL SMART SYSTEMS",
    taglineBanner: "CCTV • SMART AUTOMATION • SECURITY INFRASTRUCTURE",
    headline: "Tasheel Smart Systems. Intelligent Security for Modern Assets.",
    subheadline:
      "Enterprise CCTV surveillance, access control, smart home integration, and AI-powered monitoring systems.",
    stats: [
      { value: "1,200+", label: "Systems Installed", numeric: 1200, suffix: "+" },
      { value: "24/7", label: "Live Monitoring" },
      { value: "IP67", label: "Enterprise Grade" },
    ],
    primaryCta: {
      label: "Explore CCTV & Security Portal",
      href: "/cctv-smart-systems",
    },
    secondaryCta: { label: "Schedule Security Audit", href: "/quote?service=security-audit" },
    nodes: [
      { id: "01", label: "AI CCTV Array" },
      { id: "02", label: "Access Control" },
      { id: "03", label: "Command Overlay" },
    ],
    scene: "cctv",
  },
  {
    id: "maintenance",
    brandId: "maintenance",
    tab: "MAINTENANCE",
    brandName: "TASHEEL MAINTENANCE SERVICES",
    taglineBanner: "PREDICTIVE AMC • ELECTRO-MECHANICAL • INFRASTRUCTURE CARE",
    headline: "Tasheel Maintenance. Zero Downtime. Total Reliability.",
    subheadline:
      "Proactive annual maintenance contracts (AMC) for elevators, security systems, and electro-mechanical infrastructure.",
    stats: [
      { value: "320+", label: "Active AMC Contracts", numeric: 320, suffix: "+" },
      { value: "<15 min", label: "Emergency Response" },
      { value: "100%", label: "Certified Engineers", numeric: 100, suffix: "%" },
    ],
    primaryCta: { label: "Explore Maintenance Portal", href: "/maintenance" },
    secondaryCta: { label: "Schedule Service Visit", href: "/quote?service=maintenance" },
    nodes: [
      { id: "01", label: "Predictive Telemetry" },
      { id: "02", label: "Hydraulic Core" },
      { id: "03", label: "Diagnostics HUD" },
    ],
    scene: "maintenance",
  },
];

export const HERO_AUTOPLAY_MS = 6000;

export function slideToHotspot(id: HeroSlideId): "elevator" | "cctv" | "maintenance" {
  if (id === "elevators") return "elevator";
  return id;
}

export function isHeroSlideId(value: string | null | undefined): value is HeroSlideId {
  return value === "elevators" || value === "cctv" || value === "maintenance";
}
