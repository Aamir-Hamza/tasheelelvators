"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { getCategoryContent } from "@/data/servicesData";
import { CategoryHero } from "@/components/home/CategoryHero";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { CategoryProjects } from "@/components/home/CategoryProjects";
import { DynamicCTA } from "@/components/home/DynamicCTA";
import { scrollPageToTop } from "@/lib/scroll-to-top";

const panel = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.08 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

export function CategorySwitch() {
  const { brandId } = useBrand();
  const content = getCategoryContent(brandId);
  const reduceMotion = useReducedMotion();
  const skipFirst = useRef(true);

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    scrollPageToTop({ instant: Boolean(reduceMotion) });
  }, [brandId, reduceMotion]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={brandId}
        id="category-panel"
        role="tabpanel"
        aria-labelledby={`category-tab-${brandId}`}
        variants={reduceMotion ? undefined : panel}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        exit={reduceMotion ? undefined : "exit"}
        className="bg-slate-950"
      >
        <CategoryHero content={content} />
        <motion.div variants={reduceMotion ? undefined : item}>
          <FeatureGrid content={content} />
        </motion.div>
        <motion.div variants={reduceMotion ? undefined : item}>
          <ShowcaseSection content={content} />
        </motion.div>
        <motion.div variants={reduceMotion ? undefined : item}>
          <CategoryProjects brandId={brandId} content={content} />
        </motion.div>
        <motion.div variants={reduceMotion ? undefined : item}>
          <DynamicCTA content={content} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
