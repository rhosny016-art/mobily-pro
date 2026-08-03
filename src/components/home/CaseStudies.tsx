import { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { motion } from "framer-motion";
import { ArrowLeft, Quote } from "lucide-react";
=======
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Quote, CheckCircle2, Plus, PhoneCall } from "lucide-react";
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import AuroraBackground from "@/components/AuroraBackground";
import { TESTIMONIALS } from "@/lib/siteData";
import { EASE_OUT } from "@/lib/motion";

/* ============================================================
   TESTIMONIALS
   ============================================================ */
export function TestimonialsSection() {
  return (
<<<<<<< HEAD
    <section id="reviews" className="relative scroll-mt-24 py-14 md:py-28 bg-slate-50/50 overflow-hidden">
      {/* خلفية جمالية */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
=======
    <section id="reviews" className="relative scroll-mt-24 py-20 md:py-32 overflow-hidden">
      <AuroraBackground
        orbs={[
          { className: "top-[-10%] right-[15%] w-[560px] h-[560px]", color: "radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)" },
          { className: "bottom-[-12%] left-[10%] w-[560px] h-[560px]", color: "radial-gradient(circle, rgba(59,130,246,0.13), transparent 70%)" },
        ]}
      />
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
<<<<<<< HEAD
          eyebrow="قالوا عنا"
          title="قصص نجاح حقيقية لشركائنا"
          subtitle="لا توجد شهادة أفضل من نجاح عملائنا؛ إليك بعض التجارب الواقعية ممن وضعوا ثقتهم في دلّني."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="relative bg-white rounded-[24px] border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              dir="rtl"
            >
              {/* أيقونة اقتباس أنيقة ومطورة */}
              <div className="absolute top-6 left-6 text-blue-500/10 pointer-events-none">
                <Quote className="w-12 h-12" aria-hidden="true" />
              </div>

              <div>
                {/* نجوم التقييم الخمسة للتأكيد على الجودة */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-amber-400">★</span>
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed font-medium text-sm">
=======
          eyebrow="آراء العملاء"
          title="تجارب حقيقية لشركائنا"
          subtitle="تجارب حقيقية لشركائنا الذين حطموا الأرقام القياسية بعد تعاونهم مع دلّني."
          light
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-6 md:pt-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.13, duration: 0.65, ease: EASE_OUT }}
              whileHover={{ y: -8 }}
              className="relative card-premium rounded-[26px] p-8 flex flex-col justify-between group"
              dir="rtl"
            >
              {/* Top glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-violet-500/10 blur-[70px] group-hover:bg-violet-500/20 transition-colors duration-700 pointer-events-none" aria-hidden="true" />

              {/* Quote mark */}
              <div className="absolute top-6 left-6 text-violet-500/25 group-hover:text-violet-400/40 transition-colors duration-500 pointer-events-none">
                <Quote className="w-14 h-14 rotate-180" aria-hidden="true" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.1 + idx * 0.06, type: "spring", stiffness: 300 }}
                      className="text-amber-400 text-lg drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                      aria-hidden="true"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                <p className="text-slate-200 leading-[1.9] font-medium text-base mb-8">
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                  "{t.message}"
                </p>
              </div>

<<<<<<< HEAD
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-50">
                <LazyImage 
                  src={t.avatar} 
                  alt={t.name} 
                  wrapperClassName="w-12 h-12 rounded-full overflow-hidden border-2 border-white ring-4 ring-blue-50/50 shrink-0 bg-slate-100"
                  className="w-full h-full object-cover" 
                />
                <div>
                  <p className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                    {t.name}
                    {/* شارة توثيق العميل الحقيقي */}
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-white text-[8px] font-black">✓</span>
=======
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.07] relative z-10">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-60 blur-[6px] scale-110" aria-hidden="true" />
                  <LazyImage
                    src={t.avatar}
                    alt={t.name}
                    wrapperClassName="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400/40 ring-4 ring-blue-500/10 shrink-0 bg-slate-800"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-extrabold text-base text-white flex items-center gap-1.5">
                    {t.name}
                    <span
                      className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                      title="عميل موثّق"
                    >
                      <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                    </span>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                  </p>
                  <p className="text-xs text-gray-400 font-bold mt-1">{t.role}</p>
                </div>
              </div>
