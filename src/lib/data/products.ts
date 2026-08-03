export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  capacity: string;
  speed: string;
  features: string[];
  safety: string[];
  energySaving: string[];
  image: string;
  brochure: string;
};

export const products: Product[] = [
  {
    slug: "passenger-elevators",
    name: "Passenger Elevators",
    category: "Elevators",
    tagline: "Quiet precision for high-traffic buildings",
    description:
      "Engineered for commercial towers, hotels, and residential complexes. Smooth travel, refined cabin finishes, and intelligent destination control.",
    capacity: "450–2500 kg",
    speed: "1.0–6.0 m/s",
    features: [
      "Destination dispatch systems",
      "Premium cabin interiors",
      "Low-noise gearless machines",
      "Touchless call options",
      "IoT monitoring ready",
    ],
    safety: [
      "EN 81-20/50 compliant",
      "Multi-level door protection",
      "Automatic rescue device",
      "Overload detection",
    ],
    energySaving: [
      "Regenerative drives",
      "LED cabin lighting",
      "Sleep-mode controllers",
      "Efficient gearless motors",
    ],
    image: "/images/products/passenger.jpg",
    brochure: "/brochures/passenger-elevators.pdf",
  },
  {
    slug: "hospital-elevators",
    name: "Hospital Elevators",
    category: "Elevators",
    tagline: "Mission-critical vertical transport",
    description:
      "Bed elevators and stretcher-ready systems designed for hospitals and clinics—hygienic materials, precise leveling, and priority emergency modes.",
    capacity: "1600–2500 kg",
    speed: "0.5–2.5 m/s",
    features: [
      "Stretcher and bed compatible",
      "Antibacterial finishes",
      "Priority emergency recall",
      "Precise floor leveling",
      "Wide door openings",
    ],
    safety: [
      "Hospital code compliance",
      "Fire service mode",
      "Battery-backed rescue",
      "Redundant safety circuits",
    ],
    energySaving: [
      "Variable frequency drives",
      "Standby power optimization",
      "Efficient LED systems",
    ],
    image: "/images/products/hospital.jpg",
    brochure: "/brochures/hospital-elevators.pdf",
  },
  {
    slug: "freight-elevators",
    name: "Freight Elevators",
    category: "Elevators",
    tagline: "Industrial strength, controlled delivery",
    description:
      "Heavy-duty goods elevators for warehouses, malls, and industrial facilities with reinforced platforms and rugged door systems.",
    capacity: "1000–5000 kg",
    speed: "0.25–1.0 m/s",
    features: [
      "Reinforced car floors",
      "Heavy-duty doors",
      "Forklift loading ready",
      "Robust control systems",
      "Custom platform sizes",
    ],
    safety: [
      "Overload protection",
      "Door interlocking",
      "Buffer systems",
      "Emergency stop circuits",
    ],
    energySaving: [
      "Efficient VF drives",
      "Idle-power reduction",
    ],
    image: "/images/products/freight.jpg",
    brochure: "/brochures/freight-elevators.pdf",
  },
  {
    slug: "home-elevators",
    name: "Home Elevators",
    category: "Elevators",
    tagline: "Private luxury for villas and residences",
    description:
      "Compact, elegant residential elevators tailored for Omani villas and luxury homes—quiet operation with bespoke cabin design.",
    capacity: "250–450 kg",
    speed: "0.15–0.4 m/s",
    features: [
      "Minimal shaft requirements",
      "Custom cabin finishes",
      "Quiet hydraulic or traction",
      "Smart home integration",
      "Compact machine rooms",
    ],
    safety: [
      "EN 81-41 options",
      "Door sensors",
      "Emergency lowering",
      "Battery backup",
    ],
    energySaving: [
      "Low standby consumption",
      "Efficient drive units",
    ],
    image: "/images/products/home.jpg",
    brochure: "/brochures/home-elevators.pdf",
  },
  {
    slug: "panoramic-elevators",
    name: "Panoramic Elevators",
    category: "Elevators",
    tagline: "Architecture as experience",
    description:
      "Glass panoramic elevators that become a design centerpiece for atriums, hotels, and landmark buildings.",
    capacity: "630–1600 kg",
    speed: "1.0–2.5 m/s",
    features: [
      "Structural glass cabins",
      "Architectural lighting",
      "Custom frames and finishes",
      "Observation-ready design",
      "Silent travel experience",
    ],
    safety: [
      "Laminated safety glass",
      "EN 81 compliance",
      "Automatic rescue",
      "Weather-rated options",
    ],
    energySaving: [
      "LED accent lighting",
      "Regenerative drives",
    ],
    image: "/images/products/panoramic.jpg",
    brochure: "/brochures/panoramic-elevators.pdf",
  },
  {
    slug: "mrl-elevators",
    name: "MRL Elevators",
    category: "Elevators",
    tagline: "Machine-room-less efficiency",
    description:
      "Space-saving MRL systems ideal for mid-rise buildings where every square meter matters—without compromising performance.",
    capacity: "450–1600 kg",
    speed: "1.0–2.5 m/s",
    features: [
      "No machine room required",
      "Compact gearless machines",
      "Flexible shaft layouts",
      "Faster installation",
      "Reduced building cost",
    ],
    safety: [
      "Shaft-mounted safety gear",
      "EN 81-20/50",
      "Remote monitoring ready",
    ],
    energySaving: [
      "Permanent magnet motors",
      "Sleep modes",
      "LED lighting",
    ],
    image: "/images/products/mrl.jpg",
    brochure: "/brochures/mrl-elevators.pdf",
  },
  {
    slug: "escalators",
    name: "Escalators",
    category: "People Moving",
    tagline: "Continuous flow for public spaces",
    description:
      "Heavy-duty escalators for malls, airports, and transit hubs—engineered for Oman’s climate and high passenger volumes.",
    capacity: "4500–9000 pph",
    speed: "0.5 m/s",
    features: [
      "Indoor and outdoor options",
      "Energy-saving modes",
      "Anti-corrosion treatments",
      "LED skirt lighting",
      "Modular maintenance access",
    ],
    safety: [
      "Comb plate sensors",
      "Emergency stop buttons",
      "Skirt brushes",
      "EN 115 compliant",
    ],
    energySaving: [
      "Auto slow/stop modes",
      "Efficient VF drives",
      "LED illumination",
    ],
    image: "/images/products/escalators.jpg",
    brochure: "/brochures/escalators.pdf",
  },
  {
    slug: "moving-walkways",
    name: "Moving Walkways",
    category: "People Moving",
    tagline: "Effortless horizontal mobility",
    description:
      "Inclined and horizontal moving walkways for airports, malls, and exhibition centers—smooth, quiet, and durable.",
    capacity: "4500–7000 pph",
    speed: "0.5–0.65 m/s",
    features: [
      "Horizontal and inclined",
      "Pallet or belt systems",
      "Weather protection options",
      "Quiet operation",
      "Custom lengths",
    ],
    safety: [
      "EN 115 compliance",
      "Emergency stops",
      "Comb sensors",
      "Handrail monitoring",
    ],
    energySaving: [
      "Passenger-sensing modes",
      "Efficient motors",
    ],
    image: "/images/products/walkways.jpg",
    brochure: "/brochures/moving-walkways.pdf",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
