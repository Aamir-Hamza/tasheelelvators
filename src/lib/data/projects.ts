export type Project = {
  slug: string;
  title: string;
  location: string;
  category: "Commercial" | "Residential" | "Hotels" | "Hospitals" | "Shopping Malls" | "Government";
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  products: string[];
  image: string;
};

export const projects: Project[] = [
  {
    slug: "muscat-grand-tower",
    title: "Muscat Grand Tower",
    location: "Muscat, Oman",
    category: "Commercial",
    year: "2024",
    summary:
      "Twelve high-speed passenger elevators and two panoramic units for a landmark commercial tower on the Corniche.",
    challenge:
      "High traffic peaks and tight construction windows required destination control and phased handover.",
    solution:
      "Deployed gearless high-speed elevators with destination dispatch, regenerative drives, and IoT monitoring.",
    results: ["40% traffic wait reduction", "Phased handover on schedule", "Zero installation safety incidents"],
    products: ["Passenger Elevators", "Panoramic Elevators"],
    image: "/images/projects/muscat-grand.jpg",
  },
  {
    slug: "al-bustan-residences",
    title: "Al Bustan Residences",
    location: "Muscat, Oman",
    category: "Residential",
    year: "2023",
    summary:
      "MRL passenger elevators across a luxury residential complex with quiet ride and premium cabin finishes.",
    challenge:
      "Limited machine room space and noise-sensitive residential floors.",
    solution:
      "Machine-room-less gearless systems with acoustic isolation and custom villa-grade interiors.",
    results: ["Space savings of 12 m² per core", "Noise below residential limits", "Full AMC onboarded"],
    products: ["MRL Elevators"],
    image: "/images/projects/al-bustan.jpg",
  },
  {
    slug: "sahara-hotel-resort",
    title: "Sahara Hotel & Resort",
    location: "Salalah, Oman",
    category: "Hotels",
    year: "2023",
    summary:
      "Service elevators, guest elevators, and outdoor escalators for a five-star coastal resort.",
    challenge:
      "Coastal corrosion risk and continuous guest operations during installation.",
    solution:
      "Marine-grade finishes, night-shift installation windows, and redundant service lifts.",
    results: ["Corrosion-resistant specification", "No guest disruption", "Energy mode savings of 18%"],
    products: ["Passenger Elevators", "Freight Elevators", "Escalators"],
    image: "/images/projects/sahara-hotel.jpg",
  },
  {
    slug: "royal-care-hospital",
    title: "Royal Care Hospital",
    location: "Sohar, Oman",
    category: "Hospitals",
    year: "2022",
    summary:
      "Bed elevators and stretcher-ready systems with priority emergency modes for a multi-specialty hospital.",
    challenge:
      "Strict hygiene requirements and uninterrupted critical care mobility.",
    solution:
      "Hospital-code elevators with antibacterial finishes, precise leveling, and fire service modes.",
    results: ["EN hospital compliance", "Sub-second leveling accuracy", "24/7 AMC coverage"],
    products: ["Hospital Elevators"],
    image: "/images/projects/royal-care.jpg",
  },
  {
    slug: "oasis-city-mall",
    title: "Oasis City Mall",
    location: "Muscat, Oman",
    category: "Shopping Malls",
    year: "2024",
    summary:
      "Escalators, moving walkways, and public elevators for a major retail destination.",
    challenge:
      "Extreme peak passenger volumes on weekends and holidays.",
    solution:
      "Heavy-duty escalators with auto energy modes and synchronized vertical cores.",
    results: ["9000 pph capacity per bank", "Energy-saving modes active", "Predictive maintenance enabled"],
    products: ["Escalators", "Moving Walkways", "Passenger Elevators"],
    image: "/images/projects/oasis-mall.jpg",
  },
  {
    slug: "ministry-complex",
    title: "Government Ministry Complex",
    location: "Muscat, Oman",
    category: "Government",
    year: "2021",
    summary:
      "Secure passenger and freight elevators with access-controlled floors for a government campus.",
    challenge:
      "Security zoning and high reliability requirements.",
    solution:
      "Access-integrated controllers, redundant freight capacity, and certified maintenance program.",
    results: ["Secure floor access", "99.8% uptime SLA", "Audit-ready documentation"],
    products: ["Passenger Elevators", "Freight Elevators"],
    image: "/images/projects/ministry.jpg",
  },
];

export const projectCategories = [
  "All",
  "Commercial",
  "Residential",
  "Hotels",
  "Hospitals",
  "Shopping Malls",
  "Government",
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
