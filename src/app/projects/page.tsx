import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ProjectFilters } from "@/components/projects/project-filters";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Tasheel Elevators project portfolio across commercial, residential, hotel, hospital, mall, and government buildings in Oman and the GCC.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        titleKey="projects.title"
        descriptionKey="projects.description"
        breadcrumbs={[{ labelKey: "common.home", href: "/" }, { labelKey: "nav.projects" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <ProjectFilters />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
