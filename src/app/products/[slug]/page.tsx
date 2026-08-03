import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { getProduct, products } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { Check, Download, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        title={product.name}
        description={product.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-deep to-[#0d2848] aspect-[4/3] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(27,143,255,0.35),transparent_55%)]" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs uppercase tracking-[0.2em] text-electric-bright">{product.category}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">{product.name}</p>
            </div>
          </div>

          <div>
            <p className="text-muted leading-relaxed">{product.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Capacity</p>
                <p className="mt-2 font-display text-xl font-semibold">{product.capacity}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Speed</p>
                <p className="mt-2 font-display text-xl font-semibold">{product.speed}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/quote">
                  Request Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={product.brochure}>
                  <Download className="h-4 w-4" /> Download Brochure
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {[
            { title: "Features", items: product.features },
            { title: "Safety", items: product.safety },
            { title: "Energy Saving", items: product.energySaving },
          ].map((block) => (
            <div key={block.title} className="rounded-3xl border border-border bg-card p-7">
              <h2 className="font-display text-xl font-semibold">{block.title}</h2>
              <ul className="mt-5 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
