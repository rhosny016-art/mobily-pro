import { lazy, Suspense } from "react";
import Hero from "@/components/home/Hero";
import { ServicesSection, StatsSection, WhyChooseUsSection } from "@/components/home/Sections";
import { TestimonialsSection, FAQSection, CTASection } from "@/components/home/CaseStudies";
import LoadingFallback from "@/components/LoadingFallback";

const InteractiveAgencyMap = lazy(() => import("@/components/home/InteractiveAgencyMap"));

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUsSection />
      <Suspense fallback={<LoadingFallback message="جاري تشغيل الخريطة التفاعلية..." fullScreen={false} />}>
        <InteractiveAgencyMap />
      </Suspense>
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
