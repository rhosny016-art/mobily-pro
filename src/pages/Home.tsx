import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/home/Hero";
import TrustMarquee from "@/components/home/TrustMarquee";
import { ServicesSection, StatsSection, WhyChooseUsSection } from "@/components/home/Sections";
import { TestimonialsSection, FAQSection, CTASection } from "@/components/home/CaseStudies";
import LoadingFallback from "@/components/LoadingFallback";

const InteractiveAgencyMap = lazy(() => import("@/components/home/InteractiveAgencyMap"));

export default function Home() {
  const location = useLocation();
  const scrollToId = (location.state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    if (!scrollToId) return;
    // Wait for the page-transition + lazy sections to settle before scrolling
    const t = setTimeout(() => {
      const target = document.getElementById(scrollToId);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 450);
    return () => clearTimeout(t);
  }, [scrollToId]);

  return (
    <>
      <Hero />
      <TrustMarquee />
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
