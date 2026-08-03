import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { getProject, projects } from "@/lib/data/projects";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHero
        title={project.title}
        description={`${project.location} · ${project.category} · ${project.year}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-deep aspect-[21/9] relative mb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(27,143,255,0.3),transparent_55%)]" />
          </div>
          <p className="max-w-3xl text-lg text-muted leading-relaxed">{project.summary}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="font-display text-xl font-semibold">Challenge</h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">{project.challenge}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="font-display text-xl font-semibold">Solution</h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="font-display text-xl font-semibold">Results</h2>
              <ul className="mt-4 space-y-3">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-muted">
                    <Check className="h-4 w-4 text-electric" /> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="font-display text-xl font-semibold">Products used</h2>
              <ul className="mt-4 space-y-2">
                {project.products.map((p) => (
                  <li key={p} className="text-sm text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button asChild className="mt-10" size="lg">
            <Link href="/quote">
              Start a similar project <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
