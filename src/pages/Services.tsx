import { useEffect, useState } from "react";
import { Check, Star, Sparkles, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getServices } from "@/lib/store";
import { SERVICES as DEFAULT_SERVICES, type Service } from "@/lib/siteData";

function PricingTable({ service }: { service: Service }) {
  const packages = service.pricing || [];
  return (
    <div className="space-y-3.5">
      {packages.map((pkg, i) => {
        const isMiddle = i === 1;
        return (
          <div
            key={pkg.name}
            className={`relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
              isMiddle
                ? "border-brass-500/50 bg-gradient-to-br from-brass-500/10 to-transparent shadow-card-lg"
                : "border-line bg-white hover:border-brass-500/30"
            }`}
          >
            {isMiddle && (
              <span className="absolute -top-2.5 right-5 inline-flex items-center gap-1 text-[10px] font-extrabold bg-gradient-to-l from-brass-600 to-brass-400 text-night-950 rounded-full px-3 py-1 shadow-glow-gold">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                الأكثر طلباً
              </span>
            )}
            <div className="flex flex-wrap items-end justify-between gap-3 mb-3.5">
              <div>
                <h4 className="font-extrabold text-night-900">{pkg.name}</h4>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-2xl text-night-900 leading-none">{pkg.price}</span>
                  <span className="text-xs font-bold text-muted-foreground">ج.م / شهرياً</span>
                </p>
              </div>
              <a
                href={buildWhatsAppLink(`مرحباً، أريد حجز باقة "${pkg.name}" من خدمة: ${service.title} 🙏`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-extrabold rounded-full px-4 py-2 transition-all active:scale-95 ${
                  isMiddle
                    ? "bg-gradient-to-l from-brass-600 to-brass-500 text-night-950 hover:brightness-110"
                    : "bg-night-900 text-white hover:bg-night-700"
                }`}
              >
                احجز الآن
                <ArrowLeft className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
            <ul className="space-y-1.5">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] font-semibold text-night-800/80">
                  <span className="w-4.5 h-4.5 rounded-full bg-mint-500/12 text-mint-600 flex items-center justify-center shrink-0 mt-px">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <p className="text-[11px] text-muted-foreground font-medium px-1">
        * أسعار استرشادية قابلة للتخصيص حسب حجم نشاطك — الاستشارة المجانية تُحدد العرض النهائي.
      </p>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="خدماتنا الشاملة"
        title={
          <>
            حلول تسويق رقمي متكاملة
            <br />
            <span className="text-gradient-gold">لنجاح نشاطك</span>
          </>
        }
        subtitle="اختر الخدمة المناسبة لنشاطك — أو تواصل معنا لنساعدك في اختيار المسار الأمثل."
      />

      {/* Services grid */}
      <section className="py-14 md:py-20 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Details + pricing */}
      <section className="py-14 md:py-24 bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          {services.map((s, i) => (
            <div
              key={s.id}
              id={`service-${s.id}`}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start scroll-mt-28"
            >
              {/* Content */}
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-sm font-bold text-brass-600 bg-brass-500/10 border border-brass-500/25 rounded-xl px-3 py-1.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-night-900 leading-snug">
                    {s.title}
                  </h2>
                </div>

                <p className="text-muted-foreground font-medium leading-loose mb-7">{s.description}</p>

                <h3 className="text-sm font-extrabold text-night-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-brass-400 to-brass-600" />
                  ماذا نقدم لك
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-7">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm font-semibold text-night-800/85">
                      <span className="w-5 h-5 rounded-full bg-mint-500/12 text-mint-600 flex items-center justify-center shrink-0 mt-px">
                        <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-extrabold text-night-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-brass-400 to-brass-600" />
                  النتائج المتوقعة
                </h3>
                <ul className="space-y-2.5 mb-7">
                  {s.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm font-semibold text-night-800/85">
                      <Star className="w-4 h-4 text-brass-500 fill-brass-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>

                {s.platforms && (
                  <>
                    <h3 className="text-sm font-extrabold text-night-900 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-brass-400 to-brass-600" />
                      المنصات المتاحة
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-7">
                      {s.platforms.map((p) => (
                        <span
                          key={p}
                          className="px-3.5 py-1.5 rounded-full bg-night-900 text-brass-300 text-xs font-bold border border-night-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <WhatsAppButton serviceTitle={s.title} size="md">
                    اطلب هذه الخدمة عبر واتساب
                  </WhatsAppButton>
                </div>
              </Reveal>

              {/* Pricing */}
              <Reveal delay={0.12} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="rounded-[26px] border border-line bg-fog/70 p-6 sm:p-8 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-night-900">باقات وأسعار</h3>
                    <span className="text-[11px] font-bold text-muted-foreground bg-white border border-line rounded-full px-3 py-1">
                      تبدأ من {s.pricing?.[0]?.price} ج.م
                    </span>
                  </div>
                  <PricingTable service={s} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
