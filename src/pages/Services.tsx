import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getServices } from "@/lib/store";
import { SERVICES as DEFAULT_SERVICES } from "@/lib/siteData";

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="خدماتنا الشاملة"
        title="حلول تسويق رقمي متكاملة لنجاحك"
        subtitle="اختر الخدمة المناسبة لنشاطك — أو تواصل معنا لنساعدك في اختيار المسار الأمثل لتحقيق أهدافك."
      />

      {/* شبكة الخدمات */}
      <section className="relative py-12 md:py-20 bg-white overflow-hidden">
        {/* توهج زاوي ناعم يربط القسم بهوية الموقع */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* تفاصيل الخدمات بالتناوب */}
      <section className="relative py-14 md:py-24 bg-slate-50/60 overflow-hidden">
        {/* نمط نقاط خفيف جداً للعمق البصري */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 space-y-14 md:space-y-20">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
            >
              <div className="lg:[direction:rtl]">
                <div className="flex items-center gap-4 mb-5">
                  <span className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066CC] to-[#1E40AF] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-lg shadow-blue-500/25">
                    {i + 1}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">{s.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">{s.description}</p>
                <ul className="space-y-3 mb-7">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700" dir="rtl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <WhatsAppButton serviceTitle={s.title}>طلب الخدمة عبر واتساب</WhatsAppButton>
                </div>
              </div>

              <div className="lg:[direction:rtl] relative bg-white rounded-[24px] border border-slate-100 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
                {/* توهج علوي ناعم يميّز بطاقة النتائج */}
                <div className="absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" aria-hidden="true" />
                <h3 className="font-extrabold text-lg mb-4 flex items-center gap-2 text-slate-900">
                  <Star className="w-5 h-5 text-amber-500" fill="#F59E0B" aria-hidden="true" />
                  النتائج المتوقعة
                </h3>
                <ul className="space-y-3">
                  {s.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-slate-600" dir="rtl">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                {s.platforms && (
                  <>
                    <h3 className="font-extrabold text-lg mt-7 mb-4 text-slate-900">المنصات المتاحة</h3>
                    <div className="flex flex-wrap gap-2">
                      {s.platforms.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* شريط إغلاق أنيق يدفع لاتخاذ خطوة */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, #111B47 0%, #060B24 100%)" }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black leading-tight"
          >
            لم تجد ما يناسب نشاطك؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-white/70 text-lg font-medium"
          >
            نمزج لك الخدمات حسب أهدافك وميزانيتك — استشارتك الأولى مجانية بالكامل.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex justify-center"
          >
            <WhatsAppButton size="lg">احصل على استشارة مجانية</WhatsAppButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
