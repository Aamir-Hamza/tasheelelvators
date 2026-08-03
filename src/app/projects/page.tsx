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
        title="Projects"
        description="A portfolio of vertical mobility systems delivered for Oman’s most demanding buildings."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
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
