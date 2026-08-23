export type ProjectCategory =
  | "All"
  | "Engineering Design"
  | "Maintenance"
  | "Elevators"
  | "Smart Home/CCTV";

export type EngineeringProject = {
  slug: string;
  title: string;
  location: string;
  category: Exclude<ProjectCategory, "All">;
  year: string;
  summary: string;
  division?: "elevators" | "cctv-smart-home" | "engineering";
  /** Optional cover image shown in the project card media div */
  image?: string;
};

export const engineeringProjects: EngineeringProject[] = [
  {
    slug: "muscat-grand-tower",
    title: "Muscat Grand Tower",
    location: "Muscat, Oman",
    category: "Elevators",
    year: "2024",
    summary: "High-speed passenger and panoramic elevators with destination dispatch for a landmark commercial tower.",
    division: "elevators",
    image: "/elevator_ecsalator/Gemini_Generated_Image_6wojo6wojo6wojo6.png",
  },
  {
    slug: "royal-care-hospital",
    title: "Royal Care Hospital",
    location: "Sohar, Oman",
    category: "Elevators",
    year: "2022",
    summary: "Hospital-code bed elevators with antibacterial finishes and emergency recall modes.",
    division: "elevators",
    image: "/elevator_ecsalator/Gemini_Generated_Image_ku77kdku77kdku77.png",
  },
  {
    slug: "the-village-muscat-al-hail",
    title: "The Village Muscat Al-Hail",
    location: "Al Hail, Muscat, Oman",
    category: "Smart Home/CCTV",
    year: "2024",
    summary: "CCTV, access control, and site monitoring for The Village Muscat Al-Hail.",
    division: "cctv-smart-home",
    image: "/projects/the-village-al-hail.png",
  },
  {
    slug: "ncsi-new-building-muscat-gala",
    title: "Nationality Center for Statistic & Information (New Building Muscat Gala)",
    location: "Gala, Muscat, Oman",
    category: "Smart Home/CCTV",
    year: "2024",
    summary: "Enterprise CCTV and access control for the new NCSI building in Muscat Gala.",
    division: "cctv-smart-home",
    image: "/projects/ncsi-muscat-gala.png",
  },
  {
    slug: "onei-muscat-al-misfah",
    title: "Oman National Engineering & Investment Muscat Al Misfah",
    location: "Al Misfah, Muscat, Oman",
    category: "Smart Home/CCTV",
    year: "2023",
    summary: "Industrial CCTV and compound security for Oman National Engineering & Investment in Al Misfah.",
    division: "cctv-smart-home",
    image: "/projects/onei-al-misfah.png",
  },
  {
    slug: "commercial-building",
    title: "Commercial Building",
    location: "Muscat, Oman",
    category: "Smart Home/CCTV",
    year: "2023",
    summary: "CCTV, lobby access, and parking surveillance for a commercial building in Muscat.",
    division: "cctv-smart-home",
    image: "/projects/commercial-building-cctv.png",
  },
  {
    slug: "an-khansa-bhotec",
    title: "An Khansa Bhotec",
    location: "Muscat, Oman",
    category: "Smart Home/CCTV",
    year: "2023",
    summary: "Discreet CCTV and access control for An Khansa Bhotec.",
    division: "cctv-smart-home",
    image: "/projects/an-khansa-bhotec.png",
  },
  {
    slug: "wc-onic-al-khuwair",
    title: "WC ONIC Al Khuwair",
    location: "Al Khuwair, Muscat, Oman",
    category: "Engineering Design",
    year: "2024",
    summary: "MEP design, BIM coordination, and authority documentation for WC ONIC Al Khuwair.",
    division: "engineering",
    image: "/projects/wc-onic-al-khuwair.png",
  },
  {
    slug: "document-archive-onic-al-misfah",
    title: "Document Archive System in Building ONIC Al Misfah",
    location: "Al Misfah, Muscat, Oman",
    category: "Engineering Design",
    year: "2024",
    summary: "Archive-room engineering and MEP fit-out for the ONIC Al Misfah document archive system.",
    division: "engineering",
    image: "/projects/document-archive-onic-misfah.png",
  },
  {
    slug: "university-of-sargia",
    title: "University of Sargia",
    location: "Oman",
    category: "Engineering Design",
    year: "2023",
    summary: "Architectural and MEP design packages for the University of Sargia campus.",
    division: "engineering",
    image: "/projects/university-of-sargia.png",
  },
  {
    slug: "sahara-hotel-amc",
    title: "Sahara Hotel AMC Programme",
    location: "Salalah, Oman",
    category: "Maintenance",
    year: "2023",
    summary: "Full-scope preventive maintenance for guest elevators, service lifts, and outdoor escalators.",
    division: "elevators",
    image: "/projects/sahara-hotel-amc.png",
  },
];

export const projectFilters: ProjectCategory[] = [
  "All",
  "Engineering Design",
  "Maintenance",
  "Elevators",
  "Smart Home/CCTV",
];
