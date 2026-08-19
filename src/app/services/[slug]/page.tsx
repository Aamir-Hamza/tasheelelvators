import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { coreServices, getCoreService } from "@/data/services";
import { ServiceDetailContent } from "./service-detail-content";

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

  return <ServiceDetailContent slug={slug} />;
}
