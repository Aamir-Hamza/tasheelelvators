import type { DivisionId } from "@/config/brandsData";

export type CategorySlug = "elevators" | "smart-systems" | "engineering-design";

export type LucideIconName =
  | "ArrowUpDown"
  | "Building2"
  | "Cpu"
  | "Eye"
  | "Gauge"
  | "HardHat"
  | "KeyRound"
  | "Layers"
  | "Monitor"
  | "MoveHorizontal"
  | "PenTool"
  | "Ruler"
  | "ScanFace"
  | "ShieldCheck"
  | "Sparkles"
  | "Video"
  | "Warehouse"
  | "Wrench";

export type StatItem = {
  label: string;
  value: string;
  hint?: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  specs: string[];
  icon: LucideIconName;
  image: string;
  href: string;
};

export type ShowcaseItem = {
  title: string;
  description: string;
  image: string;
  badge: string;
};

export type CategoryTheme = {
  accent: string;
  accentSoft: string;
  glow: string;
  border: string;
  surface: string;
  pill: string;
  cta: string;
};

export type CategoryData = {
  id: DivisionId;
  slug: CategorySlug;
  seoTitle: string;
  seoDescription: string;
  label: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  theme: CategoryTheme;
  heroImage: string;
  heroImageAlt: string;
  /** When true, the banner already contains logo/headline/CTA — do not cover it. */
  embeddedHeroCopy?: boolean;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: StatItem[];
  servicesTitle: string;
  servicesDescription: string;
  services: ServiceItem[];
  showcaseTitle: string;
  showcaseDescription: string;
  showcase: ShowcaseItem[];
  ctaBadge: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaFormContext: string;
};

export type CompanyContentConfig = Record<DivisionId, CategoryData>;

export const CATEGORY_SLUG: Record<DivisionId, CategorySlug> = {
  elevators: "elevators",
  "smart-systems": "smart-systems",
  engineering: "engineering-design",
};

export function parseCategoryParam(value: string | null | undefined): DivisionId | null {
  if (!value) return null;
  if (value === "elevators") return "elevators";
  if (value === "smart-systems" || value === "cctv") return "smart-systems";
  if (value === "engineering-design" || value === "engineering") return "engineering";
  return null;
}

