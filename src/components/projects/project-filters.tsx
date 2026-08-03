"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, projectCategories } from "@/lib/data/projects";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectFilters() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {projectCategories.map((cat) => (
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
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
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
                <div className="aspect-[16/10] bg-gradient-to-br from-navy to-navy-deep relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(27,143,255,0.25),transparent_50%)]" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-silver">
                    {project.category}
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
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
