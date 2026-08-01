import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, ArrowLeft, Star, TrendingUp, PhoneCall, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import heroIslandImg from "@/assets/images/hero_floating_island_new_1784909813154.jpg";

const SEARCH_SUGGESTIONS = [
  "أفضل عيادة أسنان قريبة مني...",
  "أشهر كافيه في القاهرة...",
  "أفضل فندق 5 نجوم في الرياض...",
  "صيدلية تعمل 24 ساعة متميزة...",
  "مكتب استشارات هندسية بالخليج..."
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  }),
};

export default function Hero() {
  const [searchIndex, setSearchIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative scroll-mt-24 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 bg-[#EEF2F7]"
      dir="rtl"
    >
      {/* Blueprint Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#CBD5E1 1px, transparent 1px),
            linear-gradient(90deg, #CBD5E1 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* Studio Radial Soft Light Glows */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-amber-400/15 blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] rounded-full bg-blue-600/12 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        
        {/* RIGHT COLUMN (RTL): Headline, Badge, Description, CTA Buttons */}
        <div className="order-1 text-right w-full">
          {/* Top Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 bg-white/90 border border-slate-200/90 backdrop-blur-md text-slate-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 md:mb-6 shadow-sm hover:shadow transition-shadow"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.9)] animate-ping" />
            <span className="text-slate-800 font-extrabold">وكالة تسويق رقمي متكاملة — مصر والخليج</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.16] tracking-tight"
          >
            نضع نشاطك
            <br />
            التجاري
            <br />
            <span className="relative inline-block mt-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D97706] via-[#EA580C] to-[#F59E0B] font-black">
                على خريطة
              </span>
              {/* Brush Underline stroke accent */}
              <svg
                className="absolute -bottom-2 right-0 w-full h-4 text-amber-500/50 pointer-events-none"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M3 8C50 3 150 2 197 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subheadline Paragraph */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-5 md:mt-7 text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl"
          >
            نساعد الأنشطة التجارية على تصدّر نتائج البحث المحلي إلى عملاء حقيقيين — عبر خرائط Google وحملات إعلانية كل المنصات.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-7 md:mt-9 flex flex-wrap items-center gap-3.5"
          >
            {/* Main Orange/Gold Pill CTA */}
            <a
              id="hero-whatsapp-btn"
              href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white text-sm sm:text-base bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#EA580C] hover:from-[#EA580C] hover:to-[#D97706] shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <PhoneCall className="w-4 h-4 text-white shrink-0" />
              <span>احجز استشارتك المجانية</span>
            </a>

            {/* Secondary Glass Pill Button */}
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-slate-800 text-sm sm:text-base bg-white/80 hover:bg-white border border-slate-300/80 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>استكشف خدماتنا</span>
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </a>
          </motion.div>

          {/* Bottom Floating Search & Review Widgets Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-12 pt-8 border-t border-slate-300/60 flex flex-wrap lg:flex-nowrap items-center gap-4"
          >
            {/* Widget 1: Dynamic Cycling Search Widget */}
            <div className="flex-1 min-w-[280px] bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md flex items-center justify-between gap-2 hover:border-amber-400/50 transition-colors">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Search className="w-4 h-4" />
                </div>
                <div className="relative h-5 overflow-hidden flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={searchIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="text-xs font-bold text-slate-700 whitespace-nowrap"
                    >
                      {SEARCH_SUGGESTIONS[searchIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <a
                href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 font-extrabold text-[11px] px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0"
              >
                احجز استشارك
              </a>
            </div>

            {/* Widget 2: Ratings Badge */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                </div>
                <span className="text-[10px] font-black text-slate-800 mt-0.5">
                  الـ 20k+ مراجعة
                </span>
              </div>
              
              {/* User Avatars Stack */}
              <div className="flex items-center -space-x-2 space-x-reverse">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                  أ
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                  م
                </div>
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                  و
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                  ع
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* LEFT COLUMN (RTL): 3D Floating Island & Overlay Cards */}
        <div className="order-2 w-full relative flex items-center justify-center">
          
          {/* Main Floating Island Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[540px] aspect-square flex items-center justify-center"
          >
            {/* Dynamic Pedestal Ground Shadow Under the Flying Island */}
            <motion.div
              animate={{
                scaleX: [0.9, 0.72, 0.9],
                scaleY: [0.45, 0.35, 0.45],
                opacity: [0.28, 0.16, 0.28],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-4 inset-x-12 h-16 bg-slate-950 blur-2xl rounded-full pointer-events-none transform origin-center"
            />

            {/* Floating Island Image Container */}
            <div className="relative w-full h-full flex items-center justify-center group/island">
              {/* Glowing Halo ring behind 3D Island image */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/35 via-blue-500/20 to-amber-500/30 blur-3xl pointer-events-none transform scale-95 group-hover/island:scale-105 transition-transform duration-700 animate-pulse" />

              {/* Main Floating Island Image - Radial Mask removes all outer rectangular image borders completely */}
              <motion.div
                className="w-full h-full relative flex items-center justify-center overflow-visible"
                animate={{
                  y: [0, -18, -4, -22, 0],
                  rotate: [0, 1.2, -0.8, 1, 0],
                  scale: [1, 1.02, 0.99, 1.01, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.06, rotate: 1.5, y: -25 }}
              >
                <img
                  src={heroIslandImg}
                  alt="3D Floating Island Google Maps - Dalni Agency"
                  className="w-full h-full object-contain mix-blend-multiply filter contrast-[1.08] brightness-[1.02] drop-shadow-[0_25px_50px_rgba(15,23,42,0.3)] hover:drop-shadow-[0_35px_75px_rgba(245,158,11,0.45)] select-none transition-all duration-500 cursor-pointer"
                  style={{
                    WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 82%)",
                    maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 82%)",
                  }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* GLASS CARD 1: Top-Left +300% Growth Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-6 left-2 sm:left-4 z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/90 backdrop-blur-xl border border-white/90 rounded-2xl p-3.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.12)] flex flex-col items-center min-w-[130px] sm:min-w-[150px]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-amber-500 leading-none">
                    +300%
                  </span>
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                </div>
                {/* Visual Chart Line */}
                <div className="w-full h-2 my-1.5 bg-amber-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-amber-500 rounded-full animate-pulse" />
                </div>
                <span className="text-[11px] font-black text-slate-700 whitespace-nowrap">
                  نمو الظهور المحلي
                </span>
              </motion.div>
            </motion.div>

            {/* GLASS CARD 2: Bottom-Right +500 Monthly Calls Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-8 right-2 sm:right-4 z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-white/90 backdrop-blur-xl border border-white/90 rounded-2xl p-3 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    +500
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-600 whitespace-nowrap">
                    شهرياً من الخريطة
                  </span>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

