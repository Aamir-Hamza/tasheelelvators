"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  engineeringProjects,
  projectFilters,
  type ProjectCategory,
} from "@/data/projects";
import { SectionHeading } from "@/components/shared/section-heading";

export function ProjectsGallery() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const filtered = useMemo(
    () =>
      active === "All"
        ? engineeringProjects
        : engineeringProjects.filter((p) => p.category === active),
    [active]
  );

  return (
    <section id="projects" className="border-t border-slate-200 bg-slate-950 py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Projects & Case Studies"
            title="Work that proves precision"
            description="Filter across engineering design, maintenance, elevators, and smart security deployments."
            light
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 self-start text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            Full portfolio <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {projectFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === cat
                  ? "bg-sky-600 text-white"
                  : "border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={
                        project.image.includes("orvibo")
                          ? "object-cover object-[center_10%]"
                          : "object-cover"
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(2,132,199,0.25),transparent_50%)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-200">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {project.location} · {project.year}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-slate-300">{project.summary}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
