import type { Metadata } from "next";
import { DivisionPortalPage } from "@/components/divisions/DivisionPortalPage";

export const metadata: Metadata = {
  title: "Smart Systems Portal",
  description:
    "Tasheel Smart Systems — enterprise CCTV, access control, smart automation, and AI monitoring across Oman and the GCC.",
};

export default function SmartSystemsPortalRoute() {
  return <DivisionPortalPage id="cctv" />;
}
