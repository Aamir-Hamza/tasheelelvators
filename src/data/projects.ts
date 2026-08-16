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
    slug: "oasis-city-mall-security",
    title: "Oasis City Mall Security Grid",
    location: "Muscat, Oman",
    category: "Smart Home/CCTV",
    year: "2024",
    summary: "Enterprise CCTV, AI analytics, and centralized monitoring for a major retail destination.",
    division: "cctv-smart-home",
    image: "/cctv/hikvision-camera.png",
  },
  {
    slug: "al-bustan-smart-villas",
    title: "Al Bustan Smart Villas",
    location: "Muscat, Oman",
    category: "Smart Home/CCTV",
    year: "2023",
    summary: "Integrated smart lighting, climate, access control, and residential CCTV for a luxury villa compound.",
    division: "cctv-smart-home",
    image: "/cctv/orvibo-smart-lock.png",
  },
  {
    slug: "ministry-mep-design",
    title: "Government Ministry MEP Design",
    location: "Muscat, Oman",
    category: "Engineering Design",
    year: "2021",
    summary: "Multi-discipline engineering design packages and authority documentation for a government campus.",
    division: "engineering",
    image: "/projects/ministry-mep-design.png",
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
