import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import { TESTIMONIALS } from "@/lib/siteData";

export function TestimonialsSection() {
  return (
    <section id="reviews" className="relative scroll-mt-24 py-16 md:py-32 overflow-hidden">
      {/* 3D Cosmos Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="آراء العملاء"
          title="تجارب حقيقية لشركائنا"
          subtitle="تجارب حقيقية لشركائنا الذين حطموا الأرقام القياسية بعد تعاونهم مع دلّني."
          light={true}
        />
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-12">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative glass-card glass-card-hover rounded-[24px] p-8 flex flex-col justify-between overflow-hidden"
              dir="rtl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
              
              <div className="absolute top-6 left-6 text-blue-500/20 pointer-events-none">
                <Quote className="w-16 h-16 drop-shadow-md" aria-hidden="true" />
              </div>

              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]">★</span>
                  ))}
                </div>
                
                <p className="text-gray-200 leading-[1.8] font-medium text-base mb-8">
                  "{t.message}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10 relative z-10">
                <LazyImage 
                  src={t.avatar} 
                  alt={t.name} 
                  wrapperClassName="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/30 ring-4 ring-blue-500/10 shrink-0 bg-gray-800"
                  className="w-full h-full object-cover" 
                />
                <div>
                  <p className="font-extrabold text-base text-white flex items-center gap-1.5 drop-shadow-sm">
                    {t.name}
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                  </p>
                  <p className="text-sm text-blue-300 font-bold mt-1">{t.role}</p>
                </div>
              </div>
            </div>
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
    <section id="faq" className="relative scroll-mt-24 py-16 md:py-32 overflow-hidden" dir="rtl">
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-blue-600/10 blur-[150px] pointer-events-none mix-blend-screen" />
      
      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="دليلك للوضوح"
          title="الأسئلة الشائعة"
          subtitle="نجيب هنا على أبرز الاستفسارات لنضعك على بينة من كل التفاصيل قبل بدء رحلة النجاح معنا."
          light={true}
        />

        <div className="mt-12 space-y-5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 text-right hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shrink-0 mt-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                {faq.q}
              </h3>
              <p className="text-base text-gray-300 font-medium leading-[1.8] pr-5">
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
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Deep Cyberpunk Core Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060b24] via-[#0b1b47] to-[#04081c]" />
      
      {/* 3D Glowing Energy Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-[100%] bg-blue-500/20 blur-[120px] pointer-events-none mix-blend-screen animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-[100%] bg-purple-500/20 blur-[80px] pointer-events-none mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2 rounded-full text-sm font-black mb-8 bg-blue-500/10 text-blue-300 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          البداية من هنا
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 leading-[1.2] tracking-tight drop-shadow-2xl"
        >
          مستعد لاختراق السوق؟
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 text-xl md:text-2xl text-blue-100/80 leading-[1.8] max-w-3xl mx-auto font-medium"
        >
          نحن لا نقدم مجرد خدمات، بل نبني شراكات استراتيجية. تواصل معنا اليوم لتحصل على تقييم شامل لنشاطك، واستشارة مجانية ترسم لك خارطة الطريق نحو القمة.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <WhatsAppButton size="lg" className="w-full sm:w-auto shadow-[0_0_40px_rgba(37,211,102,0.4)]">
            ابدأ رحلتك واستشرنا مجاناً
          </WhatsAppButton>
          
          <Link
            to="/#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 glass-card glass-card-hover px-8 py-4 rounded-xl font-bold text-lg text-white border-white/20 hover:bg-white/10"
          >
            اكتشف خدماتنا
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
