import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  MapPin,
  Phone,
  Navigation,
  Clock,
  ArrowLeft,
  TrendingUp,
  PhoneCall,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const SEARCH_SUGGESTIONS = [
  "أفضل مطعم قريب مني...",
  "عيادة أسنان ممتازة قريبة...",
  "متجر ملابس بجوارى...",
  "خدمة توصيل تعمل الآن...",
  "صيدلية مفتوحة 24 ساعة...",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.65, ease: [0.215, 0.61, 0.355, 1] as const },
  }),
};

export default function Hero() {
  const [searchIndex, setSearchIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative bg-night-950 overflow-hidden scroll-mt-24">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-night-grid opacity-50" aria-hidden="true" />
      <div className="absolute -top-40 right-[10%] w-[640px] h-[640px] rounded-full bg-brass-500/12 blur-[160px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-48 left-[5%] w-[560px] h-[560px] rounded-full bg-night-600/35 blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" aria-hidden="true" />
      {/* Bottom fade into page */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-fog pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-20 md:pb-28 grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        {/* ===== Copy ===== */}
        <div className="text-right w-full order-1">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2.5 glass-dark text-slate-200 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-ring absolute inline-flex h-full w-full rounded-full bg-brass-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brass-400" />
            </span>
            وكالة تسويق رقمي متكاملة
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-[38px] sm:text-5xl lg:text-[56px] font-black text-white leading-[1.18] tracking-tight"
          >
            نضع نشاطك التجاري
            <br />
            على
            <span className="relative inline-block mx-2">
              <span className="text-gradient-gold">خريطة النجاح</span>
              <svg
                className="absolute -bottom-2 right-0 w-full h-4 text-brass-500/60 pointer-events-none"
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9C55 4 165 3 217 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 text-sm sm:text-base md:text-lg text-slate-300/85 font-medium leading-relaxed max-w-xl"
          >
            نساعد الأنشطة التجارية على تصدّر نتائج البحث المحلي وجذب عملاء حقيقيين —
            عبر خرائط Google وحملات إعلانية مدروسة على كل المنصات.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-extrabold text-night-950 text-sm sm:text-base bg-gradient-to-l from-brass-600 via-brass-500 to-brass-400 shadow-[0_14px_38px_-10px_rgba(237,155,47,0.7)] hover:shadow-[0_20px_48px_-10px_rgba(237,155,47,0.9)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
              احجز استشارتك المجانية
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-white text-sm sm:text-base glass-dark hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              استكشف خدماتنا
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex text-brass-400" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brass-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-white">
                4.9 <span className="text-slate-400 font-medium">تقييم عملائنا</span>
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/12" aria-hidden="true" />
            <span className="text-sm font-bold text-white">
              +250 <span className="text-slate-400 font-medium">عميل سعيد</span>
            </span>
            <div className="hidden sm:block w-px h-6 bg-white/12" aria-hidden="true" />
            <span className="text-sm font-bold text-white">
              تقارير <span className="text-slate-400 font-medium">أسبوعية شفافة</span>
            </span>
          </motion.div>
        </div>

        {/* ===== Visual ===== */}
        <div className="order-2 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
          {/* Radar rings */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="relative w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full">
              {[0, 1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-white/6"
                  style={{ margin: `${ring * 34}px` }}
                />
              ))}
              {/* Sweep */}
              <div
                className="radar-sweep absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(237,155,47,0.16), rgba(237,155,47,0.03) 22%, transparent 34%)",
                }}
              />
              {/* Cross lines */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
                <div className="absolute top-1/2 right-0 left-0 h-px bg-white/5" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brass-400 shadow-[0_0_16px_rgba(237,155,47,0.9)]" />
            </div>
          </div>

          {/* Route path */}
          <svg
            className="absolute inset-x-0 bottom-16 w-full h-[220px] pointer-events-none"
            viewBox="0 0 400 220"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 20 200 C 90 120, 150 90, 210 74"
              stroke="rgba(255,217,138,0.35)"
              strokeWidth="2"
              className="route-dash"
            />
            <circle cx="20" cy="200" r="5" fill="#f7b955" />
            <circle cx="20" cy="200" r="10" fill="rgba(247,185,85,0.25)" />
            <circle cx="210" cy="74" r="4" fill="#ffd98a" />
          </svg>

          {/* Floating chip: growth */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-2 right-0 sm:top-8 sm:right-4 z-20"
          >
            <div className="animate-float-slow glass-dark rounded-2xl px-4 py-3 shadow-card flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brass-400 to-brass-600 flex items-center justify-center text-night-950">
                <TrendingUp className="w-4.5 h-4.5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-none text-brass-300">+300%</p>
                <p className="text-[11px] font-bold text-slate-300 mt-1">نمو الظهور المحلي</p>
              </div>
            </div>
          </motion.div>

          {/* Floating chip: calls */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute bottom-10 left-0 sm:bottom-16 sm:left-4 z-20"
          >
            <div
              className="animate-float-slow glass-dark rounded-2xl px-4 py-3 shadow-card flex items-center gap-3"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="w-9 h-9 rounded-xl bg-mint-500 flex items-center justify-center text-white">
                <Phone className="w-4.5 h-4.5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-none text-mint-400">+500</p>
                <p className="text-[11px] font-bold text-slate-300 mt-1">مكالمة شهرياً من الخريطة</p>
              </div>
            </div>
          </motion.div>

          {/* Local pack card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] as const }}
            className="relative z-10 w-full max-w-[340px] sm:max-w-[380px]"
          >
            <div className="glass-dark rounded-[26px] p-5 sm:p-6 shadow-[0_30px_80px_-20px_rgba(4,7,14,0.9)]">
              {/* Search pill */}
              <div className="flex items-center gap-2.5 bg-night-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 mb-4">
                <Search className="w-4 h-4 text-brass-400 shrink-0" aria-hidden="true" />
                <div className="relative h-5 overflow-hidden flex-1 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={searchIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="text-xs font-bold text-slate-300 whitespace-nowrap"
                    >
                      {SEARCH_SUGGESTIONS[searchIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Business header */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brass-400 to-brass-600 flex items-center justify-center text-night-950 shrink-0 shadow-[0_8px_20px_-6px_rgba(237,155,47,0.6)]">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-white truncate">نشاطك التجاري هنا</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex text-brass-400" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-brass-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-300">4.9</span>
                    <span className="text-[11px] text-slate-500">· +250 مراجعة</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-bold text-mint-400 bg-mint-500/12 border border-mint-500/25 rounded-full px-2.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse-soft" />
                    مفتوح الآن
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 space-y-2.5 text-[12px] text-slate-300 font-medium">
                <p className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                  في المقدمة حيث يبحث عنك عملاؤك
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                  <span dir="ltr">+20 155 467 1424</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                  ظهور مستمر في النتائج المحلية
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a
                  href={buildWhatsAppLink("مرحباً، أريد معرفة خطط وضع نشاطي في المقدمة 📍")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brass-600 to-brass-500 text-night-950 text-xs font-extrabold px-3 py-2.5 hover:brightness-110 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  الموقع
                </a>
                <a
                  href={buildWhatsAppLink("مرحباً، أريد الاتصال لحجز استشارة 🙏")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl glass-dark text-white text-xs font-extrabold px-3 py-2.5 hover:bg-white/12 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  اتصال
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
