import { TESTIMONIALS } from "@/lib/constants";
import { Stars } from "@/components/ui/Stars";
import { RevealGroup, RevealItem, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="testimonials-title">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(46,107,255,0.07),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="آراء عملائنا"
          title={
            <span id="testimonials-title">
              نتائج تتحدث… <span className="text-gold-arc">بعملائنا</span>
            </span>
          }
          subtitle="قصص حقيقية لأنشطة تجارية وصلت للصدارة وملأت هاتفها بالطلبات."
        />

        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="glass relative flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-white/15">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 24"
                  className="absolute top-6 left-6 h-6 w-6 text-gold-400/25"
                  fill="currentColor"
                >
                  <path d="M13 0C6 0 1 5.6 1 12.6 1 19 5.4 24 11 24c0-4.4-1.8-7.4-4.8-8.8.6-3.2 3-5.8 6.8-6.6L13 0zm18 0C24 0 19 5.6 19 12.6c0 6.4 4.4 11.4 10 11.4 0-4.4-1.8-7.4-4.8-8.8.6-3.2 3-5.8 6.8-6.6L31 0z" />
                </svg>
                <Stars rating={t.rating} className="mb-4" />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-mist-300">
                  «{t.text}»
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/6 pt-5">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white",
                      t.color,
                    )}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-mist-100">{t.name}</p>
                    <p className="text-xs text-mist-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
