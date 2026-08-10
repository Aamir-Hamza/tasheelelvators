"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.22),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-bold md:text-5xl"
        >
          Ready to engineer your next project?
        </motion.h2>
        <p className="mx-auto mt-5 max-w-2xl text-slate-300">
          Speak with Tasheel Engineering for design, maintenance, elevators, or smart security —
          or reach our emergency desk anytime.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-500">
            <Link href="/quote">
              Request a Proposal <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={SITE.emergencyHref}>
              <Phone className="h-4 w-4" /> Emergency
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
