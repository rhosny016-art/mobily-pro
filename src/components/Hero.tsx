import { motion } from "framer-motion";
import { ArrowLeft, Navigation, Phone, Search, Star } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { WA_DEFAULT, scrollToSection } from "../lib/site";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-white pt-[72px]">
      {/* backdrop decorations */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-24 right-[8%] h-96 w-96 rounded-full bg-brand-200/40 blur-[110px]" aria-hidden="true" />
      <div className="absolute top-40 left-[4%] h-80 w-80 rounded-full bg-accent-200/35 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-20">
        {/* ------------------------------------------------ copy */}
        <div className="flex flex-col items-start gap-7">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-xs font-extrabold text-brand-700 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            وكالة تسويق رقمي متكاملة — مصر والخليج
          </motion.span>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl font-black leading-[1.35] tracking-tight text-slate-900 text-balance sm:text-5xl sm:leading-[1.3] xl:text-[3.4rem] xl:leading-[1.25]"
          >
            نضع نشاطك التجاري على{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-l from-accent-500 via-accent-400 to-amber-400 bg-clip-text text-transparent">
                خريطة النجاح
              </span>
              <svg
                className="absolute -bottom-2 right-0 w-full"
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 9C60 3 160 3 216 8"
                  stroke="#F97316"
                  strokeOpacity="0.5"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="max-w-xl text-base leading-9 font-medium text-slate-500 sm:text-lg sm:leading-10"
          >
            نساعد الأنشطة التجارية على تصدّر نتائج البحث المحلي، وتحويل الظهور
            الرقمي إلى عملاء حقيقيين — عبر خرائط Google وحملات إعلانية مدروسة
            بعناية على كل المنصات.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-l from-emerald-500 to-green-500 px-7 text-base font-extrabold text-white shadow-[0_12px_35px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_45px_rgba(16,185,129,0.5)] active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              احجز استشارتك المجانية
            </a>
            <button
              onClick={() => scrollToSection("services")}
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 text-base font-extrabold text-slate-700 shadow-sm transition-all duration-300 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 active:scale-95"
            >
              استكشف خدماتنا
              <ArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
          </motion.div>

          {/* trust row */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1"
          >
            <div className="flex items-center">
              {["أ", "س", "م", "خ"].map((c, i) => (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-black text-white shadow ${
                    i !== 0 ? "-ms-3" : ""
                  } ${
                    ["bg-brand-600", "bg-emerald-500", "bg-accent-500", "bg-violet-500"][i]
                  }`}
                >
                  {c}
                </span>
              ))}
              <span className="ms-3 text-sm font-bold text-slate-600">
                انضم إلى <span className="font-black text-slate-900">+250</span> شريك نجاح
              </span>
            </div>
            <span className="hidden h-5 w-px bg-slate-200 sm:block" aria-hidden="true" />
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-600">
              <span className="flex text-amber-400" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </span>
              4.9 من +200 مراجعة
            </span>
          </motion.div>
        </div>

        {/* ------------------------------------------------ map visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[540px]"
        >
          {/* floating chips */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 right-2 z-20 hidden rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block"
          >
            <p className="text-lg font-black leading-none text-brand-600 ltr-nums">+300%</p>
            <p className="mt-1 text-[11px] font-bold text-slate-500">نمو الظهور المحلي</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="absolute -bottom-6 left-2 z-20 hidden rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block"
          >
            <p className="text-lg font-black leading-none text-emerald-500 ltr-nums">+500</p>
            <p className="mt-1 text-[11px] font-bold text-slate-500">مكالمة شهرية من الخريطة</p>
          </motion.div>

          {/* the map card */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_30px_80px_-20px_rgba(8,25,60,0.25)]">
            {/* search bar */}
            <div className="absolute inset-x-3 top-3 z-10 flex items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="flex-1 truncate text-[13px] font-bold text-slate-600">
                أفضل عيادة أسنان قريبة مني…
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">
                النتيجة الأولى: أنت
              </span>
            </div>

            {/* map svg */}
            <svg viewBox="0 0 440 330" className="block h-auto w-full" role="img" aria-label="خريطة توضيحية لظهور نشاطك التجاري في النتائج الأولى">
              <rect width="440" height="330" fill="#F3F7FB" />
              {/* city blocks */}
              <g fill="#E6EDF5">
                <rect x="24" y="60" width="86" height="60" rx="10" />
                <rect x="130" y="46" width="70" height="46" rx="10" />
                <rect x="250" y="58" width="96" height="58" rx="10" />
                <rect x="30" y="160" width="70" height="66" rx="10" />
                <rect x="130" y="180" width="60" height="50" rx="10" />
                <rect x="255" y="170" width="80" height="60" rx="10" />
                <rect x="150" y="255" width="90" height="52" rx="10" />
                <rect x="30" y="252" width="86" height="56" rx="10" />
              </g>
              {/* park + water */}
              <ellipse cx="380" cy="270" rx="66" ry="48" fill="#DCF3E5" />
              <path d="M352 -10 C 370 60, 418 90, 452 130 L 452 -10 Z" fill="#DCEEFB" />
              {/* roads */}
              <g stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" fill="none">
                <path d="M0 140 H440" />
                <path d="M120 0 V330" />
                <path d="M225 0 V330" />
                <path d="M0 240 H350" />
                <path d="M225 140 C 300 150, 340 110, 440 105" />
              </g>
              <g stroke="#CBD8E6" strokeWidth="1.6" strokeDasharray="8 8" fill="none">
                <path d="M0 140 H440" />
                <path d="M120 0 V330" />
                <path d="M225 0 V330" />
                <path d="M0 240 H350" />
              </g>
              {/* animated route to your business */}
              <path
                d="M40 300 C 90 280, 110 240, 160 215 C 195 198, 205 180, 208 160"
                fill="none"
                stroke="#3386FC"
                strokeWidth="4"
                strokeLinecap="round"
                className="route-dash"
              />
              {/* competitor pins */}
              {[
                { x: 78, y: 92 },
                { x: 300, y: 88 },
                { x: 300, y: 205 },
                { x: 74, y: 195 },
              ].map((p, i) => (
                <g key={i} opacity="0.55">
                  <circle cx={p.x} cy={p.y} r="9" fill="#94A3B8" />
                  <circle cx={p.x} cy={p.y} r="3.5" fill="#fff" />
                </g>
              ))}
              {/* your business pin */}
              <g transform="translate(208 152)">
                <circle className="pin-ring" r="16" fill="#F97316" opacity="0.5" />
                <circle className="pin-ring" style={{ animationDelay: "1.2s" }} r="16" fill="#F97316" opacity="0.5" />
                <path
                  d="M0 -34 C -13 -34 -22 -25 -22 -13 C -22 1 0 16 0 16 C 0 16 22 1 22 -13 C 22 -25 13 -34 0 -34 Z"
                  fill="#F97316"
                  stroke="#fff"
                  strokeWidth="3"
                />
                <circle cy="-14" r="7" fill="#fff" />
                <path d="M-3.5 -14 l 2.4 2.4 l 4.6 -4.8" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
              {/* pin label */}
              <g transform="translate(208 92)">
                <rect x="-72" y="-16" width="144" height="30" rx="15" fill="#0E1730" opacity="0.92" />
                <circle cx="-54" cy="-1" r="4" fill="#34D399" />
                <text x="8" y="4" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff" fontFamily="Cairo, sans-serif">
                  نشاطك التجاري — المركز الأول
                </text>
              </g>
            </svg>

            {/* business result card */}
            <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-slate-200/70 bg-white/95 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-sky-500 text-white shadow-md">
                    <Navigation className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-800">نشاطك التجاري</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      4.9
                      <span className="text-slate-400">(+200 مراجعة)</span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-600">
                        مفتوح الآن
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/30">
                    <Navigation className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
