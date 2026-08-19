import type { Metadata } from "next";
import { DivisionsContent } from "./divisions-content";

export const metadata: Metadata = {
  title: "Divisions",
  description:
    "Tasheel Engineering divisions — Elevators & Escalators and CCTV & Smart Home systems across Oman and the GCC.",
};

export default function DivisionsPage() {
  return <DivisionsContent />;
}
