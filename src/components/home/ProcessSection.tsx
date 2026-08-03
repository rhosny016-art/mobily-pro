import { PROCESS } from "@/lib/constants";
import { RevealGroup, RevealItem, SectionHeading } from "@/components/ui/Reveal";

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-labelledby="process-title">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_15%_50%,rgba(139,92,246,0.10),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="كيف نعمل"
          title={
            <span id="process-title">
              رحلة واضحة من <span className="text-arc">الاستشارة</span> إلى الصدارة
            </span>
          }
          subtitle="أربع خطوات بسيطة — بلا تعقيد، بلا مصطلحات مربكة، وبلا مفاجآت."
        />

        <RevealGroup className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line */}
          <div
            className="absolute inset-x-16 top-9 hidden h-px bg-gradient-to-l from-transparent via-brand-500/30 to-transparent lg:block"
            aria-hidden="true"
          />
          {PROCESS.map((p) => (
            <RevealItem key={p.step} className="relative">
              <div className="group flex flex-col items-center gap-5 text-center">
                <div className="relative">
                  <span className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border border-white/10 bg-ink-800 font-mono text-xl font-bold text-gold-300 shadow-card transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gold-400/40 group-hover:shadow-glow-gold">
                    {p.step}
                  </span>
                  <span
                    className="absolute -inset-2 -z-10 rounded-3xl bg-gold-400/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-mist-100">{p.title}</h3>
                  <p className="mx-auto mt-2 max-w-[17rem] text-sm leading-relaxed text-mist-400">
                    {p.text}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
