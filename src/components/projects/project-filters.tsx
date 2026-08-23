"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { projects, projectCategories, getProjectCover } from "@/lib/data/projects";
import { ProjectCover } from "@/components/projects/project-cover";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterLabel } from "@/i18n/useBrandCopy";
import { useBrand } from "@/context/BrandContext";
import { scrollPageToTop } from "@/lib/scroll-to-top";

export function ProjectFilters() {
  const { brandId } = useBrand();
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const filterLabel = useFilterLabel();

  const divisionProjects = useMemo(
    () => projects.filter((p) => p.division === brandId),
    [brandId]
  );

  const visibleCategories = useMemo(() => {
    const used = new Set(divisionProjects.flatMap((p) => p.categories));
    return projectCategories.filter((cat) => cat === "All" || used.has(cat));
  }, [divisionProjects]);

  useEffect(() => {
    setActive("All");
    scrollPageToTop();
  }, [brandId]);

  const filtered = useMemo(
    () =>
      active === "All"
        ? divisionProjects
        : divisionProjects.filter((p) => p.categories.includes(active)),
    [active, divisionProjects]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {visibleCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === cat
                ? "bg-electric text-white"
                : "border border-border bg-card text-muted hover:text-foreground"
            }`}
          >
            {filterLabel(cat)}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => {
            const cover = getProjectCover(project, active);
            return (
              <motion.div
                key={`${project.slug}-${cover}`}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card transition hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy to-navy-deep">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(27,143,255,0.25),transparent_50%)]" />
                    <ProjectCover src={cover} alt={project.title} />
                    <span className="absolute start-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-xs text-silver">
                      {filterLabel(active === "All" ? project.categories[0] : active)}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-xl font-semibold">{project.title}</h2>
                      <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-electric" />
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {project.location} · {project.year}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm text-muted">{project.summary}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