export const COMPANY_CONTENT: CompanyContentConfig = {
  elevators: {
    id: "elevators",
    slug: "elevators",
    seoTitle: "Next-Generation Vertical Mobility & Lift Engineering",
    seoDescription:
      "Safe, high-speed passenger, panoramic, and industrial freight elevator solutions across Oman and the GCC.",
    label: "Elevators",
    eyebrow: "Vertical Mobility",
    headline: "Next-Generation Vertical Mobility & Lift Engineering",
    subheadline:
      "Delivering safe, high-speed, and energy-efficient passenger, panoramic, and industrial freight elevator solutions.",
    theme: {
      accent: "#2563EB",
      accentSoft: "rgba(37, 99, 235, 0.16)",
      glow: "rgba(37, 99, 235, 0.35)",
      border: "rgba(148, 163, 184, 0.35)",
      surface: "rgba(15, 23, 42, 0.72)",
      pill: "bg-slate-900 text-white",
      cta: "bg-slate-900 hover:bg-slate-800 text-white",
    },
    heroImage: "/slider/slide1.png",
    heroImageAlt: "Tasheel passenger elevator cabin and shaft",
    primaryCta: { label: "Specify a Lift", href: "/quote?service=elevators" },
    secondaryCta: { label: "Open Elevators Portal", href: "/elevators" },
    stats: [
      { label: "Rated speed", value: "4.0 m/s", hint: "High-rise passenger banks" },
      { label: "Fleet uptime", value: "99.9%", hint: "AMC-backed availability" },
      { label: "Emergency desk", value: "24/7", hint: "Rescue-ready dispatch" },
    ],
    servicesTitle: "Products & lift engineering",
    servicesDescription:
      "Passenger, panoramic, and freight systems — specified, installed, and maintained for Gulf conditions.",
    services: [
      {
        title: "Passenger Lifts",
        description: "Gearless MRL and machine-room passenger elevators with destination dispatch.",
        specs: ["Up to 4.0 m/s", "EN 81 compliant", "IoT monitoring"],
        icon: "ArrowUpDown",
        image: "/elevators/platform-home-lift.jpg",
        href: "/products/passenger-elevators",
      },
      {
        title: "Panoramic Glass Elevators",
        description: "Architectural observation lifts with marine-grade glass and silent ride.",
        specs: ["Custom cabins", "LED scenes", "Atrium-ready"],
        icon: "Sparkles",
        image: "/slider/elevators-lift.png",
        href: "/products/passenger-elevators",
      },
      {
        title: "Heavy Freight Lifts",
        description: "High-capacity goods lifts for loading bays, hospitals, and warehouses.",
        specs: ["2–5 ton class", "Robust doors", "Service cores"],
        icon: "Warehouse",
        image: "/elevators/cargo-lift.jpg",
        href: "/products/freight-elevators",
      },
      {
        title: "Escalators & Moving Walks",
        description: "Indoor and weather-protected units for malls, transit, and hotels.",
        specs: ["Heavy-duty chains", "Auto energy mode", "Outdoor kits"],
        icon: "MoveHorizontal",
        image: "/elevators/escalator-walking.jpg",
        href: "/elevators#solutions",
      },
      {
        title: "Modernization & AMC",
        description: "Controller, cabin, and safety upgrades plus 24/7 preventive maintenance.",
        specs: ["Phased shutdowns", "Genuine parts", "Rescue SLA"],
        icon: "Wrench",
        image: "/projects/sahara-hotel-amc.png",
        href: "/elevators#amc",
      },
    ],
    showcaseTitle: "Cabin, dispatch & capacity",
    showcaseDescription: "Interactive previews of how Tasheel specifies and operates vertical mobility.",
    showcase: [
      {
        title: "Cabin interior visualizer",
        description: "Premium finishes, lighting scenes, and accessibility layouts for passenger cabs.",
        image: "/elevators/platform-home-lift.jpg",
        badge: "Cabin",
      },
      {
        title: "Smart dispatch controller",
        description: "Destination control and traffic algorithms that cut peak wait times.",
        image: "/elevator_ecsalator/Gemini_Generated_Image_6wojo6wojo6wojo6.png",
        badge: "Dispatch",
      },
      {
        title: "Load capacity planning",
        description: "Shaft, pit, and payload modelling before steel is on site.",
        image: "/elevators/puzzle-parking.jpg",
        badge: "Capacity",
      },
    ],
    ctaBadge: "Elevators enquiry",
    ctaHeadline: "Specify your next lift bank with Tasheel",
    ctaBody: "Share building height, traffic class, and handover date — we return a technical proposal with AMC options.",
    ctaFormContext: "elevators",
  },
  "smart-systems": {
    id: "smart-systems",
    slug: "smart-systems",
    seoTitle: "Intelligent Surveillance & Integrated Security Infrastructure",
    seoDescription:
      "AI-powered CCTV, biometric access control, and unified building automation across Oman and the GCC.",
    label: "Smart Systems",
    eyebrow: "Security & Automation",
    headline: "Intelligent Surveillance & Integrated Security Infrastructure",
    subheadline:
      "AI-powered CCTV surveillance, biometric access control, and unified building automation systems.",
    theme: {
      accent: "#06B6D4",
      accentSoft: "rgba(6, 182, 212, 0.18)",
      glow: "rgba(34, 211, 238, 0.4)",
      border: "rgba(6, 182, 212, 0.28)",
      surface: "rgba(8, 51, 68, 0.55)",
      pill: "bg-cyan-700 text-white",
      cta: "bg-cyan-600 hover:bg-cyan-500 text-white",
    },
    heroImage: "/slider/slide2.png",
    heroImageAlt: "Tasheel CCTV and smart security operations",
    primaryCta: { label: "Request Security Audit", href: "/quote?service=security-audit" },
    secondaryCta: { label: "Open Smart Systems Portal", href: "/smart-systems" },
    stats: [
      { label: "Video class", value: "4K UHD", hint: "AI analytics ready" },
      { label: "Face match", value: "<0.2s", hint: "On-edge recognition" },
      { label: "Recording", value: "Zero-downtime", hint: "Redundant NVR / cloud" },
    ],
    servicesTitle: "Security stack we deploy",
    servicesDescription: "Cameras, identity, intercoms, and IoT — designed as one monitored platform.",
    services: [
      {
        title: "AI Dome & Bullet IP Cameras",
        description: "Hikvision-class 4K sensors with intrusion, loitering, and people-count analytics.",
        specs: ["Color-at-night", "AI events", "PoE+"],
        icon: "Video",
        image: "/cctv/hikvision-camera.png",
        href: "/smart-systems#solutions",
      },
      {
        title: "Biometric & RFID Access",
        description: "Face, fingerprint, and card readers tied into door controllers and alarms.",
        specs: ["Anti-passback", "Visitor logs", "Fail-secure"],
        icon: "ScanFace",
        image: "/cctv/orvibo-smart-lock.png",
        href: "/smart-systems#solutions",
      },
      {
        title: "Smart Video Intercoms",
        description: "Villa and lobby stations with mobile unlock and recorded call trails.",
        specs: ["SIP / app", "Night IR", "Multi-tenant"],
        icon: "Monitor",
        image: "/slider/slide2.png",
        href: "/smart-systems#solutions",
      },
      {
        title: "Central Monitoring & NVR",
        description: "On-prem NVR and SOC-ready streams with health watchdog and backup.",
        specs: ["RAID storage", "Remote health", "Audit export"],
        icon: "Eye",
        image: "/cctv/hikvision-camera.png",
        href: "/smart-systems#solutions",
      },
      {
        title: "IoT Building Automation",
        description: "Lighting, climate, and scene control on a secure backbone for villas and campuses.",
        specs: ["Scene engine", "HVAC links", "Encrypted IoT"],
        icon: "Cpu",
        image: "/cctv/orvibo-smart-lock.png",
        href: "/smart-systems#solutions",
      },
    ],
    showcaseTitle: "Operations you can see",
    showcaseDescription: "Dashboard, night vision, and multi-site control — how operators actually work the system.",
    showcase: [
      {
        title: "Live feed command UI",
        description: "Multi-grid camera walls with AI event rails and operator notes.",
        image: "/cctv/hikvision-camera.png",
        badge: "SOC",
      },
      {
        title: "Color-at-night compare",
        description: "Low-light vs full-color night imaging for perimeter and car parks.",
        image: "/slider/slide2.png",
        badge: "Imaging",
      },
      {
        title: "Multi-device management",
        description: "Locks, cameras, and intercoms on one credential and one dashboard.",
        image: "/cctv/orvibo-smart-lock.png",
        badge: "Platform",
      },
    ],
    ctaBadge: "Smart systems enquiry",
    ctaHeadline: "Design a monitored security grid",
    ctaBody: "Tell us camera count, access points, and recording retention — we return a BOM and commissioning plan.",
    ctaFormContext: "security-audit",
  },
  engineering: {
    id: "engineering",
    slug: "engineering-design",
    seoTitle: "Precision Engineering, Architectural & Structural Solutions",
    seoDescription:
      "MEP engineering, 3D BIM, feasibility studies, and certified architectural consultancy across Oman and the GCC.",
    label: "Engineering & Design",
    eyebrow: "Design & Consultancy",
    headline: "Precision Engineering, Architectural & Structural Solutions",
    subheadline:
      "End-to-end MEP engineering, 3D BIM modeling, feasibility studies, and certified architectural consultancy.",
    theme: {
      accent: "#F59E0B",
      accentSoft: "rgba(245, 158, 11, 0.18)",
      glow: "rgba(251, 191, 36, 0.35)",
      border: "rgba(245, 158, 11, 0.28)",
      surface: "rgba(69, 26, 3, 0.35)",
      pill: "bg-orange-600 text-white",
      cta: "bg-orange-600 hover:bg-orange-500 text-white",
    },
    heroImage: "/slider/engineering-design-hero.png",
    heroImageAlt: "Tasheel Engineering — innovation in design, reliability in maintenance",
    embeddedHeroCopy: true,
    primaryCta: { label: "Start a Design Package", href: "/quote?service=engineering-design" },
    secondaryCta: { label: "Open Engineering Portal", href: "/engineering" },
    stats: [
      { label: "Authority packs", value: "100%", hint: "Code-compliant submissions" },
      { label: "Model precision", value: "mm CAD", hint: "Coordinated 3D BIM" },
      { label: "Structural sign-off", value: "Certified", hint: "Load & safety reviews" },
    ],
    servicesTitle: "Design disciplines",
    servicesDescription: "From concept BIM to site supervision — drawings you can build and audit.",
    services: [
      {
        title: "3D CAD & BIM Integration",
        description: "Federated Revit/CAD models with clash detection before construction.",
        specs: ["LOD 300+", "Clash reports", "IFC export"],
        icon: "Layers",
        image: "/projects/ministry-mep-design.png",
        href: "/services/engineering-design",
      },
      {
        title: "MEP Layouts",
        description: "Mechanical, electrical, and plumbing coordination for towers and campuses.",
        specs: ["HVAC loads", "Power risers", "Drainage"],
        icon: "PenTool",
        image: "/projects/engineering-maintenance-composite.png",
        href: "/services/engineering-design",
      },
      {
        title: "Structural & Traffic Analysis",
        description: "Load paths, elevator traffic studies, and shaft sizing for developers.",
        specs: ["Static loads", "Traffic sims", "Core sizing"],
        icon: "Ruler",
        image: "/projects/ministry-mep-design.png",
        href: "/services/engineering-design",
      },
      {
        title: "Supervision & Certification",
        description: "On-site inspections, as-built packs, and authority documentation.",
        specs: ["Snag lists", "As-builts", "Municipality"],
        icon: "HardHat",
        image: "/projects/sahara-hotel-amc.png",
        href: "/engineering",
      },
    ],
    showcaseTitle: "Drawings that build",
    showcaseDescription: "Blueprint overlays, exploded assemblies, and schematic galleries from live packages.",
    showcase: [
      {
        title: "Blueprint overlay",
        description: "Architectural plans with coordinated MEP color overlays.",
        image: "/projects/ministry-mep-design.png",
        badge: "BIM",
      },
      {
        title: "Exploded assembly",
        description: "Plant-room and riser breakdowns for contractor sequencing.",
        image: "/projects/engineering-maintenance-composite.png",
        badge: "MEP",
      },
      {
        title: "Technical schematics",
        description: "Single-line diagrams and control schematics ready for authority.",
        image: "/projects/ministry-mep-design.png",
        badge: "Docs",
      },
    ],
    ctaBadge: "Engineering enquiry",
    ctaHeadline: "Commission a BIM-ready design package",
    ctaBody: "Send plot data, programme, and authority scope — Tasheel returns a staged design and supervision plan.",
    ctaFormContext: "engineering-design",
  },
};

export function getCategoryContent(id: DivisionId): CategoryData {
  return COMPANY_CONTENT[id];
}
