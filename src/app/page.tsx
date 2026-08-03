import { Hero } from "@/components/home/hero";
import { AboutPreview } from "@/components/home/about-preview";
import { ServicesGrid } from "@/components/home/services-grid";
import { ProductsShowcase } from "@/components/home/products-showcase";
import { WhyChooseUs } from "@/components/home/why-choose";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { ClientsTestimonials } from "@/components/home/clients-testimonials";
import { FaqPreview } from "@/components/home/faq-preview";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesGrid />
      <ProductsShowcase />
      <WhyChooseUs />
      <ProjectsPreview />
      <ProcessTimeline />
      <ClientsTestimonials />
      <FaqPreview />
      <CtaBand />
    </>
  );
}
