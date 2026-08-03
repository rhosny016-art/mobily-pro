import { Link } from "react-router-dom";
import { ArrowLeft, Check, Crown } from "lucide-react";
import { MAPS_PLANS } from "@/lib/constants";
import { SectionHeading, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { waLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="pricing-title">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_55%,rgba(237,186,94,0.06),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="باقات خرائط Google"
          title={
            <span id="pricing-title">
              خطط واضحة… <span className="text-gold-arc">بأرقام صريحة</span>
            </span>
          }
          subtitle="اشترك شهرياً وأوقف متى شئت. كل باقة تتضمن دعم مباشر عبر واتساب وضمان الشفافية."
        />

        <RevealGroup className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {MAPS_PLANS.map((plan) => (
            <RevealItem key={plan.name} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl p-8",
                  plan.featured
                    ? "border-arc glass-deep shadow-glow-brand"
                    : "glass",
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 right-8 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-l from-gold-400 to-gold-500 px-3.5 py-1.5 text-[11px] font-bold text-ink-950 shadow-glow-gold">
                    <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                    الأكثر طلباً
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-mist-100">{plan.name}</h3>
                <p className="mt-1 text-sm text-mist-400">{plan.tagline}</p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      "font-mono text-5xl font-bold",
                      plan.featured ? "text-gold-arc" : "text-mist-100",
                    )}
                    dir="ltr"
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-mist-400">{plan.period}</span>
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-mist-300">
                      <span
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                          plan.featured
                            ? "bg-gold-400/15 text-gold-300"
                            : "bg-brand-500/15 text-brand-300",
                        )}
                      >
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`أرغب في الاشتراك بباقة «${plan.name}» لتحسين خرائط Google (${plan.price} ج.م/شهرياً)`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-display text-sm font-bold transition-all duration-300",
                    plan.featured
                      ? "btn-shine bg-gradient-to-l from-gold-400 to-gold-500 text-ink-950 shadow-glow-gold hover:scale-[1.02]"
                      : "border border-white/12 bg-white/[0.05] text-mist-100 hover:border-brand-400/40 hover:bg-white/[0.08]",
                  )}
                >
                  {plan.cta}
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10">
          <RevealItem className="flex justify-center">
            <Link
              to="/services#pricing"
              className="group inline-flex items-center gap-2 text-sm font-bold text-mist-300 transition-colors hover:text-brand-300"
            >
              شاهد أيضاً باقات الحملات الإعلانية الممولة
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
