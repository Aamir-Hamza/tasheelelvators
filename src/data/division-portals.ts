import type { HeroSlideId } from "@/data/hero-slides";

export type PortalSolution = {
  title: string;
  description: string;
  image?: string;
  videoId?: string;
};

export type PortalAmcPlan = {
  name: string;
  summary: string;
  features: string[];
};

export type PortalProject = {
  title: string;
  location: string;
  summary: string;
};

export type DivisionPortal = {
  id: HeroSlideId;
  route: string;
  title: string;
  eyebrow: string;
  description: string;
  heroStats: { value: string; label: string }[];
  solutions: PortalSolution[];
  projects: PortalProject[];
  amcPlans: PortalAmcPlan[];
  contactBlurb: string;
  quoteHref: string;
  accentClass: string;
  accentBtnClass: string;
};

export const DIVISION_PORTALS: Record<HeroSlideId, DivisionPortal> = {
  elevators: {
    id: "elevators",
    route: "/elevators",
    title: "Tasheel Elevators & Escalators",
    eyebrow: "Vertical Transportation Portal",
    description:
      "End-to-end elevator and escalator solutions — from shaft survey and installation to modernization and lifelong AMC across Oman & the GCC.",
    heroStats: [
      { value: "850+", label: "Projects Delivered" },
      { value: "EN81", label: "European Compliance" },
      { value: "99.8%", label: "System Uptime" },
    ],
    solutions: [
      {
        title: "Puzzle Parking System",
        description:
          "Car parking lift with lift-and-slide platforms — park more cars on the same land footprint.",
        image: "/elevators/puzzle-parking.jpg",
        videoId: "UY_fYHGjuoA",
      },
      {
        title: "Escalator Walking",
        description: "Passenger escalators and moving walks for malls, transit hubs, and high-traffic buildings.",
        image: "/elevators/escalator-walking.jpg",
      },
      {
        title: "Platform Lift / Home Lift",
        description: "Compact villa and residence lifts engineered for tight shafts, quiet travel, and premium cabins.",
        image: "/elevators/platform-home-lift.jpg",
      },
      {
        title: "Stair Lift",
        description: "Rail-mounted stair lifts for homes and institutions — safe, discreet accessibility on existing stairs.",
        image: "/elevators/stair-lift.jpg",
      },
      {
        title: "Cargo Lift Supplier",
        description: "Heavy-duty freight and goods lifts for warehouses, hospitals, and commercial loading bays.",
        image: "/elevators/cargo-lift.jpg",
      },
    ],
    projects: [
      {
        title: "Muscat Commercial Tower",
        location: "Muscat, Oman",
        summary: "Multi-bank passenger elevators with destination control and AMC handover.",
      },
      {
        title: "Hospital Vertical Mobility Suite",
        location: "Al Khoudh, Oman",
        summary: "Stretcher lifts, bed elevators, and EN81-compliant safety upgrades.",
      },
      {
        title: "Mall Escalator Network",
        location: "Sohar, Oman",
        summary: "High-capacity escalators with outdoor-rated weather protection.",
      },
    ],
    amcPlans: [
      {
        name: "Essential AMC",
        summary: "Scheduled preventive visits and priority parts sourcing.",
        features: ["Quarterly inspections", "Safety checklist", "Business-hours response"],
      },
      {
        name: "Performance AMC",
        summary: "Predictive monitoring with faster SLA for commercial assets.",
        features: ["Bi-monthly visits", "Remote diagnostics", "8-hour response SLA"],
      },
      {
        name: "Mission-Critical AMC",
        summary: "24/7 coverage for hospitals, towers, and high-traffic sites.",
        features: ["24/7 dispatch", "<15 min urban response", "Dedicated account engineer"],
      },
    ],
    contactBlurb:
      "Speak with our vertical transportation specialists for surveys, proposals, and emergency support.",
    quoteHref: "/quote?service=elevators",
    accentClass: "text-slate-800",
    accentBtnClass: "bg-slate-900 hover:bg-slate-800",
  },
  cctv: {
    id: "cctv",
    route: "/smart-systems",
    title: "Tasheel Smart Systems",
    eyebrow: "CCTV & Security Portal",
    description:
      "Enterprise surveillance, biometric access, smart automation, and AI monitoring — engineered for commercial and residential environments.",
    heroStats: [
      { value: "1,200+", label: "Systems Installed" },
      { value: "24/7", label: "Live Monitoring" },
      { value: "IP67", label: "Enterprise Grade" },
    ],
    solutions: [
      {
        title: "IP Cameras & NVRs",
        description: "Dome, bullet, and multi-sensor arrays with enterprise storage design.",
      },
      {
        title: "AI Video Analytics",
        description: "Intrusion, loitering, line-crossing, and people-counting workflows.",
      },
      {
        title: "Biometric Access Control",
        description: "Door controllers, readers, and integrated alarm workflows.",
      },
      {
        title: "Smart Home Automation",
        description: "Lighting, climate, and scene control for villas and premium residences.",
      },
      {
        title: "Network & IoT Backbone",
        description: "Secure connectivity for cameras, sensors, and building systems.",
      },
      {
        title: "Central Monitoring Setup",
        description: "Command dashboards, alerting, and remote operations enablement.",
      },
    ],
    projects: [
      {
        title: "Corporate Campus Security Grid",
        location: "Muscat, Oman",
        summary: "Multi-building CCTV with AI analytics and centralized NVR architecture.",
      },
      {
        title: "Smart Villa Automation",
        location: "Qurum, Oman",
        summary: "Access control, CCTV, and scene-based lighting/climate integration.",
      },
      {
        title: "Retail Perimeter Protection",
        location: "Salalah, Oman",
        summary: "IP67 outdoor cameras with intrusion analytics and night coverage.",
      },
    ],
    amcPlans: [
      {
        name: "Surveillance Care",
        summary: "Camera health checks, firmware, and storage hygiene.",
        features: ["Quarterly audits", "Lens & housing care", "Backup verification"],
      },
      {
        name: "Security Operations AMC",
        summary: "Full CCTV + access stack with incident support.",
        features: ["Monthly reviews", "Access audit logs", "Priority on-site repair"],
      },
      {
        name: "Always-On Monitoring AMC",
        summary: "Continuous supervision for critical facilities.",
        features: ["24/7 monitoring desk", "Alert escalation", "Spare camera pool"],
      },
    ],
    contactBlurb:
      "Connect with our Smart Systems team for audits, designs, and rapid security deployments.",
    quoteHref: "/quote?service=security-audit",
    accentClass: "text-cyan-700",
    accentBtnClass: "bg-cyan-600 hover:bg-cyan-500",
  },
  maintenance: {
    id: "maintenance",
    route: "/engineering",
    title: "Tasheel Engineering",
    eyebrow: "Design & Facilities Portal",
    description:
      "Architectural and MEP design plus reliable technical and facilities maintenance — engineered for uptime, compliance, and accountable delivery.",
    heroStats: [
      { value: "320+", label: "Active AMC Contracts" },
      { value: "<15 min", label: "Emergency Response" },
      { value: "100%", label: "Certified Engineers" },
    ],
    solutions: [
      {
        title: "Elevator & Escalator AMC",
        description: "Preventive programmes with rescue readiness and spare-parts planning.",
      },
      {
        title: "CCTV & Security Care",
        description: "Camera, NVR, and access-system health with firmware governance.",
      },
      {
        title: "Electro-Mechanical AMC",
        description: "MEP asset care for pumps, panels, and building technical systems.",
      },
      {
        title: "Predictive Diagnostics",
        description: "Sensor-led insights that catch failures before downtime hits.",
      },
      {
        title: "Emergency Dispatch",
        description: "24/7 response network for trapped-passenger and critical faults.",
      },
      {
        title: "Compliance Reporting",
        description: "Inspection logs and audit-ready documentation for facility teams.",
      },
    ],
    projects: [
      {
        title: "Multi-Tower AMC Programme",
        location: "Muscat, Oman",
        summary: "Unified elevator maintenance across a mixed-use portfolio.",
      },
      {
        title: "Industrial Plant Reliability",
        location: "Rusayl, Oman",
        summary: "Electro-mechanical AMC with predictive sensor checkpoints.",
      },
      {
        title: "Hospital Critical Response",
        location: "Muscat, Oman",
        summary: "Mission-critical SLA covering lifts and security infrastructure.",
      },
    ],
    amcPlans: [
      {
        name: "Facility Essentials",
        summary: "Core preventive coverage for standard commercial assets.",
        features: ["Scheduled visits", "Parts advisory", "Business-hours hotline"],
      },
      {
        name: "Uptime Plus",
        summary: "Faster SLA with diagnostics for elevators and security stacks.",
        features: ["Priority dispatch", "Monthly reports", "Loaner equipment options"],
      },
      {
        name: "Zero-Downtime Shield",
        summary: "Highest-tier coverage for hospitals and critical infrastructure.",
        features: ["24/7 engineers", "<15 min urban ETA", "Dedicated account manager"],
      },
    ],
    contactBlurb:
      "Reach our dispatch desk for AMC enrolment, emergency response, or multi-site facility programmes.",
    quoteHref: "/quote?service=maintenance",
    accentClass: "text-orange-700",
    accentBtnClass: "bg-orange-600 hover:bg-orange-500",
  },
};
