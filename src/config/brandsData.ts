export const BRAND_STORAGE_KEY = "tasheel-brand";

export type DivisionId = "elevators" | "smart-systems" | "engineering";

export type BrandCta = {
  label: string;
  href: string;
};

export type BrandService = {
  title: string;
  description: string;
  href: string;
  icon: "Building2" | "Wrench" | "Video" | "KeyRound" | "Cpu" | "ArrowUpDown" | "RefreshCw" | "ShieldCheck" | "PenTool" | "HardHat";
};

export type BrandColors = {
  hex: string;
  soft: string;
  glow: string;
  className: string;
  barClass: string;
  heroOverlay: string;
  pillActive: string;
  ctaClass: string;
};

export type DivisionBrand = {
  id: DivisionId;
  name: "TASHEEL";
  subtitle: string;
  shortLabel: string;
  ariaLabel: string;
  href: string;
  colors: BrandColors;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    image: string;
    imageAlt: string;
    primaryCta: BrandCta;
    secondaryCta: BrandCta;
  };
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  services: BrandService[];
};

export const DIVISION_ORDER: DivisionId[] = ["elevators", "smart-systems", "engineering"];

export const BRANDS_DATA: Record<DivisionId, DivisionBrand> = {
  elevators: {
    id: "elevators",
    name: "TASHEEL",
    subtitle: "ELEVATORS & ESCALATORS",
    shortLabel: "Elevators",
    ariaLabel: "Tasheel Elevators & Escalators",
    href: "/elevators",
    colors: {
      hex: "#1E3A5F",
      soft: "rgba(30, 58, 95, 0.16)",
      glow: "rgba(15, 23, 42, 0.35)",
      className: "text-slate-700",
      barClass: "bg-slate-900",
      heroOverlay: "from-slate-950/80 via-slate-950/45 to-navy-deep/30",
      pillActive: "bg-slate-900 text-white",
      ctaClass: "bg-slate-900 hover:bg-slate-800 text-white",
    },
    hero: {
      eyebrow: "Vertical Transportation",
      headline: "Elevators, Escalators & Preventive Maintenance",
      subheadline:
        "Installation, modernization, and lifecycle care for passenger, freight, and panoramic systems across Oman and the GCC.",
      image: "/slider/slide1.png",
      imageAlt: "Tasheel Elevators and Escalators",
      primaryCta: { label: "Get a Quote", href: "/quote?service=elevators" },
      secondaryCta: { label: "Explore Elevators", href: "/elevators" },
    },
    servicesEyebrow: "Elevators Division",
    servicesTitle: "Mobility systems we engineer",
    servicesDescription:
      "From shaft survey to handover and AMC — vertical transport built for Gulf conditions.",
    services: [
      {
        title: "Installation",
        description: "OEM-grade elevator and escalator installation coordinated with your construction programme.",
        href: "/elevators#solutions",
        icon: "ArrowUpDown",
      },
      {
        title: "Modernization",
        description: "Controller, cabin, and safety upgrades that extend asset life with minimal downtime.",
        href: "/elevators#solutions",
        icon: "RefreshCw",
      },
      {
        title: "Preventive Maintenance",
        description: "Scheduled inspections, genuine parts, and 24/7 rescue-ready AMC coverage.",
        href: "/elevators#amc",
        icon: "ShieldCheck",
      },
    ],
  },
  "smart-systems": {
    id: "smart-systems",
    name: "TASHEEL",
    subtitle: "SMART SYSTEMS",
    shortLabel: "Smart Systems",
    ariaLabel: "Tasheel Smart Systems",
    href: "/smart-systems",
    colors: {
      hex: "#0891B2",
      soft: "rgba(8, 145, 178, 0.18)",
      glow: "rgba(6, 182, 212, 0.4)",
      className: "text-cyan-600",
      barClass: "bg-cyan-700",
      heroOverlay: "from-slate-950/85 via-cyan-950/50 to-slate-950/20",
      pillActive: "bg-cyan-700 text-white",
      ctaClass: "bg-cyan-600 hover:bg-cyan-500 text-white",
    },
    hero: {
      eyebrow: "CCTV & Automation",
      headline: "Advanced CCTV & Smart Security Solutions",
      subheadline:
        "Enterprise surveillance, biometric access, and intelligent automation engineered for commercial and residential assets.",
      image: "/slider/slide2.png",
      imageAlt: "Tasheel Smart Systems CCTV and security",
      primaryCta: { label: "Get a Quote", href: "/quote?service=security-audit" },
      secondaryCta: { label: "Explore CCTV Systems", href: "/smart-systems" },
    },
    servicesEyebrow: "Smart Systems Division",
    servicesTitle: "Security and automation stack",
    servicesDescription:
      "Cameras, access, and building intelligence — designed, installed, and monitored by Tasheel.",
    services: [
      {
        title: "CCTV Surveillance",
        description: "IP cameras, NVRs, and AI analytics for intrusion, loitering, and people-counting workflows.",
        href: "/smart-systems#solutions",
        icon: "Video",
      },
      {
        title: "Access Control",
        description: "Biometric readers, door controllers, and integrated alarm workflows for secure sites.",
        href: "/smart-systems#solutions",
        icon: "KeyRound",
      },
      {
        title: "Smart Automation",
        description: "Lighting, climate, and scene control with a secure IoT backbone for villas and campuses.",
        href: "/smart-systems#solutions",
        icon: "Cpu",
      },
    ],
  },
  engineering: {
    id: "engineering",
    name: "TASHEEL",
    subtitle: "ENGINEERING",
    shortLabel: "Engineering",
    ariaLabel: "Tasheel Engineering",
    href: "/engineering",
    colors: {
      hex: "#C2410C",
      soft: "rgba(194, 65, 12, 0.16)",
      glow: "rgba(234, 88, 12, 0.38)",
      className: "text-orange-600",
      barClass: "bg-orange-600",
      heroOverlay: "from-stone-950/85 via-orange-950/45 to-slate-950/25",
      pillActive: "bg-orange-600 text-white",
      ctaClass: "bg-orange-600 hover:bg-orange-500 text-white",
    },
    hero: {
      eyebrow: "Design & Facilities",
      headline: "Comprehensive Engineering Design & Facilities Maintenance",
      subheadline:
        "End-to-end architectural, MEP design, and reliable technical maintenance services.",
      image: "/slider/slide3.png",
      imageAlt: "Tasheel Engineering design and facilities maintenance",
      primaryCta: { label: "Request Maintenance", href: "/quote?service=maintenance" },
      secondaryCta: { label: "Explore Design Services", href: "/services/engineering-design" },
    },
    servicesEyebrow: "Engineering Division",
    servicesTitle: "Design precision. Technical care.",
    servicesDescription:
      "Consultant-grade drawings and facility uptime — the parent discipline behind every Tasheel project.",
    services: [
      {
        title: "Engineering & Architectural Design",
        description:
          "CAD drafting, 3D modeling, MEP coordination, and structural planning for architects and developers.",
        href: "/services/engineering-design",
        icon: "PenTool",
      },
      {
        title: "Technical & Facility Maintenance",
        description:
          "HVAC, electrical, and mechanical upkeep with routine preventive audits for commercial facilities.",
        href: "/engineering#amc",
        icon: "HardHat",
      },
    ],
  },
};

export function isDivisionId(value: string | null | undefined): value is DivisionId {
  return value === "elevators" || value === "smart-systems" || value === "engineering";
}

export function pathToDivision(pathname: string): DivisionId | null {
  if (pathname === "/elevators" || pathname.startsWith("/elevators/")) return "elevators";
  if (
    pathname === "/smart-systems" ||
    pathname.startsWith("/smart-systems/") ||
    pathname === "/cctv-smart-systems"
  ) {
    return "smart-systems";
  }
  if (
    pathname === "/engineering" ||
    pathname.startsWith("/engineering/") ||
    pathname === "/maintenance" ||
    pathname.startsWith("/maintenance/")
  ) {
    return "engineering";
  }
  return null;
}
