import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Phone, ArrowLeft, Star, TrendingUp, PhoneCall } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import heroIslandImg from "@/assets/images/hero_floating_island_new_1784909813154.jpg";

const SEARCH_SUGGESTIONS = [
  "أفضل عيادة طبية متخصصة...",
  "أشهر مطعم وتجارة إلكترونية...",
  "أفضل خدمات فندقية وسياحية...",
  "صيدلية وخدمات تعمل 24 ساعة...",
  "مكتب استشارات وتقنية متكمل..."
] as const;

// Static CTA targets — built once, reused across all hero buttons.
const HERO_CTA_HREF = buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏");
const INLINE_CTA_HREF = buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏");

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  }),
};

/** Cycling search-suggestion text. Kept as its own component so its 3.5s
 *  interval setState only re-renders this small chip, not the whole Hero. */
function CyclingSearchSuggestion() {
  const [searchIndex, setSearchIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  return (
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
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-24 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 bg-[#EEF2F7] content-paint"
      dir="rtl"
    >
      {/* Blueprint Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none gpu"
        style={{
          backgroundImage: `
            linear-gradient(#CBD5E1 1px, transparent 1px),
            linear-gradient(90deg, #CBD5E1 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* Studio Radial Soft Light Glows — static blur, no animate-pulse to spare the GPU. */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-amber-400/15 blur-[150px] pointer-events-none" />
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
            <span className="text-slate-800 font-extrabold">وكالة تسويق رقمي متكاملة</span>
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
                على خريطة النجاح
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
              href={HERO_CTA_HREF}
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
            <div className="flex-1 min-w-[280px] bg-white/90 backdrop-blur-md blur-gpu border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md flex items-center justify-between gap-2 hover:border-amber-400/50 transition-colors">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Search className="w-4 h-4" />
                </div>
                <CyclingSearchSuggestion />
              </div>
              <a
                href={INLINE_CTA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 font-extrabold text-[11px] px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0"
              >
                احجز استشارك
              </a>
            </div>

            {/* Widget 2: Ratings Badge */}
            <div className="bg-white/90 backdrop-blur-md blur-gpu border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
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
        <div className="order-2 w-full relative flex items-center justify-center overflow-hidden px-2 sm:px-0">

          {/* Main Floating Island Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[290px] xs:max-w-[340px] sm:max-w-[440px] lg:max-w-[520px] aspect-square flex items-center justify-center mx-auto"
          >
            {/* Dynamic Pedestal Ground Shadow Under the Flying Island */}
            <div
              className="absolute bottom-2 inset-x-8 h-12 bg-slate-950/60 blur-lg rounded-full pointer-events-none transform origin-center"
            />

            {/* Floating Island Image Container - Solid 3D Hovering Citadel */}
            <div className="relative w-full h-full flex items-center justify-center group/island">
              {/* Solid 3D Ambient Base Aura */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-amber-500/20 via-cyan-500/15 to-blue-600/20 blur-xl pointer-events-none transform opacity-80" />

              {/* Solid 3D Floating Citadel Wrapper — CSS float (no JS frames), lighter than framer infinite y */}
              <div className="w-full h-full relative flex items-center justify-center z-10 animate-float">
                {/* 3D Solid Island Image — above the fold, so eager + high priority for best LCP */}
                <img
                  src={heroIslandImg}
                  alt="المدينة العائمة لتغطية خرائط جوجل والأنشطة التجارية - وكالة دلّني"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width={520}
                  height={520}
                  sizes="(max-width: 640px) 290px, (max-width: 768px) 340px, (max-width: 1024px) 440px, 520px"
                  className="w-full h-full object-contain filter contrast-[1.08] brightness-[1.02] drop-shadow-[0_15px_30px_rgba(15,23,42,0.3)] select-none transition-all duration-300 rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* GLASS CARD 1: Top-Left +300% Growth Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-2 left-0 sm:top-6 sm:left-2 z-20"
            >
              <div
                className="bg-white/95 backdrop-blur-xl border border-white/90 rounded-xl p-2 sm:p-3.5 shadow-lg flex flex-col items-center min-w-[105px] sm:min-w-[140px]"
              >
                <div className="flex items-center gap-1">
                  <span className="text-base sm:text-2xl font-black text-amber-500 leading-none">
                    +300%
                  </span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                </div>
                {/* Visual Chart Line */}
                <div className="w-full h-1.5 sm:h-2 my-1 bg-amber-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-amber-500 rounded-full" />
                </div>
                <span className="text-[9px] sm:text-[11px] font-black text-slate-700 whitespace-nowrap">
                  نمو الظهور المحلي
                </span>
              </div>
            </motion.div>

            {/* GLASS CARD 2: Bottom-Right +500 Monthly Calls Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-4 right-0 sm:bottom-8 sm:right-2 z-20"
            >
              <div
                className="bg-white/95 backdrop-blur-xl border border-white/90 rounded-xl p-2 sm:p-3 shadow-lg flex items-center gap-2 sm:gap-3"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm sm:text-lg font-black text-slate-900 leading-tight">
                    +500
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-extrabold text-slate-600 whitespace-nowrap">
                    شهرياً من الخريطة
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
