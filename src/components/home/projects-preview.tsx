"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function ProjectsPreview() {
  return (
    <section className="bg-navy py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Landmark work across Oman & the GCC"
            description="Commercial towers, hospitals, hotels, malls, residences, and government campuses—delivered with measurable outcomes."
            light
          />
          <Button asChild variant="secondary" className="shrink-0 self-start">
            <Link href="/projects">
              View portfolio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-electric/40"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-[#12243a] to-[#06101c] relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(27,143,255,0.25),transparent_50%)] transition duration-700 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-silver backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-silver/50 transition group-hover:text-electric-bright" />
                  </div>
                  <p className="mt-2 text-sm text-silver/60">
                    {project.location} · {project.year}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-silver/75">{project.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
