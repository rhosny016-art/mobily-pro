import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/Reveal";

export function FaqSection() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="faq-title">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          eyebrow="أسئلة شائعة"
          title={
            <span id="faq-title">
              كل ما تريد <span className="text-arc">معرفته</span> قبل أن نبدأ
            </span>
          }
        />
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
