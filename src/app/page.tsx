import { EngineeringHero } from "@/components/sections/engineering-hero";
import { CoreServicesSection } from "@/components/sections/core-services";
import { DivisionsSpotlight } from "@/components/sections/divisions-spotlight";
import { QuoteEstimator } from "@/components/sections/quote-estimator";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { SafetyBanner } from "@/components/sections/safety-banner";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <EngineeringHero />
      <CoreServicesSection />
      <DivisionsSpotlight />
      <QuoteEstimator />
      <ProjectsGallery />
      <SafetyBanner />
      <CtaBand />
    </>
  );
}
