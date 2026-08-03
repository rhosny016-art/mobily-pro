import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Star, Crown, ArrowLeft } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import AuroraBackground from "@/components/AuroraBackground";
import { getServices } from "@/lib/store";
import { SERVICES as DEFAULT_SERVICES } from "@/lib/siteData";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { EASE_OUT } from "@/lib/motion";

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "top-[-10%] right-[10%] w-[480px] h-[480px]", color: "radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)" },
            { className: "top-[20%] left-[-6%] w-[420px] h-[420px]", color: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)" },
          ]}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 glass border-blue-400/25 text-blue-200 text-sm font-bold px-5 py-2 rounded-full mb-7 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
            خدماتنا الشاملة
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-black text-white leading-[1.2] [text-wrap:balance]"
          >
            حلول تسويق رقمي <span className="text-gradient">متكاملة لنجاحك</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: EASE_OUT }}
            className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            اختر الخدمة المناسبة لنشاطك — أو تواصل معنا لنساعدك في اختيار المسار الأمثل.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-9 h-[3px] w-28 mx-auto rounded-full bg-gradient-to-l from-blue-500 via-violet-500 to-cyan-400"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "bottom-[-10%] left-[20%] w-[520px] h-[520px]", color: "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)" },
          ]}
          grid={false}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 z-10">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: EASE_OUT }}
              className="h-full"
            >
              <ServiceCard service={s} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= DETAILS + PRICING ================= */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-blue-500/40 to-transparent" aria-hidden="true" />
        <AuroraBackground
          orbs={[
            { className: "top-[15%] right-[-8%] w-[600px] h-[600px]", color: "radial-gradient(circle, rgba(139,92,246,0.11), transparent 70%)" },
            { className: "bottom-[10%] left-[-8%] w-[500px] h-[500px]", color: "radial-gradient(circle, rgba(34,211,238,0.09), transparent 70%)" },
          ]}
        />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
          <SectionHeading
            eyebrow="تفاصيل الخدمات"
            title="كل ما تحتاجه للنمو في مكان واحد"
            subtitle="نستعرض هنا تفاصيل كل خدمة مع الباقات المتاحة — اختر ما يناسبك أو اطلب خطة مخصصة."
            light
          />

          <div className="space-y-20 md:space-y-28">
            {services.map((s, i) => {
              const middleTier = Math.floor((s.pricing?.length || 0) / 2);
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  id={`service-details-${s.id}`}
                  className="relative scroll-mt-28"
                >
                  {/* Section header */}
                  <div className="flex items-center gap-4 mb-8 md:mb-10">
                    <span className="font-display text-5xl md:text-6xl font-black text-white/[0.07] select-none" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black text-white">{s.title}</h2>
                      <p className="text-slate-400 font-medium mt-1 text-sm md:text-base">{s.description}</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                    {/* Left: benefits & results */}
                    <div className="card-premium rounded-[26px] p-6 sm:p-9 space-y-8">
                      <div>
                        <h3 className="font-extrabold text-lg mb-5 flex items-center gap-2.5 text-blue-200">
                          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <CheckCircle2 className="w-4.5 h-4.5" aria-hidden="true" />
                          </span>
                          ماذا نقدم لك؟
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-3.5">
                          {s.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" aria-hidden="true" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="h-px bg-gradient-to-l from-blue-500/25 via-white/[0.06] to-transparent" aria-hidden="true" />

                      <div>
                        <h3 className="font-extrabold text-lg mb-5 flex items-center gap-2.5 text-amber-200">
                          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                            <Star className="w-4.5 h-4.5" fill="currentColor" aria-hidden="true" />
                          </span>
                          النتائج المتوقعة
                        </h3>
                        <ul className="space-y-3.5">
                          {s.results.map((r) => (
                            <li key={r} className="flex items-start gap-3 text-sm text-slate-300">
                              <span className="mt-1.5 w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0" aria-hidden="true">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              </span>
                              <span className="font-medium leading-relaxed">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {s.platforms && (
                        <>
                          <div className="h-px bg-gradient-to-l from-violet-500/25 via-white/[0.06] to-transparent" aria-hidden="true" />
                          <div>
                            <h3 className="font-extrabold text-base mb-4 text-violet-200">المنصات المتاحة</h3>
                            <div className="flex flex-wrap gap-2.5">
                              {s.platforms.map((p) => (
                                <span
                                  key={p}
                                  className="px-3.5 py-1.5 rounded-full bg-violet-500/10 text-violet-300 text-xs font-bold border border-violet-400/25 transition-all duration-300 hover:bg-violet-500/25 hover:border-violet-400/50 hover:shadow-[0_0_15px_-4px_rgba(139,92,246,0.6)]"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right: pricing tiers */}
                    <div>
                      <h3 className="font-extrabold text-lg mb-5 flex items-center gap-2.5 text-emerald-200">
                        <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                          <Crown className="w-4.5 h-4.5" aria-hidden="true" />
                        </span>
                        الباقات والأسعار
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {s.pricing?.map((p, pi) => {
                          const isMiddle = pi === middleTier;
                          return (
                            <motion.div
                              key={p.name}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{ delay: pi * 0.1, duration: 0.55, ease: EASE_OUT }}
                              whileHover={{ y: -8 }}
                              className={`relative card-premium rounded-3xl p-6 flex flex-col h-full ${
                                isMiddle
                                  ? "border-gradient shadow-[0_20px_60px_-20px_rgba(59,130,246,0.5)]"
                                  : "border-white/[0.06] hover:border-white/20"
                              }`}
                            >
                              {isMiddle && (
                                <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-gradient-to-l from-blue-500 to-violet-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg whitespace-nowrap z-10">
                                  الأكثر اختياراً
                                </span>
                              )}
                              <p className="text-sm font-black text-slate-300 mb-3">{p.name}</p>
                              <p className="font-display text-3xl font-black text-white mb-1">
                                {p.price}
                                <span className="text-sm font-bold text-slate-400 mr-1.5">ج.م</span>
                              </p>
                              <div className="h-px w-full bg-white/[0.07] my-4" aria-hidden="true" />
                              <ul className="space-y-2.5 mb-6 flex-grow">
                                {p.features.map((f) => (
                                  <li key={f} className="flex items-start gap-2 text-xs text-slate-300 font-medium leading-relaxed">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                              <WhatsAppButton
                                serviceTitle={`${s.title} - باقة ${p.name}`}
                                size="sm"
                                className="w-full text-xs"
                              >
                                اطلب الباقة
                              </WhatsAppButton>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Custom plan note */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.25, duration: 0.55, ease: EASE_OUT }}
                        className="mt-5 glass rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
                      >
                        <p className="text-sm text-slate-300 font-bold">
                          تحتاج خطة مخصصة لنشاطك؟ <span className="text-slate-400 font-medium">نصممها معاً.</span>
                        </p>
                        <a
                          href={buildWhatsAppLink(`مرحباً، أريد خطة مخصصة لخدمة: ${s.title} 🙏`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost px-4 py-2 text-xs shrink-0 group"
                        >
                          تواصل معنا
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px]", color: "radial-gradient(ellipse, rgba(37,99,235,0.18), transparent 70%)" },
          ]}
          grid={false}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="text-3xl md:text-5xl font-black text-white [text-wrap:balance]"
          >
            لم تجد ما تبحث عنه؟ <span className="text-gradient">دعنا نبنيه لك</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="mt-5 text-lg text-slate-300 font-medium"
          >
            كل نشاط تجاري فريد — احصل على استشارة مجانية ونصمم لك خارطة الطريق الأنسب.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
            className="mt-9 flex justify-center"
          >
            <WhatsAppButton size="lg">احجز استشارتك المجانية الآن</WhatsAppButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
