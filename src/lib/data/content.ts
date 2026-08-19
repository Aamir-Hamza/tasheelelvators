export type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export const faqs: FAQ[] = [
  {
    category: "General",
    question: "What regions does Tasheel Elevators serve?",
    answer:
      "We primarily serve Oman, with expanding coverage across GCC countries including UAE, Saudi Arabia, Qatar, Bahrain, and Kuwait for major projects and AMC contracts.",
  },
  {
    category: "General",
    question: "Do you manufacture and install elevators?",
    answer:
      "Yes. We provide elevator manufacturing partnerships, supply, professional installation, modernization, and long-term maintenance under one accountable team.",
  },
  {
    category: "Products",
    question: "Which elevator type is right for my building?",
    answer:
      "It depends on traffic, building height, shaft constraints, and use case. Our consultants perform traffic analysis and recommend passenger, MRL, hospital, freight, or panoramic solutions accordingly.",
  },
  {
    category: "Products",
    question: "Can you customize cabin interiors?",
    answer:
      "Absolutely. We offer bespoke finishes including stainless steel, glass, stone, custom lighting, and branded control panels for hotels, residences, and landmark projects.",
  },
  {
    category: "Services",
    question: "What does an AMC include?",
    answer:
      "Annual Maintenance Contracts typically include scheduled inspections, lubrication, safety tests, genuine spare parts allowances, digital reports, and priority emergency response.",
  },
  {
    category: "Services",
    question: "How quickly can you respond to emergencies?",
    answer:
      "AMC clients receive priority 24/7 response. In Muscat, emergency teams typically mobilize within agreed SLA windows; GCC response depends on city coverage and contract terms.",
  },
  {
    category: "Safety",
    question: "Which standards do your elevators follow?",
    answer:
      "Our systems are designed and installed to align with EN 81-20/50, EN 115 for escalators, ISO quality practices, and local Civil Defence requirements in Oman and the GCC.",
  },
  {
    category: "Projects",
    question: "How long does a typical installation take?",
    answer:
      "Timelines vary by unit count and building readiness. A single mid-rise passenger elevator may take several weeks from shaft readiness to handover; complex projects are phased with your construction schedule.",
  },
  {
    category: "Pricing",
    question: "How do I get a project quote?",
    answer:
      "Use our Request Quote form or call our team. Share drawings, floors, capacity needs, and timeline—we’ll provide a detailed proposal with specifications and commercial options.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "elevator-maintenance-checklist-oman",
    title: "Elevator Maintenance Checklist for Building Owners in Oman",
    excerpt:
      "A practical monthly and annual checklist to keep elevators safe, compliant, and reliable in Gulf climates.",
    category: "Maintenance",
    date: "2025-11-12",
    readTime: "6 min",
    content: [
      "Regular maintenance is the difference between predictable uptime and costly downtime. In Oman’s heat and dust conditions, preventive care is non-negotiable.",
      "Inspect door operators, clean thresholds, verify leveling accuracy, test emergency lighting and alarms, and ensure machine rooms remain clean and ventilated.",
      "Partner with a certified AMC provider for documented inspections, genuine parts, and emergency readiness.",
    ],
  },
  {
    slug: "choosing-elevator-for-villa",
    title: "How to Choose a Home Elevator for Your Villa",
    excerpt:
      "Capacity, shaft space, finishes, and safety—what matters most when specifying a residential elevator.",
    category: "Buying Guide",
    date: "2025-10-03",
    readTime: "5 min",
    content: [
      "Home elevators transform accessibility and luxury living. Start with passenger capacity, available shaft or pit dimensions, and preferred drive technology.",
      "Prioritize quiet operation, battery-backed emergency lowering, and finishes that match your interior design language.",
      "Engage early with consultants so structural provisions are correct before finishing works begin.",
    ],
  },
  {
    slug: "mrl-vs-machine-room-elevators",
    title: "MRL vs Machine Room Elevators: Which Saves More?",
    excerpt:
      "Compare space, cost, and performance to decide between machine-room-less and traditional systems.",
    category: "Technology",
    date: "2025-09-18",
    readTime: "7 min",
    content: [
      "Machine-room-less elevators free valuable floor area and can reduce building cost—ideal for mid-rise commercial and residential projects.",
      "Traditional machine rooms still make sense for very high-speed or complex multi-car groups.",
      "The right choice depends on rise, speed targets, and long-term service access preferences.",
    ],
  },
  {
    slug: "elevator-safety-standards-gcc",
    title: "Elevator Safety Standards Every GCC Project Should Know",
    excerpt:
      "An overview of EN 81, EN 115, and local compliance expectations for developers and facility managers.",
    category: "Safety",
    date: "2025-08-22",
    readTime: "8 min",
    content: [
      "International standards such as EN 81-20/50 define modern elevator safety for passengers and technicians.",
      "Escalators and moving walks follow EN 115, with additional attention to outdoor and coastal installations.",
      "Always align specifications with Civil Defence and local authority requirements in your project jurisdiction.",
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const careers = [
  {
    id: "field-engineer",
    title: "Elevator Field Engineer",
    location: "Muscat, Oman",
    type: "Full-time",
    description: "Lead installations and commissioning for passenger and MRL elevators across Oman.",
  },
  {
    id: "service-technician",
    title: "Service Technician",
    location: "Muscat / Sohar",
    type: "Full-time",
    description: "Deliver preventive maintenance and emergency repairs under AMC contracts.",
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    location: "Muscat, Oman",
    type: "Full-time",
    description: "Coordinate site schedules, documentation, and client communication for active projects.",
  },
  {
    id: "sales-consultant",
    title: "Technical Sales Consultant",
    location: "Muscat, Oman",
    type: "Full-time",
    description: "Advise architects and developers on product selection and prepare technical proposals.",
  },
];
