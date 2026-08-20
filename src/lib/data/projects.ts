export type ProjectCategory =
  | "Commercial"
  | "Hotels"
  | "Shopping Malls"
  | "Government";

export type Project = {
  slug: string;
  title: string;
  location: string;
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
