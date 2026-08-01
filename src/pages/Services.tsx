import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles, Star } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/store";
import { SERVICES as DEFAULT_SERVICES } from "@/lib/siteData";

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-card text-white text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
            خدماتنا الشاملة
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-tight"
          >
            حلول تسويق رقمي متكاملة لنجاحك
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-white/70 max-w-2xl mx-auto"
          >
            اختر الخدمة المناسبة لنشاطك — أو تواصل معنا لنساعدك في اختيار المسار الأمثل.
          </motion.p>
        </div>
      </section>

      {/* شبكة الخدمات */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* تفاصيل الخدمات بالتناوب */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16 md:space-y-20">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
            >
              <div className="lg:[direction:rtl]">
                <div className="flex items-center gap-4 mb-5">
                  <span className="w-12 h-12 rounded-2xl gradient-primary text-white flex items-center justify-center text-xl font-black shrink-0">
                    {i + 1}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold">{s.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-3 mb-7">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${s.id}`}
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                >
                  تعرف على الأسعار والتفاصيل
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>

              <div className="lg:[direction:rtl] bg-white rounded-[24px] border border-border p-6 sm:p-8 shadow-sm">
                <h3 className="font-extrabold text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" fill="#F97316" aria-hidden="true" />
                  النتائج المتوقعة
                </h3>
                <ul className="space-y-3">
                  {s.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                {s.platforms && (
                  <>
                    <h3 className="font-extrabold text-lg mt-7 mb-4">المنصات المتاحة</h3>
                    <div className="flex flex-wrap gap-2">
                      {s.platforms.map((p) => (
                        <span key={p} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
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
    </>
  );
}
