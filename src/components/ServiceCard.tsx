import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { ICON_MAP } from "@/lib/icons";
import WhatsAppButton from "./WhatsAppButton";
import type { Service } from "@/lib/siteData";

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = ICON_MAP[service.icon] || Sparkles;
  
  // Featured cards have a static accent (orange) border, others have standard borders that glow on hover
  const borderClass = service.featured
    ? "border-[#F97316]/50 shadow-md group-hover:border-[#F97316] group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.18)]"
    : "border-slate-100 group-hover:border-blue-500/40 shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,102,204,0.15)]";

  return (
    <motion.div
      id={`service-card-${service.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
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

        <div className="mt-auto flex items-center gap-3 z-10">
          <WhatsAppButton serviceTitle={service.title} size="sm" className="flex-1" />
          <Link
            to={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm transition-all duration-300 group/link"
          >
            <span className="relative py-0.5">
              التفاصيل
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover/link:w-full" />
            </span>
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/link:-translate-x-1.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
