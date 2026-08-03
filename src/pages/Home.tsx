import { usePageMeta } from "@/lib/usePageMeta";
import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  usePageMeta(
    undefined,
    "دلّني وكالة تسويق رقمي متكاملة متخصصة في تصدّر خرائط Google: إنشاء وتوثيق النشاط، تحسين الترتيب، إدارة التقييمات، وحملات إعلانية مربحة.",
  );
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ServicesSection />
      <StatsSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
