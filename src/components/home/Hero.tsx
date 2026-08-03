import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, ArrowLeft, Star, TrendingUp, PhoneCall, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import heroIslandImg from "@/assets/images/hero_floating_island_new_1784909813154.jpg";
=======
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, ArrowLeft, PhoneCall, Star, TrendingUp, ShieldCheck } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import ServicesNodeMap from "./ServicesNodeMap";
import AuroraBackground from "@/components/AuroraBackground";
import TiltCard from "@/components/TiltCard";
import { EASE_OUT } from "@/lib/motion";
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e

const SEARCH_SUGGESTIONS = [
  "أفضل عيادة طبية متخصصة...",
  "أشهر مطعم وتجارة إلكترونية...",
  "أفضل خدمات فندقية وسياحية...",
  "صيدلية وخدمات تعمل 24 ساعة...",
  "مكتب استشارات وتقنية متكامل...",
];

<<<<<<< HEAD
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  }),
};
=======
const TRUST_ITEMS = [
  { icon: Star, text: "تقييم 4.9 من عملائنا", color: "text-amber-300" },
  { icon: TrendingUp, text: "نمو ظهور يصل إلى 300%", color: "text-emerald-300" },
  { icon: ShieldCheck, text: "استشارة مجانية 100%", color: "text-cyan-300" },
];

const FLOATING_CHIPS = [
  { label: "خرائط Google", emoji: "📍", cls: "top-[6%] right-[2%] sm:right-[-4%]", delay: "0s", color: "border-emerald-400/30 text-emerald-300" },
  { label: "Google Ads", emoji: "🚀", cls: "bottom-[18%] right-[-2%] sm:right-[-8%]", delay: "1.2s", color: "border-blue-400/30 text-blue-300" },
  { label: "TikTok", emoji: "🎯", cls: "bottom-[6%] left-[4%] sm:left-[-2%]", delay: "0.6s", color: "border-pink-400/30 text-pink-300" },
];
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e

