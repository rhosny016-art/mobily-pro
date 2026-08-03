import { PhoneCall } from "lucide-react";
import { waLink } from "@/lib/constants";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="cta-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <RevealGroup>
          <RevealItem>
            <div className="border-arc noise relative overflow-hidden rounded-[2rem] bg-ink-900/80 px-6 py-16 text-center md:px-16 md:py-20">
              {/* Ambient glows */}
              <div
                className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[100px]"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-32 right-8 h-56 w-56 rounded-full bg-gold-400/10 blur-[80px]"
                aria-hidden="true"
              />
              <div
                className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-aurora-600 shadow-glow-brand">
                  <LogoMark className="h-10 w-10" />
                </div>
                <h2
                  id="cta-title"
                  className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-[1.25] text-mist-100 md:text-5xl md:leading-[1.2]"
                >
                  عميلك يبحث عنك الآن… <span className="text-arc">على الخريطة.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist-400 md:text-lg">
                  احجز استشارتك المجانية اليوم، ونخبرك بصدق: أين عملك اليوم، وما المطلوب
                  لتصدر منطقتك — خلال 24 ساعة.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={waLink("مرحباً دلّني 👋 أرغب في استشارة تسويقية مجانية لنشاطي")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-brand-500 to-brand-600 px-8 py-4 font-display text-base font-bold text-white shadow-glow-brand transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <PhoneCall className="h-5 w-5" aria-hidden="true" />
                    احجز استشارتك المجانية
                  </a>
                </div>
                <p className="mt-5 text-xs text-mist-500">
                  رد خلال دقائق في أوقات العمل · بدون أي التزامات
                </p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
