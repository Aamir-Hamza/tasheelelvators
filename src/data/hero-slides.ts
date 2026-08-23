export type BrandId = "group" | "elevators" | "smart-systems" | "engineering";

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
      hex: "#1E3A5F",
      soft: "rgba(30, 58, 95, 0.16)",
      glow: "rgba(15, 23, 42, 0.35)",
      className: "text-slate-700",
    },
    portalHref: "/",
    footerAbout:
      "Tasheel Group delivers specialized engineering design and comprehensive maintenance across Oman and the GCC — with dedicated divisions in elevators, smart security, and technical facilities.",
    quickLinks: [
      { label: "Elevators Portal", href: "/elevators" },
      { label: "Smart Systems Portal", href: "/smart-systems" },
      { label: "Engineering Portal", href: "/engineering" },
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
      hex: "#1E3A5F",
      soft: "rgba(30, 58, 95, 0.16)",
      glow: "rgba(15, 23, 42, 0.35)",
      className: "text-slate-300",
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
  "smart-systems": {
    id: "smart-systems",
    name: "TASHEEL",
    subtitle: "SMART SYSTEMS",
    ariaLabel: "Tasheel Smart Systems",
    accent: {
      hex: "#0891B2",
      soft: "rgba(8, 145, 178, 0.18)",
      glow: "rgba(6, 182, 212, 0.4)",
      className: "text-cyan-300",
    },
    portalHref: "/smart-systems",
    footerAbout:
      "Tasheel Smart Systems delivers enterprise CCTV, access control, smart automation, and AI-powered monitoring for commercial and residential assets across Oman & the GCC.",
    quickLinks: [
      { label: "CCTV Products", href: "/smart-systems#solutions" },
      { label: "Access Control", href: "/smart-systems#solutions" },
      { label: "Case Studies", href: "/smart-systems#projects" },
      { label: "Security Audit", href: "/quote?service=security-audit" },
      { label: "Contact Security Team", href: "/smart-systems#contact" },
    ],
    portalCtaLabel: "Visit Full Smart Systems Portal",
  },
  engineering: {
    id: "engineering",
    name: "TASHEEL",
    subtitle: "ENGINEERING AND DESIGN",
    ariaLabel: "Tasheel Engineering",
    accent: {
      hex: "#C2410C",
      soft: "rgba(194, 65, 12, 0.16)",
      glow: "rgba(234, 88, 12, 0.38)",
      className: "text-orange-300",
    },
    portalHref: "/engineering",
    footerAbout:
      "Tasheel Engineering provides architectural and MEP design plus reliable technical and facilities maintenance across Oman and the GCC.",
    quickLinks: [
      { label: "Design Services", href: "/services/engineering-design" },
      { label: "Facilities Maintenance", href: "/engineering#amc" },
      { label: "Emergency Response", href: "/engineering#contact" },
      { label: "Request Maintenance", href: "/quote?service=maintenance" },
      { label: "Contact Dispatch", href: "/engineering#contact" },
    ],
    portalCtaLabel: "Visit Full Engineering Portal",
  },
};

export const PORTAL_PATH_TO_BRAND: Record<string, BrandId> = {
  "/elevators": "elevators",
  "/smart-systems": "smart-systems",
  "/cctv-smart-systems": "smart-systems",
  "/engineering": "engineering",
  "/maintenance": "engineering",
};

export const DIVISION_QUERY_KEY = "division";

/** Portal content keys used by DivisionPortalPage and plan checkout */
export type HeroSlideId = "elevators" | "cctv" | "maintenance";

export function isHeroSlideId(value: string | null | undefined): value is HeroSlideId {
  return value === "elevators" || value === "cctv" || value === "maintenance";
}
