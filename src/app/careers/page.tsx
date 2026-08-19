import type { Metadata } from "next";
import { CareersContent } from "./careers-content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Tasheel Elevators—field engineers, service technicians, project coordinators, and technical sales roles in Oman.",
};

export default function CareersPage() {
  return <CareersContent />;
}