export default function Hero() {
  const [searchIndex, setSearchIndex] = useState(0);

  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 700], [0, 160]);
  const orbY2 = useTransform(scrollY, [0, 700], [0, -120]);
  const visualY = useTransform(scrollY, [0, 700], [0, 90]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

<<<<<<< HEAD
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
=======
  const headline = ["دع", "عملاءك", "يجدونك", "بكل", "سهولة"];
  const highlightStart = 2;

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Ambient parallax background */}
      <AuroraBackground
        orbs={[
          { className: "top-[-5%] right-[-8%] w-[480px] h-[480px]", color: "radial-gradient(circle, rgba(37,99,235,0.4), transparent 70%)" },
          { className: "bottom-[10%] left-[-10%] w-[520px] h-[520px]", color: "radial-gradient(circle, rgba(139,92,246,0.32), transparent 70%)" },
          { className: "top-[40%] left-[30%] w-[380px] h-[380px]", color: "radial-gradient(circle, rgba(34,211,238,0.22), transparent 70%)" },
        ]}
      />
      <motion.div style={{ y: orbY1 }} className="absolute top-1/4 left-[12%] w-64 h-64 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" aria-hidden="true" />
      <motion.div style={{ y: orbY2 }} className="absolute bottom-[8%] right-[14%] w-72 h-72 rounded-full bg-violet-600/20 blur-[110px] pointer-events-none" aria-hidden="true" />

      {/* Perspective grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,165,250,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.10) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: "perspective(600px) rotateX(62deg) scale(2.2) translateY(12%)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, black 30%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 85%)",
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
        }}
        aria-hidden="true"
      />

<<<<<<< HEAD
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
=======
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 w-full grid lg:grid-cols-2 gap-14 lg:gap-10 items-center z-10">
        {/* RIGHT COLUMN (RTL): Text content */}
        <div className="order-1 flex flex-col justify-center text-right z-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-blue-400/25 text-blue-200 w-fit mb-8 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            </span>
            <span className="text-sm font-bold tracking-wide">شريكك الموثوق في رحلة النجاح</span>
          </motion.div>

          {/* Headline with word reveal */}
          <h1 className="text-[2.6rem] leading-[1.15] sm:text-6xl lg:text-[4.2rem] font-black text-white [text-wrap:balance]">
            {headline.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.7, ease: EASE_OUT }}
                className={`inline-block ml-2.5 ${i >= highlightStart ? "text-gradient" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: EASE_OUT }}
            className="mt-7 text-lg sm:text-xl text-slate-300 font-medium leading-[1.9] max-w-lg drop-shadow-md"
          >
            نحن هنا لنضعك في المقدمة. بخطوات مدروسة ولمسة إبداعية، نصنع لنشاطك حضوراً رقمياً يتردد صداه
            ويوصلك لعملائك حيثما كانوا، بكل احترافية.
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
          </motion.p>

          {/* CTA buttons */}
          <motion.div
<<<<<<< HEAD
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-7 md:mt-9 flex flex-wrap items-center gap-3.5"
=======
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: EASE_OUT }}
            className="mt-10 flex flex-wrap items-center gap-5"
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
          >
            {/* Main Orange/Gold Pill CTA */}
            <a
              id="hero-whatsapp-btn"
              href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
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

              {/* Solid 3D Floating Citadel Wrapper */}
              <motion.div
                className="w-full h-full relative flex items-center justify-center z-10"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* 3D Solid Island Image without mix-blend-multiply to preserve crisp solid structure */}
                <img
                  src={heroIslandImg}
                  alt="المدينة العائمة لتغطية خرائط جوجل والأنشطة التجارية - وكالة دلّني"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter contrast-[1.08] brightness-[1.02] drop-shadow-[0_15px_30px_rgba(15,23,42,0.3)] select-none transition-all duration-300 rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
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
=======
              className="btn-primary px-8 py-4 text-base sm:text-lg rounded-2xl"
            >
              <PhoneCall className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>احجز استشارتك المجانية</span>
            </a>

            <a href="#services" className="btn-ghost px-8 py-4 text-base sm:text-lg rounded-2xl group">
              <span>استكشف خدماتنا</span>
              <ArrowLeft className="w-5 h-5 text-slate-300 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {TRUST_ITEMS.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm font-bold text-slate-300">
                <item.icon className={`w-4.5 h-4.5 ${item.color}`} aria-hidden="true" />
                {item.text}
              </div>
            ))}
          </motion.div>

          {/* Search widget */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: EASE_OUT }}
            className="mt-10 glass rounded-2xl p-3.5 flex items-center gap-4 max-w-md border-white/10 shadow-[0_25px_60px_-20px_rgba(2,6,23,0.9)]"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/25 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/25">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="relative h-7 overflow-hidden flex items-center w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={searchIndex}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="text-base font-bold text-slate-200 whitespace-nowrap absolute"
                >
                  {SEARCH_SUGGESTIONS[searchIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
              <kbd className="font-display text-slate-300">🔍</kbd>
              بحث محلي
            </span>
          </motion.div>
        </div>

        {/* LEFT COLUMN (RTL): Interactive 3D visual */}
        <motion.div
          style={{ y: visualY }}
          className="order-2 w-full relative flex items-center justify-center mt-10 lg:mt-0 z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotateY: 18 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.35 }}
            className="relative w-full max-w-[500px] lg:max-w-[580px] aspect-square flex items-center justify-center mx-auto"
            style={{ perspective: "1200px" }}
          >
            {/* Glow halo */}
            <div className="absolute inset-6 rounded-full bg-blue-500/20 blur-[100px] animate-pulse-glow pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full ring-conic opacity-25 animate-spin-slow pointer-events-none" aria-hidden="true" />

            {/* 3D tilt node map */}
            <TiltCard maxTilt={10} scale={1.03} className="relative w-full h-full">
              <div className="w-full h-full animate-float" style={{ animationDuration: "8s" }}>
                <ServicesNodeMap />
              </div>
            </TiltCard>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e

            {/* Floating glass chips */}
            {FLOATING_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className={`absolute ${chip.cls} z-40 animate-float pointer-events-none`}
                style={{ animationDelay: chip.delay, animationDuration: "6s" }}
              >
                <div className={`glass rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm font-bold ${chip.color} shadow-xl`}>
                  <span aria-hidden="true">{chip.emoji}</span>
                  {chip.label}
                </div>
              </div>
            ))}
          </motion.div>
<<<<<<< HEAD
        </div>

=======
        </motion.div>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
      </div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#services"
        aria-label="مرر للأسفل"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-slate-500 hover:text-blue-300 transition-colors group"
      >
        <span className="text-[11px] font-bold tracking-[0.3em]">مرر للأسفل</span>
        <span className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-current"
          />
        </span>
      </motion.a>
    </section>
  );
}

