import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { coreServices, getCoreService } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return coreServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getCoreService(slug);
  if (!service) return {};
  return { title: service.name, description: service.description };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getCoreService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.name}
        description={service.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="max-w-3xl text-lg text-muted leading-relaxed">{service.description}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <Check className="mt-0.5 h-5 w-5 text-sky-600" />
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-10" size="lg">
            <Link href="/quote">
              Discuss your project <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
