import type { Metadata } from "next";
import { ServicesContent } from "./services-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tasheel Engineering services — engineering design & consulting, comprehensive maintenance, systems auditing, and emergency response across Oman and the GCC.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
