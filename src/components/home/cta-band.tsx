"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageProvider";

export function CtaBand() {
  const { t } = useI18n();

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
          {t("home.ctaTitle")}
        </motion.h2>
        <p className="mx-auto mt-5 max-w-2xl text-slate-300">{t("home.ctaBody")}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-500">
            <Link href="/quote">
              {t("common.requestProposal")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> {t("common.whatsapp")}
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={SITE.emergencyHref}>
              <Phone className="h-4 w-4" /> {t("common.emergency")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
