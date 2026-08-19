import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About Tasheel",
  description:
    "About Tasheel Engineering — specialized engineering design, comprehensive maintenance, and divisions in elevators and CCTV & smart home across Oman and the GCC.",
};

export default function AboutPage() {
  return <AboutContent />;
}
