"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { engineeringProjects } from "@/data/projects";
import type { DivisionId } from "@/config/brandsData";
import type { CategoryData } from "@/data/servicesData";

type EngineeringDivision = NonNullable<(typeof engineeringProjects)[number]["division"]>;

const DIVISION_FILTER: Record<DivisionId, EngineeringDivision[]> = {
  elevators: ["elevators"],
  "smart-systems": ["cctv-smart-home"],
  engineering: ["engineering"],
};

export function CategoryProjects({
  brandId,
  content,
}: {
  brandId: DivisionId;
  content: CategoryData;
}) {
  const allowed = DIVISION_FILTER[brandId] ?? DIVISION_FILTER.elevators;
  const projects = engineeringProjects.filter(
    (p) => p.division && allowed.includes(p.division)
  );

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="border-t border-white/10 bg-slate-950 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">Selected work</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Projects in this vertical</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-semibold"
            style={{ color: content.theme.accent }}
          >
            Full portfolio <ArrowUpRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute start-4 top-4 rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-200">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
