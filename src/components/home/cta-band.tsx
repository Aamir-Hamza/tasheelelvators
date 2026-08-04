"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,143,255,0.22),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-bold md:text-5xl"
        >
          Ready to elevate your next project?
        </motion.h2>
        <p className="mx-auto mt-5 max-w-2xl text-silver/80">
          Speak with our engineers for specifications, traffic studies, and a tailored proposal—
          or reach our emergency desk anytime.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/quote">
              Request Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={SITE.whatsappHref}>
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
