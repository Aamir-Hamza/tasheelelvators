import type { Metadata } from "next";
import { DivisionPortalPage } from "@/components/divisions/DivisionPortalPage";

export const metadata: Metadata = {
  title: "Engineering Portal",
  description:
    "Tasheel Engineering — architectural and MEP design plus technical and facilities maintenance across Oman and the GCC.",
};

export default function EngineeringPortalRoute() {
  return <DivisionPortalPage id="maintenance" />;
}
