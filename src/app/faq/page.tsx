import type { Metadata } from "next";
import { FaqContent } from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Tasheel Elevators products, AMC, installation timelines, and safety standards in Oman and the GCC.",
};

export default function FaqPage() {
  return <FaqContent />;
}
