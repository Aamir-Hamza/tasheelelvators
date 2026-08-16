import { HeroSlider } from "@/components/HeroSlider";
import { CoreServicesSection } from "@/components/sections/core-services";
import { DivisionsSpotlight } from "@/components/sections/divisions-spotlight";
import { QuoteEstimator } from "@/components/sections/quote-estimator";
import { SmartHomeFeature } from "@/components/sections/smart-home-feature";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { SafetyBanner } from "@/components/sections/safety-banner";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      {/* Image banners already include left-side graphics/text — keep showHtmlCopy off */}
      <HeroSlider showHtmlCopy={false} />
      <CoreServicesSection />
      <DivisionsSpotlight />
      <QuoteEstimator />
      <SmartHomeFeature />
      <ProjectsGallery />
      <SafetyBanner />
      <CtaBand />
    </>
  );
}
