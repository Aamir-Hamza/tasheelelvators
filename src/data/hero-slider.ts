/**
 * Homepage hero slider slides.
 * Update `src` anytime you rename files in `/public/slider/`.
 *
 * Elevator / Escalator art lives in `/public/elevator_ecsalator/`
 * and is used in the Projects gallery (not the banner).
 */
export type HeroSliderSlide = {
  id: string;
  src: string;
  alt: string;
  /** Optional HTML overlay copy (used when showHtmlCopy is enabled) */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  href?: string;
};

export const HERO_SLIDER_AUTOPLAY_MS = 6000;

/** Banner keeps exactly 3 slides */
export const HERO_SLIDER_SLIDES: HeroSliderSlide[] = [
  {
    id: "elevators",
    src: "/slider/slide1.png",
    alt: "Tasheel Elevators — vertical transportation banner",
    eyebrow: "Vertical Transportation",
    title: "Elevators & Escalators",
    subtitle: "Precision mobility systems engineered for Oman & the GCC.",
    cta: { label: "Explore Elevator Portal", href: "/elevators" },
    secondaryCta: { label: "Request Quote", href: "/quote?service=elevators" },
    href: "/elevators",
  },
  {
    id: "cctv",
    src: "/slider/slide2.png",
    alt: "Tasheel Smart Systems — CCTV & security systems banner",
    eyebrow: "CCTV & Security",
    title: "Smart Security Systems",
    subtitle: "Enterprise surveillance and intelligent monitoring.",
    cta: { label: "Explore Smart Systems", href: "/smart-systems" },
    secondaryCta: { label: "Security Audit", href: "/quote?service=security-audit" },
    href: "/smart-systems",
  },
  {
    id: "maintenance",
    src: "/slider/slide3.png",
    alt: "Tasheel Engineering — design and facilities banner",
    eyebrow: "Design & Facilities",
    title: "Engineering & Maintenance",
    subtitle: "Architectural, MEP design, and reliable technical maintenance.",
    cta: { label: "Explore Engineering", href: "/engineering" },
    secondaryCta: { label: "Schedule Visit", href: "/quote?service=maintenance" },
    href: "/engineering",
  },
];
