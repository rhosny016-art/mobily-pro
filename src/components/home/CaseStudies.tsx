import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import { TESTIMONIALS } from "@/lib/siteData";

export function TestimonialsSection() {
  return (
    <section
      id="reviews"
      aria-label="آراء العملاء"
      className="relative scroll-mt-24 py-14 md:py-28 bg-slate-50/50 overflow-hidden content-paint"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0px 500px" }}
    >
      {/* خلفية جمالية */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
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
              {/* أيقونة اقتباس أنيقة — SVG واحدة فقط لكل بطاقة */}
              <div className="absolute top-6 left-6 text-blue-500/10 pointer-events-none" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div>
                {/* نجوم التقييم — CSS بدل 5 عناصر span منفصلة */}
                <div className="flex gap-1 mb-5" aria-label="تقييم 5 نجوم">
                  <span className="text-amber-400 text-base leading-none">★★★★★</span>
                </div>

                <p className="text-gray-600 leading-relaxed font-medium text-sm">
                  "{t.message}"
                </p>
              </div>

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
                  </p>
                  <p className="text-xs text-gray-400 font-bold mt-1">{t.role}</p>
                </div>
              </div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
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
        </motion.div>
      </div>
    </section>
  );
}
