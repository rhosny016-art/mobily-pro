import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, Star } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import { ICON_MAP } from "@/lib/icons";
import { getServiceById } from "@/lib/store";
import type { Service } from "@/lib/siteData";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState<Service | undefined | null>(null); // null = جارٍ التحميل
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    getServiceById(id).then((s) => {
      if (!s || s.visible === false) setNotFound(true);
      else setService(s);
    });
  }, [id]);

  if (notFound) return <Navigate to="/services" replace />;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
      </div>
    );
  }

  const Icon = ICON_MAP[service.icon] || Sparkles;

  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition">
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            العودة للخدمات
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 glass-card text-white text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
              {service.featured ? "الأكثر طلباً" : "خدمة احترافية"}
            </span>
            <div className="flex items-start gap-5">
              <div className="hidden sm:flex w-16 h-16 rounded-2xl gradient-primary items-center justify-center text-white shrink-0">
                <Icon className="w-8 h-8" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{service.title}</h1>
                <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">{service.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* المحتوى + الباقات */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-10 items-start">
          {/* المحتوى */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[24px] border border-border p-5 sm:p-8">
              <h2 className="text-xl font-extrabold mb-6">المميزات والخدمات المضمنة</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-muted rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-semibold">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-border p-5 sm:p-8">
              <h2 className="text-xl font-extrabold mb-5">الفئات المستهدفة</h2>
              <div className="flex flex-wrap gap-2.5">
                {service.target.map((t) => (
                  <span key={t} className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-border p-5 sm:p-8">
              <h2 className="text-xl font-extrabold mb-5">النتائج المتوقعة</h2>
              <ul className="space-y-4">
                {service.results.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="#F97316" aria-hidden="true" />
                    <span className="text-sm text-foreground/85">{r}</span>
                  </li>
                ))}
              </ul>
              {service.platforms && (
                <>
                  <h2 className="text-xl font-extrabold mt-8 mb-5">المنصات المتاحة</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {service.platforms.map((p) => (
                      <div key={p} className="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 text-sm font-bold text-primary text-center">
                        {p}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* الباقات */}
          <aside className="lg:sticky lg:top-28 space-y-5">
            <h2 className="text-xl font-extrabold">الباقات والأسعار</h2>
            {service.pricing.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl border p-6 shadow-sm ${i === 1 ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
              >
                {i === 1 && (
                  <span className="inline-block gradient-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    الأكثر اختياراً
                  </span>
                )}
                <h3 className="font-extrabold">{p.name}</h3>
                <p className="mt-2">
                  <span className="text-3xl font-black text-primary">{p.price}</span>
                  <span className="text-sm text-muted-foreground mr-1">ج.م</span>
                </p>
                <ul className="mt-4 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton serviceTitle={`${service.title} - ${p.name}`} size="sm" className="w-full mt-5">
                  اطلب عبر واتساب
                </WhatsAppButton>
              </motion.div>
            ))}
          </aside>
        </div>
      </section>

      {/* التواصل */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">جاهز للبدء؟</h2>
          <p className="mt-3 text-muted-foreground">تواصل معنا مباشرة عبر واتساب أو أرسل طلبك وسنرد عليك سريعاً.</p>
          <div className="mt-7 mb-10">
            <WhatsAppButton serviceTitle={service.title} size="lg">
              تواصل الآن عبر واتساب
            </WhatsAppButton>
          </div>
          <div className="text-right">
            <ContactForm defaultSubject={`طلب خدمة: ${service.title}`} />
          </div>
        </div>
      </section>
    </>
  );
}
