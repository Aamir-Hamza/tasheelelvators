import type { Metadata } from "next";
import { DivisionPortalPage } from "@/components/divisions/DivisionPortalPage";

export const metadata: Metadata = {
  title: "Maintenance Services Portal",
  description:
    "Tasheel Maintenance Services — predictive AMC for elevators, security systems, and electro-mechanical infrastructure across Oman and the GCC.",
};

export default function MaintenancePortalRoute() {
  return <DivisionPortalPage id="maintenance" />;
}