<<<<<<< HEAD
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    {
      q: "كيف تساعد وكالة دلّني النشاط التجاري على تصدر نتائج الخرائط؟",
      a: "نقوم بتهيئة وتوثيق حساب Google Business Profile بالكامل، وتحسين الكلمات المفتاحية المحلية، وإدارة التقييمات، وبناء إشارات مرجعية حقيقية تجعل نشاطك يظهر ضمن الثلاثة الكبار (Local Pack)."
    },
    {
      q: "كم من الوقت يستغرق ظهور النتائج الأولى على الخريطة؟",
      a: "تظهر التحسينات الأولية عادةً خلال أول 14 إلى 30 يوماً من بدء العمل، وتتصاعد نتائج الترتيب والمكالمات بشكل ملحوظ مع الاستمرار."
    },
    {
      q: "هل خدماتكم تشمل الحملات الإعلانية المأجورة؟",
      a: "نعم، نقدم حملات إعلانية مستهدفة ومحسّنة عبر Google Ads، Meta (Instagram & Facebook)، TikTok، وSnapchat لتحقيق أعلى عائد على الاستثمار."
    },
    {
      q: "هل الاستشارة ومراجعة الملف مجانية؟",
      a: "بالتأكيد، الاستشارة الأولى مجانية بالكامل ونقدم خلالها تقريراً شاملاً عن حالة نشاطك التجاري ونقاط القوة والفرص المتاحة."
    }
  ];

  return (
    <section id="faq" className="relative scroll-mt-24 py-14 md:py-24 bg-white overflow-hidden" dir="rtl">
      <div className="relative max-w-4xl mx-auto px-4 lg:px-8">
        <SectionHeading
          eyebrow="إجابات وشكوك"
          title="الأسئلة الشائعة"
          subtitle="إليك أهم الأسئلة التي يطرحها شركاؤنا قبل البدء معنا"
        />

        <div className="mt-8 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 text-right hover:border-amber-400/50 transition-colors shadow-xs"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                {faq.q}
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed pr-4">
                {faq.a}
              </p>
=======
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ (accordion)
   ============================================================ */
const FAQS = [
  {
    q: "كيف تساعد وكالة دلّني النشاط التجاري على تصدر نتائج الخرائط؟",
    a: "نقوم بتهيئة وتوثيق حساب Google Business Profile بالكامل، وتحسين الكلمات المفتاحية المحلية، وإدارة التقييمات، وبناء إشارات مرجعية حقيقية تجعل نشاطك يظهر ضمن الثلاثة الكبار (Local Pack).",
  },
  {
    q: "كم من الوقت يستغرق ظهور النتائج الأولى على الخريطة؟",
    a: "تظهر التحسينات الأولية عادةً خلال أول 14 إلى 30 يوماً من بدء العمل، وتتصاعد نتائج الترتيب والمكالمات بشكل ملحوظ مع الاستمرار.",
  },
  {
    q: "هل خدماتكم تشمل الحملات الإعلانية المأجورة؟",
    a: "نعم، نقدم حملات إعلانية مستهدفة ومحسّنة عبر Google Ads، Meta (Instagram & Facebook)، TikTok، وSnapchat لتحقيق أعلى عائد على الاستثمار.",
  },
  {
    q: "هل الاستشارة ومراجعة الملف مجانية؟",
    a: "بالتأكيد، الاستشارة الأولى مجانية بالكامل ونقدم خلالها تقريراً شاملاً عن حالة نشاطك التجاري ونقاط القوة والفرص المتاحة.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 md:py-32 overflow-hidden" dir="rtl">
      <AuroraBackground
        orbs={[
          { className: "top-[30%] left-[-8%] w-[500px] h-[500px]", color: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)" },
        ]}
        grid={false}
      />

      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="دليلك للوضوح"
          title="الأسئلة الشائعة"
          subtitle="نجيب هنا على أبرز الاستفسارات لنضعك على بينة من كل التفاصيل قبل بدء رحلة النجاح معنا."
          light
        />

        <div className="mt-10 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: EASE_OUT }}
                className={`card-premium rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-blue-400/30 shadow-[0_0_45px_-12px_rgba(59,130,246,0.35)]" : "border-white/[0.06] hover:border-white/15"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 text-right"
                >
                  <h3 className={`text-base sm:text-lg font-bold flex items-start gap-3 transition-colors duration-300 ${isOpen ? "text-blue-200" : "text-white"}`}>
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]"
                          : "bg-slate-600 group-hover:bg-blue-400"
                      }`}
                      aria-hidden="true"
                    />
                    {faq.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-blue-600 to-violet-600 border-blue-400/40 text-white shadow-[0_0_20px_-4px_rgba(59,130,246,0.7)]"
                        : "bg-white/[0.04] border-white/10 text-slate-400"
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="w-4.5 h-4.5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6">
                        <div className="h-px w-full bg-gradient-to-l from-blue-500/30 via-white/5 to-transparent mb-5" aria-hidden="true" />
                        <p className="text-slate-300 font-medium leading-[1.95] text-[0.95rem] pr-2">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
export function CTASection() {
  return (
<<<<<<< HEAD
    <section 
      className="relative py-14 md:py-28 overflow-hidden text-white"
      style={{
        background: "radial-gradient(circle at 50% 50%, #111B47 0%, #060B24 100%)"
      }}
    >
      {/* توهج نيون بالمنتصف */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* نمط النقاط الناعمة جداً بالخلفية */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 bg-blue-500/10 text-blue-400 border border-blue-500/20"
        >
          دعنا نضعك في المقدمة
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-white leading-[1.3] tracking-tight"
        >
          هل أنت مستعد لتحويل حضورك الرقمي؟
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium"
        >
          انضم إلى أكثر من 250 شريك نجاح اختاروا النمو الحقيقي والمستدام معنا. استشارتك الأولى ومراجعة ملفك مجانية بالكامل.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5"
        >
          <WhatsAppButton size="lg" className="shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-all">
            ابدأ محادثة واستشرنا مجاناً
          </WhatsAppButton>
          
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/90 bg-white/5 hover:bg-white/10 px-8 py-4.5 rounded-xl font-bold text-base transition-all duration-300"
          >
            تصفح الخدمات المتكاملة
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </Link>
=======
    <section className="relative py-20 md:py-32 overflow-hidden">
      <AuroraBackground
        orbs={[
          { className: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[420px]", color: "radial-gradient(ellipse, rgba(59,130,246,0.22), transparent 70%)" },
          { className: "top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-[420px] h-[220px]", color: "radial-gradient(ellipse, rgba(139,92,246,0.2), transparent 70%)" },
        ]}
        grid={false}
      />

      <div className="relative max-w-5xl mx-auto px-4 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="border-gradient-animated rounded-[36px] px-6 py-14 sm:px-12 md:py-20 text-center relative overflow-hidden shadow-[0_40px_120px_-30px_rgba(37,99,235,0.5)]"
        >
          {/* Inner glows */}
          <div className="absolute -top-24 right-1/4 w-72 h-72 rounded-full bg-blue-600/20 blur-[100px] animate-pulse-glow pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full bg-violet-600/20 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />

          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 }}
            className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black mb-9 bg-white/[0.06] text-amber-300 border border-amber-400/25 shadow-[0_0_25px_-6px_rgba(245,158,11,0.5)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            البداية من هنا
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
            className="relative text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.25] [text-wrap:balance]"
          >
            مستعد <span className="text-gradient">لاختراق السوق؟</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.32 }}
            className="relative mt-8 text-lg md:text-xl text-slate-300 leading-[1.9] max-w-2xl mx-auto font-medium"
          >
            نحن لا نقدم مجرد خدمات، بل نبني شراكات استراتيجية. تواصل معنا اليوم لتحصل على تقييم شامل
            لنشاطك، واستشارة مجانية ترسم لك خارطة الطريق نحو القمة.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
            className="relative mt-12 flex flex-col sm:flex-row justify-center items-center gap-5"
          >
            <WhatsAppButton size="lg" className="w-full sm:w-auto shadow-[0_0_45px_-8px_rgba(37,211,102,0.55)]">
              ابدأ رحلتك واستشرنا مجاناً
            </WhatsAppButton>

            <Link
              to="/"
              state={{ scrollTo: "services" }}
              className="btn-ghost w-full sm:w-auto px-8 py-4 rounded-2xl text-lg group"
            >
              اكتشف خدماتنا
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-slate-400"
          >
            <span className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              رد خلال دقائق عبر واتساب
            </span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" aria-hidden="true" />
              بدون أي التزام مادي
            </span>
          </motion.div>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
        </motion.div>
      </div>
    </section>
  );
}
