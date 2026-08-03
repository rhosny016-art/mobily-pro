import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, ArrowLeft, PhoneCall, Star, TrendingUp, ShieldCheck } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import ServicesNodeMap from "./ServicesNodeMap";
import AuroraBackground from "@/components/AuroraBackground";
import TiltCard from "@/components/TiltCard";
import { EASE_OUT } from "@/lib/motion";

const SEARCH_SUGGESTIONS = [
  "أفضل عيادة طبية متخصصة...",
  "أشهر مطعم وتجارة إلكترونية...",
  "أفضل خدمات فندقية وسياحية...",
  "صيدلية وخدمات تعمل 24 ساعة...",
  "مكتب استشارات وتقنية متكامل...",
];

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

export default function Hero() {
  const [searchIndex, setSearchIndex] = useState(0);

  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 700], [0, 160]);
  const orbY2 = useTransform(scrollY, [0, 700], [0, -120]);
  const visualY = useTransform(scrollY, [0, 700], [0, 90]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        }}
        aria-hidden="true"
      />

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
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: EASE_OUT }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              id="hero-whatsapp-btn"
              href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
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
        </motion.div>
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
