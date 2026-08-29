"use client";

import { useEffect, useRef, useState } from "react";
import { useBrand } from "@/context/BrandContext";
import { getCategoryContent } from "@/data/servicesData";
import { CategoryHero } from "@/components/home/CategoryHero";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { CategoryProjects } from "@/components/home/CategoryProjects";
import { DynamicCTA } from "@/components/home/DynamicCTA";
import { scrollPageToTop } from "@/lib/scroll-to-top";
import type { DivisionId } from "@/config/brandsData";

export function CategorySwitch({ initialBrandId }: { initialBrandId: DivisionId }) {
  const { brandId } = useBrand();
  const [activeId, setActiveId] = useState<DivisionId>(initialBrandId);
  const skipFirstScroll = useRef(true);
  const skipFirstBrandSync = useRef(true);
  const content = getCategoryContent(activeId);

  useEffect(() => {
    if (skipFirstBrandSync.current) {
      skipFirstBrandSync.current = false;
      if (brandId !== initialBrandId) return;
    }
    setActiveId(brandId);
  }, [brandId, initialBrandId]);

  useEffect(() => {
    if (skipFirstScroll.current) {
      skipFirstScroll.current = false;
      return;
    }
    let instant = false;
    try {
      instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      instant = false;
    }
    scrollPageToTop({ instant });
  }, [activeId]);

  return (
    <div
      key={activeId}
      id="category-panel"
      role="tabpanel"
      aria-labelledby={`category-tab-${activeId}`}
      className="min-h-screen bg-slate-950 text-white"
    >
      <CategoryHero content={content} />
      <FeatureGrid content={content} />
      <ShowcaseSection content={content} />
      <CategoryProjects brandId={activeId} content={content} />
      <DynamicCTA content={content} />
    </div>
  );
}
