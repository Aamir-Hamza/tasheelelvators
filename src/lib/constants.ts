export const SITE = {
  name: "Tasheel Elevators",
  legalName: "Tasheel Elevators LLC",
  tagline: "Engineering Vertical Excellence",
  description:
    "Premium elevator manufacturing, installation, and maintenance across Oman and the GCC. Safety, innovation, and reliability for every vertical journey.",
  url: "https://tasheelelevators.com",
  email: "info@tasheelelevators.com",
  phone: "+968 24XX XXXX",
  whatsapp: "+9689XXXXXXX",
  emergency: "+968 9XXX XXXX",
  address: {
    line1: "Al Khuwair, Muscat",
    line2: "Sultanate of Oman",
    full: "Al Khuwair, Muscat, Sultanate of Oman",
  },
  hours: "Sunday – Thursday, 8:00 AM – 6:00 PM",
  social: {
    linkedin: "https://linkedin.com/company/tasheel-elevators",
    instagram: "https://instagram.com/tasheelelevators",
    facebook: "https://facebook.com/tasheelelevators",
    youtube: "https://youtube.com/@tasheelelevators",
  },
  stats: [
    { label: "Projects Completed", value: 850, suffix: "+" },
    { label: "Years Experience", value: 18, suffix: "+" },
    { label: "Clients Served", value: 420, suffix: "+" },
    { label: "Cities Across GCC", value: 24, suffix: "" },
  ],
} as const;

export const NAV_LINKS = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Passenger Elevators", href: "/products/passenger-elevators" },
      { label: "Hospital Elevators", href: "/products/hospital-elevators" },
      { label: "Freight Elevators", href: "/products/freight-elevators" },
      { label: "Home Elevators", href: "/products/home-elevators" },
      { label: "Panoramic Elevators", href: "/products/panoramic-elevators" },
      { label: "MRL Elevators", href: "/products/mrl-elevators" },
      { label: "Escalators", href: "/products/escalators" },
      { label: "Moving Walkways", href: "/products/moving-walkways" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Installation", href: "/services/installation" },
      { label: "Maintenance & AMC", href: "/services/maintenance" },
      { label: "Modernization", href: "/services/modernization" },
      { label: "Emergency Repairs", href: "/services/emergency" },
      { label: "Consultation", href: "/services/consultation" },
    ],
  },
  { label: "Projects", href: "/projects", children: undefined },
  { label: "About", href: "/about", children: undefined },
  { label: "Safety", href: "/safety", children: undefined },
  { label: "Blog", href: "/blog", children: undefined },
  { label: "Careers", href: "/careers", children: undefined },
  { label: "Contact", href: "/contact", children: undefined },
] as const;
