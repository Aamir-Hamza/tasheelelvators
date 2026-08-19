import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Tasheel Elevators in Muscat, Oman—sales, support, WhatsApp, and 24/7 emergency service.",
};

export default function ContactPage() {
  return <ContactContent />;
}
