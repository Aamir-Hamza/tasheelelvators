import type { DivisionId } from "@/config/brandsData";

export type ProjectCategory =
  | "Commercial"
  | "Hotels"
  | "Shopping Malls"
  | "Government";

export type Project = {
  slug: string;
  title: string;
  location: string;
  division: DivisionId;
  categories: ProjectCategory[];
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  products: string[];
  image: string;
  categoryImages?: Partial<Record<ProjectCategory, string>>;
};

export const projects: Project[] = [
  {
    slug: "al-maabilah-project",
    title: "Al Maabilah Project",
    location: "Al Maabilah, Muscat, Oman",
    division: "elevators",
    categories: ["Commercial", "Hotels"],
    year: "2024",
    summary:
      "Passenger and service elevators for a commercial development in Al Maabilah, with destination control and ongoing AMC coverage.",
    challenge:
      "High occupancy traffic across mixed office and retail floors, with a tight handover window for phased occupancy.",
    solution:
      "Installed gearless passenger lifts and a dedicated service elevator, with destination dispatch and IoT monitoring for commercial peak loads.",
    results: [
      "On-schedule phased handover",
      "Reduced peak wait times across office floors",
      "Full AMC onboarded at commissioning",
    ],
    products: ["Passenger Elevators", "Freight Elevators"],
    image: "/projects/al-maabilah.jpg",
    categoryImages: {
      Commercial: "/projects/al-maabilah.jpg",
      Hotels: "/projects/al-maabilah-hotel.jpg",
    },
  },
  {
    slug: "women-wallets",
    title: "Women Wallets",
    location: "Muscat, Oman",
    division: "elevators",
    categories: ["Shopping Malls"],
    year: "2024",
    summary:
      "Public elevators, escalators, and moving walkways for the Women Wallets retail destination.",
    challenge:
      "Peak weekend shopper traffic required high-capacity vertical mobility without interrupting retail operations.",
    solution:
      "Installed heavy-duty mall escalators, moving walkways, and public passenger elevators with energy-saving modes.",
    results: [
      "Smooth peak-hour passenger flow",
      "Energy-saving modes active",
      "Predictive maintenance enabled",
    ],
    products: ["Escalators", "Moving Walkways", "Passenger Elevators"],
    image: "/projects/women-wallets.jpg",
  },
  {
    slug: "university-of-technology",
    title: "University of Technology",
    location: "Muscat, Oman",
    division: "elevators",
    categories: ["Government"],
    year: "2021",
    summary:
      "Passenger and freight elevators with access-controlled academic floors for the University of Technology campus.",
    challenge:
      "High student traffic between lecture blocks, plus secure access for labs and administration.",
    solution:
      "Installed gearless passenger lifts and a dedicated service elevator with access-integrated controllers and a certified maintenance program.",
    results: [
      "Reliable peak-hour student circulation",
      "Secure floor access for labs and admin",
      "99.8% uptime SLA",
    ],
    products: ["Passenger Elevators", "Freight Elevators"],
    image: "/projects/university-of-technology.jpg",
  },
  {
    slug: "the-village-muscat-al-hail",
    title: "The Village Muscat Al-Hail",
    location: "Al Hail, Muscat, Oman",
    division: "smart-systems",
    categories: ["Commercial"],
    year: "2024",
    summary:
      "CCTV, access control, and site monitoring for The Village Muscat Al-Hail.",
    challenge:
      "Mixed-use pedestrian streets needed discreet cameras with wide night coverage.",
    solution:
      "Deployed AI IP cameras, door controllers, and centralized NVR recording across the village.",
    results: ["Full perimeter coverage", "Centralized live monitoring", "AMC handover complete"],
    products: ["AI IP Cameras", "NVR Storage", "Access Control"],
    image: "/projects/the-village-al-hail.png",
  },
  {
    slug: "ncsi-new-building-muscat-gala",
    title: "Nationality Center for Statistic & Information (New Building Muscat Gala)",
    location: "Gala, Muscat, Oman",
    division: "smart-systems",
    categories: ["Government"],
    year: "2024",
    summary:
      "Enterprise CCTV and access control for the new NCSI building in Muscat Gala.",
    challenge:
      "A government campus required secure floor access and audit-ready video retention.",
    solution:
      "Installed 4K cameras, biometric readers, and redundant NVR storage with monitored health alerts.",
    results: ["Secure visitor logging", "Redundant recording", "Authority-ready documentation"],
    products: ["AI IP Cameras", "Biometric Access", "NVR Storage"],
    image: "/projects/ncsi-muscat-gala.png",
  },
  {
    slug: "onei-muscat-al-misfah",
    title: "Oman National Engineering & Investment Muscat Al Misfah",
    location: "Al Misfah, Muscat, Oman",
    division: "smart-systems",
    categories: ["Commercial"],
    year: "2023",
    summary:
      "Industrial CCTV and compound security for Oman National Engineering & Investment in Al Misfah.",
    challenge:
      "Warehouses and offices needed long-range cameras and controlled vehicle gates.",
    solution:
      "Specified bullet cameras, gate intercoms, and a site-wide NVR with remote monitoring.",
    results: ["Yard and gate coverage", "Remote live view", "Preventive camera AMC"],
    products: ["Bullet IP Cameras", "Video Intercom", "NVR Storage"],
    image: "/projects/onei-al-misfah.png",
  },
  {
    slug: "commercial-building",
    title: "Commercial Building",
    location: "Muscat, Oman",
    division: "smart-systems",
    categories: ["Commercial"],
    year: "2023",
    summary:
      "CCTV, lobby access, and parking surveillance for a commercial building in Muscat.",
    challenge:
      "Multi-tenant floors required shared cameras with private access zones.",
    solution:
      "Installed lobby and parking cameras with RFID/biometric doors and centralized recording.",
    results: ["Lobby and car-park coverage", "Tenant access zones", "Central NVR"],
    products: ["AI IP Cameras", "Access Control", "NVR Storage"],
    image: "/projects/commercial-building-cctv.png",
  },
  {
    slug: "an-khansa-bhotec",
    title: "An Khansa Bhotec",
    location: "Muscat, Oman",
    division: "smart-systems",
    categories: ["Commercial"],
    year: "2023",
    summary:
      "Discreet CCTV and access control for An Khansa Bhotec.",
    challenge:
      "A sensitive facility needed coverage without disrupting clinical or lab operations.",
    solution:
      "Placed compact cameras and access readers with a quiet NVR room and monitored alerts.",
    results: ["Discreet camera layout", "Controlled staff access", "Continuous recording"],
    products: ["IP Cameras", "Access Control", "NVR Storage"],
    image: "/projects/an-khansa-bhotec.png",
  },
  {
    slug: "wc-onic-al-khuwair",
    title: "WC ONIC Al Khuwair",
    location: "Al Khuwair, Muscat, Oman",
    division: "engineering",
    categories: ["Commercial"],
    year: "2024",
    summary:
      "MEP design, BIM coordination, and authority documentation for WC ONIC Al Khuwair.",
    challenge:
      "A live commercial floor plate needed coordinated HVAC, power, and drainage without disrupting occupancy.",
    solution:
      "Delivered clash-detected BIM, staged MEP layouts, and on-site supervision through handover.",
    results: ["Clash-free BIM package", "Authority submission complete", "Phased site supervision"],
    products: ["3D CAD & BIM", "MEP Layouts", "Site Supervision"],
    image: "/projects/wc-onic-al-khuwair.png",
  },
  {
    slug: "document-archive-onic-al-misfah",
    title: "Document Archive System in Building ONIC Al Misfah",
    location: "Al Misfah, Muscat, Oman",
    division: "engineering",
    categories: ["Commercial"],
    year: "2024",
    summary:
      "Archive-room engineering, environmental control, and fit-out coordination for the ONIC Al Misfah document archive system.",
    challenge:
      "Records storage required climate control, fire-safe routing, and compact shelving within an existing building.",
    solution:
      "Designed MEP for archive conditions, fire and power layouts, and construction drawings for the records suite.",
    results: ["Climate-controlled archive", "Code-compliant fire and power", "As-built documentation"],
    products: ["MEP Layouts", "3D CAD & BIM", "Supervision & Certification"],
    image: "/projects/document-archive-onic-misfah.png",
  },
  {
    slug: "university-of-sargia",
    title: "University of Sargia",
    location: "Oman",
    division: "engineering",
    categories: ["Government"],
    year: "2023",
    summary:
      "Architectural and MEP design packages for the University of Sargia campus.",
    challenge:
      "Academic buildings needed coordinated cores, lecture-hall loads, and authority-ready drawings.",
    solution:
      "Produced BIM models, structural/MEP coordination, and certified design documentation for campus works.",
    results: ["Campus BIM coordination", "Authority-ready packs", "On-site design support"],
    products: ["3D CAD & BIM", "Structural Analysis", "MEP Layouts"],
    image: "/projects/university-of-sargia.png",
  },
];

export const projectCategories = [
  "All",
  "Commercial",
  "Hotels",
  "Shopping Malls",
  "Government",
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectCover(
  project: Project,
  category?: (typeof projectCategories)[number]
) {
  if (category && category !== "All") {
    return project.categoryImages?.[category] ?? project.image;
  }
  return project.image;
}
