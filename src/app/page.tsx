import { DynamicHero } from "@/components/home/DynamicHero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DivisionsSpotlight } from "@/components/sections/divisions-spotlight";
import { QuoteEstimator } from "@/components/sections/quote-estimator";
import { SmartHomeFeature } from "@/components/sections/smart-home-feature";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { SafetyBanner } from "@/components/sections/safety-banner";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <DynamicHero />
      <ServicesSection />
      <DivisionsSpotlight />
      <QuoteEstimator />
      <SmartHomeFeature />
      <ProjectsGallery />
      <SafetyBanner />
      <CtaBand />
    </>
  );
}
