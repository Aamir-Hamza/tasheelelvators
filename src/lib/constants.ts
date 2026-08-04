export const SITE = {
  name: "Tasheel Elevators",
  legalName: "Tasheel Elevators LLC",
  crNumber: "1565950",
  tagline: "Engineering Vertical Excellence",
  description:
    "Premium elevator manufacturing, installation, and maintenance across Oman and the GCC. Safety, innovation, and reliability for every vertical journey.",
  url: "https://tasheelelevators.com",
  email: "info@tasheelelevators.com",
  salesEmail: "sale@tasheelelevators.com",
  phone: "+968 79123229",
  phoneAlt: "+968 95595521",
  whatsapp: "+968 79123229",
  emergency: "+968 79123229",
  /** Digits-only for tel: and WhatsApp links */
  phoneHref: "tel:+96879123229",
  phoneAltHref: "tel:+96895595521",
  whatsappNumber: "96879123229",
  whatsappHref:
    "https://api.whatsapp.com/send?phone=96879123229&text=Hello%21%20I%20am%20inquiring%20about%20elevator%20installation%20and%20maintenance%20services.",
  emergencyHref: "tel:+96879123229",
  address: {
    line1: "Office No. 13, First Floor",
    line2: "Al-Khoudh, As Salam Street, Oman Oil",
    city: "Muscat",
    country: "Sultanate of Oman",
    poBox: "122",
    postalCode: "121",
    full: "Office No. 13, First Floor, Al-Khoudh, As Salam Street, Oman Oil, Muscat, Sultanate of Oman",
    short: "Al-Khoudh, As Salam Street, Muscat, Oman",
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
