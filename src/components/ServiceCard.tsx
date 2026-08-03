import { CheckCircle2, Sparkles } from "lucide-react";
import { ICON_MAP } from "@/lib/icons";
import WhatsAppButton from "./WhatsAppButton";
import type { Service } from "@/lib/siteData";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] || Sparkles;

  return (
    <div
      id={`service-card-${service.id}`}
      className="relative group h-full transform-style-3d perspective-[1000px]"
    >
      <div className="relative h-full flex flex-col glass-card rounded-[24px] p-6 sm:p-8 transition-all duration-500 overflow-hidden glass-card-hover border-blue-500/20 group-hover:border-blue-500/50">
        
        {/* Animated Inner Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 group-hover:from-blue-500/20 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-colors duration-700 pointer-events-none" />
        
        <div 
          id={`decor-circle-${service.id}`}
          className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-blue-600/20 blur-[50px] transition-all duration-700 group-hover:scale-150 group-hover:bg-purple-600/30 pointer-events-none mix-blend-screen" 
        />

        {service.featured && (
          <span className="absolute top-6 left-6 bg-blue-600/20 text-blue-300 border border-blue-500/50 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.4)] z-10">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            الأكثر طلباً
          </span>
        )}

        <div className="relative w-16 h-16 mb-6 shrink-0 z-10 perspective-[500px]">
          <div className="relative w-full h-full rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-center text-blue-400 transition-all duration-500 group-hover:rotate-y-12 group-hover:-rotate-x-12 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            <Icon className="w-8 h-8" aria-hidden="true" />
          </div>
        </div>

        <h3 className="text-2xl font-black mb-3 text-white transition-colors duration-300 group-hover:text-blue-300 z-10 text-right drop-shadow-md">
          {service.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-[1.8] mb-6 flex-grow z-10 text-right font-medium">
          {service.short}
        </p>

        <ul className="space-y-3 mb-8 z-10 text-right">
          {service.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-gray-300 transition-all duration-300 group-hover:-translate-x-2 justify-end" dir="rtl">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1 shrink-0 transition-colors duration-300 group-hover:text-blue-400 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto z-10 w-full transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          <WhatsAppButton serviceTitle={service.title} size="md" className="w-full">
            طلب الخدمة التفصيلي
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
