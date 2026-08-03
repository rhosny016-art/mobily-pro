import { CheckCircle2, Sparkles } from "lucide-react";
import { ICON_MAP } from "@/lib/icons";
import WhatsAppButton from "./WhatsAppButton";
import TiltCard from "./TiltCard";
import type { Service } from "@/lib/siteData";

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
  );
}
