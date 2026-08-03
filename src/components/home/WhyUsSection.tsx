import { WHY_US } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem, SectionHeading } from "@/components/ui/Reveal";

export function WhyUsSection() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="why-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="لماذا دلّني؟"
          title={
            <span id="why-title">
              شريك يُفكّر <span className="text-gold-arc">معك</span>، لا مجرد منفّذ
            </span>
          }
          subtitle="لا نبيع وعوداً — نبني أنظمة تسويق تتراكم نتائجها شهراً بعد شهر."
        />

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, i) => (
            <RevealItem key={item.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/25 hover:bg-white/[0.05]">
                <span
                  className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-ink-800 text-brand-300 transition-colors duration-300 group-hover:border-brand-400/30 group-hover:text-brand-400">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-mist-500" dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-mist-100">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mist-400">{item.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
