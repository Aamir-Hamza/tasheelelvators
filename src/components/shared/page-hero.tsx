"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LanguageProvider";

type Crumb = { label?: string; labelKey?: string; href?: string };

type Props = {
  title?: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  breadcrumbs?: Crumb[];
  className?: string;
};

export function PageHero({
  title,
  titleKey,
  description,
  descriptionKey,
  breadcrumbs,
  className,
}: Props) {
  const { t } = useI18n();
  const heading = titleKey ? t(titleKey) : title ?? "";
  const body = descriptionKey ? t(descriptionKey) : description;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy-deep pt-36 pb-20 md:pt-44 md:pb-28",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(27,143,255,0.18),transparent_50%)]" />
      <div className="absolute inset-0 noise-overlay opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-silver/70">
              {breadcrumbs.map((crumb, i) => {
                const label = crumb.labelKey ? t(crumb.labelKey) : crumb.label ?? "";
                return (
                  <li key={`${label}-${i}`} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-white transition-colors">
                        {label}
                      </Link>
                    ) : (
                      <span className="text-white">{label}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl"
        >
          {heading}
        </motion.h1>
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-lg text-silver/85"
          >
            {body}
          </motion.p>
        )}
      </div>
    </section>
  );
}
