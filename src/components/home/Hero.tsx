import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, TrendingUp, PhoneCall, Globe, Zap } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import heroIslandImg from "@/assets/images/marketing_hub_city_1785775329709.jpg";

const SEARCH_SUGGESTIONS = [
  "أفضل عيادة طبية متخصصة...",
  "أشهر مطعم وتجارة إلكترونية...",
  "أفضل خدمات فندقية وسياحية...",
  "صيدلية وخدمات تعمل 24 ساعة...",
  "مكتب استشارات وتقنية متكامل..."
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" as const }
  })
};

export default function Hero() {
  const [searchIndex, setSearchIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* 3D Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse-glow mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow mix-blend-screen pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-10%)',
          transformOrigin: 'top center'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* RIGHT COLUMN (RTL): Text Content */}
        <div className="order-1 flex flex-col justify-center text-right z-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/30 text-blue-300 w-fit mb-8"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold tracking-wider">مستقبل التسويق الرقمي</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] text-white drop-shadow-2xl"
          >
            دع العالم <br />
            <span className="text-gradient inline-block mt-2">يجدك بسهولة</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 text-lg sm:text-xl text-gray-300 font-medium leading-[1.8] max-w-lg drop-shadow-md"
          >
            نصنع لك حضوراً رقمياً يخطف الأنظار عبر تقنيات تسويقية متقدمة تجعل نشاطك يتصدر نتائج البحث ويسيطر على الخرائط.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              id="hero-whatsapp-btn"
              href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-3d-button flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white text-base sm:text-lg"
            >
              <PhoneCall className="w-5 h-5 shrink-0" />
              <span>احجز استشارتك المجانية</span>
            </a>
            
            <a
              href="#services"
              className="glass-card glass-card-hover flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-gray-200 text-base sm:text-lg"
            >
              <span>استكشف عوالمنا</span>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </a>
          </motion.div>

          {/* Search Widget */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-12 glass-card rounded-2xl p-4 flex items-center gap-4 max-w-md shadow-2xl border-white/10"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
              <Search className="w-6 h-6" />
            </div>
            <div className="relative h-6 overflow-hidden flex items-center w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={searchIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-base font-bold text-gray-200 whitespace-nowrap absolute"
                >
                  {SEARCH_SUGGESTIONS[searchIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* LEFT COLUMN (RTL): Image & 3D Cards */}
        <div className="order-2 w-full relative flex items-center justify-center mt-12 lg:mt-0 z-20">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-square flex items-center justify-center mx-auto"
            style={{ perspective: "1000px" }}
          >
            {/* Core Image container */}
            <div className="relative w-full h-full flex items-center justify-center group animate-float" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute inset-4 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />
              <img
                src={heroIslandImg}
                alt="المدينة العائمة لتغطية الخرائط"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover filter contrast-[1.2] brightness-[1.1] relative z-10 scale-110 mix-blend-screen"
                style={{
                  WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 75%)",
                  maskImage: "radial-gradient(circle at center, black 40%, transparent 75%)",
                }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* 3D Floating Glass Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50, z: -50 }}
              animate={{ opacity: 1, x: 0, z: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute top-10 left-0 sm:top-20 sm:left-4 z-30"
            >
              <div className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col items-center min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-black text-white leading-none text-shadow-glow">
                    +300%
                  </span>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="w-full h-1.5 bg-gray-700/50 rounded-full overflow-hidden mb-2">
                  <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                </div>
                <span className="text-xs font-bold text-gray-300">نمو غير مسبوق</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50, z: 50 }}
              animate={{ opacity: 1, x: 0, z: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-10 right-0 sm:bottom-20 sm:-right-4 z-30"
            >
              <div className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-2xl font-black text-white leading-tight">
                    +15 مدينة
                  </span>
                  <span className="text-xs font-bold text-gray-400">تغطية شاملة للخرائط</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
