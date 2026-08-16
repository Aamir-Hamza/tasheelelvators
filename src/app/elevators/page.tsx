import type { Metadata } from "next";
import { DivisionPortalPage } from "@/components/divisions/DivisionPortalPage";

export const metadata: Metadata = {
  title: "Elevators & Escalators Portal",
  description:
    "Tasheel Elevators & Escalators — passenger, freight, hospital, panoramic elevators, escalators, modernization, and AMC across Oman and the GCC.",
};

export default function ElevatorsPortalRoute() {
  return <DivisionPortalPage id="elevators" />;
}
