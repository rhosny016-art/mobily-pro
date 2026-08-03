import { useState } from "react";
import { Check, Crown } from "lucide-react";
import { ADS_PLANS, MAPS_PLANS, SERVICES, SERVICE_ICON_ACCENTS, waLink } from "@/lib/constants";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/home/CtaSection";
import { cn } from "@/lib/utils";

type Tab = "maps" | "ads";

export default function Services() {
  usePageMeta(
    "خدماتنا",
    "خدمات دلّني: إنشاء وتوثيق نشاط Google، تصدّر خرائط Google، إدارة التقييمات، حملات Google Ads والسوشيال ميديا، وتقارير دورية — باقات واضحة وأسعار صريحة.",
  );
  const [tab, setTab] = useState<Tab>("maps");
  const plans = tab === "maps" ? MAPS_PLANS : ADS_PLANS;

  return (
    <>
      <PageHero
        eyebrow="خدماتنا"
        title={
          <>
            منظومة تسويقية <span className="text-arc">متكاملة</span>
            <br />
            تحت سقف واحد
          </>
        }
        subtitle="من أول ظهور على الخرائط إلى حملات تملأ هاتفك بالطلبات — كل خدمة مصممة لتكمل الأخرى وتضاعف نتيجتك."
      />

      {/* ── Services detail ── */}
      <section className="relative py-20 md:py-28" aria-labelledby="services-detail-title">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id}>
                <article
                  className={cn(
                    "glass grid gap-8 overflow-hidden rounded-[2rem] p-8 transition-colors duration-300 hover:border-white/14 md:p-12 lg:grid-cols-[1.1fr_0.9fr]",
                    i % 2 === 1 && "lg:[direction:ltr] lg:[&>*]:[direction:rtl]",
                  )}
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                          SERVICE_ICON_ACCENTS[s.accent],
                        )}
                      >
                        <Icon name={s.icon} className="h-7 w-7" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-mist-100 md:text-2xl">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-[15px] leading-relaxed text-mist-400 md:text-base">
                      {s.description}
                    </p>
                    <a
                      href={waLink(`أرغب في خدمة «${s.title}» — أرجو التواصل معي`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-7 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-5 py-2.5 text-sm font-bold text-brand-300 transition-all duration-300 hover:bg-brand-500/20"
                    >
                      اطلب هذه الخدمة
                      <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
                        ←
                      </span>
                    </a>
                  </div>
                  <ul className="grid content-center gap-3">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 rounded-2xl border border-white/6 bg-ink-900/50 px-5 py-3.5 text-sm font-medium text-mist-200"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative scroll-mt-28 py-20 md:py-28" aria-labelledby="pricing-title">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_45%,rgba(46,107,255,0.08),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="الباقات والأسعار"
            title={
              <span id="pricing-title">
                أسعار صريحة… <span className="text-gold-arc">بلا مفاجآت</span>
              </span>
            }
            subtitle="اشترك شهرياً وأوقف متى شئت. كل الباقات تشمل دعم واتساب مباشر وتقارير شفافة."
          />

          {/* Tabs */}
          <Reveal className="mb-10 flex justify-center">
            <div
              role="tablist"
              aria-label="اختر نوع الباقات"
              className="glass inline-flex rounded-full p-1.5"
            >
              {(
                [
                  { id: "maps", label: "باقات خرائط Google 📍" },
                  { id: "ads", label: "باقات الحملات الإعلانية 📣" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "relative rounded-full px-6 py-2.5 font-display text-sm font-bold transition-colors duration-300",
                    tab === t.id ? "text-mist-100" : "text-mist-400 hover:text-mist-200",
                  )}
                >
                  {tab === t.id && (
                    <span
                      className="absolute inset-0 rounded-full bg-gradient-to-l from-brand-500/25 to-aurora-500/20 border border-brand-400/30"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <RevealGroup className="grid gap-6 lg:grid-cols-3" key={tab}>
            {plans.map((plan) => (
              <RevealItem key={plan.name} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-8",
                    plan.featured ? "border-arc glass-deep shadow-glow-brand" : "glass",
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
                    href={waLink(`أرغب في الاشتراك بباقة «${plan.name}» (${plan.price} ج.م/شهرياً)`)}
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

          <Reveal className="mt-8 text-center">
            <p className="text-sm text-mist-400">
              محتار أيهما يناسبك؟{" "}
              <a
                href={waLink("مرحباً دلّني 👋 أحتاج نصيحة حول الباقة الأنسب لنشاطي")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-300 underline-offset-4 hover:underline"
              >
                اسألنا — الرد خلال دقائق
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Method strip ── */}
      <section className="py-16 md:py-20" aria-label="طريقة عملنا">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <RevealGroup className="glass-deep grid gap-8 rounded-[2rem] p-10 md:grid-cols-3 md:p-14">
            {[
              {
                n: "01",
                t: "تشخيص مجاني",
                d: "نفحص ملفك الحالي وترتيبك ومنافسيك، ونحدد الفرص الأسرع عائداً.",
              },
              {
                n: "02",
                t: "تنفيذ خلال أيام",
                d: "معظم الخدمات تبدأ مفعولها خلال 3–7 أيام من إتمام التوثيق.",
              },
              {
                n: "03",
                t: "تحسين مستمر",
                d: "نراقب النتائج أسبوعياً ونطوّر الخطة كل شهر بناءً على الأرقام.",
              },
            ].map((m) => (
              <RevealItem key={m.n}>
                <div className="flex gap-5">
                  <span className="font-mono text-3xl font-bold text-gold-400/70" dir="ltr">
                    {m.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-mist-100">{m.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-400">{m.d}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
