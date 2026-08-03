import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ICON_MAP } from "@/lib/icons";
import WhatsAppButton from "./WhatsAppButton";
import TiltCard from "./TiltCard";
import type { Service } from "@/lib/siteData";

<<<<<<< HEAD
export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = ICON_MAP[service.icon] || Sparkles;
  
  // Featured cards have a static accent (orange) border, others have standard borders that glow on hover
  const borderClass = service.featured
    ? "border-[#F97316]/50 shadow-md group-hover:border-[#F97316] group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.18)]"
    : "border-slate-100 group-hover:border-blue-500/40 shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,102,204,0.15)]";

  return (
    <motion.div
      id={`service-card-${service.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="relative group h-full"
    >
      {/* توهّج الحدود الملوّن (Gradient Glow Border) */}
      <div 
        id={`glow-border-${service.id}`}
        className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-l from-[#0066CC] via-[#F97316] to-[#10B981] opacity-0 group-hover:opacity-70 blur-[3px] transition-all duration-500 pointer-events-none scale-[1.01]" 
      />

      <div className={`relative h-full flex flex-col bg-white rounded-[24px] border p-5 sm:p-7 transition-all duration-500 overflow-hidden ${borderClass}`}>
        
        {/* خلفية تفاعلية ناعمة تتوهج عند التقريب */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-white group-hover:via-slate-50/40 group-hover:to-blue-500/[0.03] transition-all duration-500 pointer-events-none" />

        {/* توسّع دائرة الزينة في الزاوية */}
        <div 
          id={`decor-circle-${service.id}`}
          className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-gradient-to-br from-blue-500/15 via-emerald-500/10 to-amber-500/15 blur-2xl transition-all duration-700 group-hover:scale-175 group-hover:opacity-90 pointer-events-none" 
        />

        {service.featured && (
          <span className="absolute top-4 left-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg z-10">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            الأكثر طلباً
          </span>
        )}

        {/* تأثير الأيقونة */}
        <div className="relative w-14 h-14 mb-5 shrink-0 z-10">
          {/* حلقة نبضية تظهر عند المرور بالماوس فقط */}
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-all duration-300" />
          
          {/* ترتفع وتتدوّر 6 درجات مع تكبير 110% عند المرور */}
          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1">
            <Icon className="w-7 h-7" aria-hidden="true" />
          </div>
        </div>

        {/* تغيّر لون العنوان */}
        <h3 className="text-xl font-extrabold mb-2 text-gray-900 transition-colors duration-300 group-hover:text-blue-600 z-10 text-right">
          {service.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow z-10 text-right">
          {service.short}
        </p>

        <ul className="space-y-2 mb-6 z-10 text-right">
          {service.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-gray-700 transition-all duration-300 group-hover:-translate-x-1 justify-end" dir="rtl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 transition-colors duration-300 group-hover:text-blue-500" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-3 z-10 w-full">
          <WhatsAppButton serviceTitle={service.title} size="sm" className="w-full" />
        </div>
      </div>
    </motion.div>
=======
const ACCENTS: Record<string, { tile: string; glow: string; icon: string }> = {
  blue: {
    tile: "from-blue-500 to-indigo-600",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.7)]",
    icon: "text-blue-300",
  },
  violet: {
    tile: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.7)]",
    icon: "text-violet-300",
  },
  emerald: {
    tile: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.7)]",
    icon: "text-emerald-300",
  },
  amber: {
    tile: "from-amber-500 to-orange-600",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.7)]",
    icon: "text-amber-300",
  },
  pink: {
    tile: "from-pink-500 to-rose-600",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(244,114,182,0.7)]",
    icon: "text-pink-300",
  },
  cyan: {
    tile: "from-cyan-500 to-sky-600",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.7)]",
    icon: "text-cyan-300",
  },
};

const ACCENT_ORDER = ["blue", "violet", "emerald", "amber", "pink", "cyan"];

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = ICON_MAP[service.icon] || Sparkles;
  const accent = ACCENTS[ACCENT_ORDER[index % ACCENT_ORDER.length]] || ACCENTS.blue;

  return (
    <div id={`service-card-${service.id}`} className="relative group h-full">
      <TiltCard maxTilt={8} scale={1.03} className="h-full">
        <div className="card-premium h-full flex flex-col rounded-[26px] p-6 sm:p-8 border-blue-500/10">
          {/* Animated inner gradient wash */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-violet-500/[0.05] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            aria-hidden="true"
          />
          {/* Corner glow */}
          <div
            className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-blue-600/15 blur-[70px] transition-all duration-700 group-hover:scale-150 group-hover:bg-violet-600/25 pointer-events-none mix-blend-screen"
            aria-hidden="true"
          />

          {service.featured && (
            <span className="absolute top-5 left-5 z-20 inline-flex items-center gap-1.5 bg-gradient-to-l from-amber-500/20 to-orange-500/10 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_20px_-4px_rgba(245,158,11,0.5)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              الأكثر طلباً
            </span>
          )}

          {/* Icon tile with 3D depth */}
          <div className="relative w-16 h-16 mb-6 shrink-0 z-10" style={{ transform: "translateZ(28px)" }}>
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent.tile} opacity-25 blur-md group-hover:opacity-60 transition-opacity duration-500`}
              aria-hidden="true"
            />
            <div
              className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${accent.tile} flex items-center justify-center text-white border border-white/25 shadow-xl transition-all duration-500 group-hover:-translate-y-1.5 group-hover:rotate-3 ${accent.glow}`}
            >
              <Icon className="w-8 h-8 drop-shadow-md" aria-hidden="true" />
            </div>
          </div>

          <h3
            className="text-[1.35rem] font-black mb-3 text-white transition-colors duration-300 group-hover:text-blue-200 z-10 text-right leading-snug"
            style={{ transform: "translateZ(22px)" }}
          >
            {service.title}
          </h3>

          <p className="text-slate-400 text-sm leading-[1.85] mb-6 flex-grow z-10 text-right font-medium">
            {service.short}
          </p>

          <ul className="space-y-3 mb-8 z-10 text-right">
            {service.benefits.slice(0, 3).map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-sm text-slate-300 transition-transform duration-300 group-hover:-translate-x-1 justify-end"
                dir="rtl"
              >
                <CheckCircle2
                  className="w-4.5 h-4.5 text-emerald-400 mt-0.5 shrink-0 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                  aria-hidden="true"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto z-10 w-full">
            <WhatsAppButton serviceTitle={service.title} size="md" className="w-full">
              طلب الخدمة التفصيلي
            </WhatsAppButton>
          </div>
        </div>
      </TiltCard>
    </div>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
  );
}
