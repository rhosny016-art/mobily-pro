import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MousePointerClick, MapPin, Smartphone, Star, Megaphone, Flag, CheckCircle2, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const MAP_STATIONS = [
  {
    id: "ads",
    title: "Google Ads Hub",
    subtitle: "حملات جوجل الإعلانية",
    stat: "+300%",
    statLabel: "عائد استثمار",
    icon: MousePointerClick,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/50",
    border: "border-blue-500/50",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    position: "lg:col-start-1 lg:col-end-5 lg:row-start-5",
    features: ["استهداف دقيق", "إدارة الميزانية الذكية"]
  },
  {
    id: "maps",
    title: "Google Maps Highway",
    subtitle: "تحسين خرائط و ملفات جوجل",
    stat: "+250",
    statLabel: "عملاء جدد شهرياً",
    icon: MapPin,
    color: "from-green-500 to-emerald-400",
    shadow: "shadow-emerald-500/50",
    border: "border-emerald-500/50",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    position: "lg:col-start-4 lg:col-end-8 lg:row-start-4",
    features: ["تصدر نتائج البحث المحلية", "زيادة الزيارات والمكالمات"]
  },
  {
    id: "social",
    title: "Social Media Trail",
    subtitle: "سناب شات، تيك توك، إنستغرام",
    stat: "10x",
    statLabel: "جذب الجيل الجديد",
    icon: Smartphone,
    color: "from-pink-500 to-purple-500",
    shadow: "shadow-purple-500/50",
    border: "border-purple-500/50",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    position: "lg:col-start-7 lg:col-end-11 lg:row-start-3",
    features: ["محتوى فيروسي جذاب", "حملات مؤثرين مستهدفة"]
  },
  {
    id: "reviews",
    title: "Review Valley",
    subtitle: "إدارة التقييمات و السمعة",
    stat: "4.9",
    statLabel: "نجوم (أكثر من 200 مراجعة)",
    icon: Star,
    color: "from-amber-400 to-yellow-500",
    shadow: "shadow-amber-500/50",
    border: "border-amber-500/50",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    position: "lg:col-start-3 lg:col-end-7 lg:row-start-2",
    features: ["بناء الثقة الرقمية", "الرد الاحترافي على العملاء"]
  },
  {
    id: "bazaar",
    title: "Services Bazaar",
    subtitle: "Other Digital Marketing Services",
    stat: "100%",
    statLabel: "النجاح الرقمي",
    icon: Megaphone,
    color: "from-indigo-400 to-blue-600",
    shadow: "shadow-indigo-500/50",
    border: "border-indigo-500/50",
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    position: "lg:col-start-9 lg:col-end-13 lg:row-start-1",
    features: ["تصميم هويات بصرية", "تطوير مواقع وتطبيقات"]
  }
];

export default function InteractiveAgencyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="network" ref={containerRef} className="relative py-24 md:py-32 bg-[#060b1a] overflow-hidden" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="رحلة النمو"
          title="خريطة الخدمات الاحترافية للنمو"
          subtitle="مسار استراتيجي متكامل يأخذك من نقطة البداية إلى القمة الرقمية، عبر محطات تسويقية مدروسة بعناية."
          light={true}
        />

        <div className="relative mt-20 md:mt-32">
          
          {/* Desktop SVG Road Map Background */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0" dir="ltr">
            <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none" className="overflow-visible">
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="roadGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              
              {/* Base Road */}
              <path 
                d="M 1100,700 C 900,700 900,550 700,550 C 500,550 500,400 300,400 C 100,400 100,200 100,100" 
                fill="none" 
                stroke="url(#roadGradient)" 
                strokeWidth="40" 
                strokeLinecap="round" 
                className="drop-shadow-2xl"
              />
              
              {/* Animated Progress Road */}
              <motion.path 
                d="M 1100,700 C 900,700 900,550 700,550 C 500,550 500,400 300,400 C 100,400 100,200 100,100" 
                fill="none" 
                stroke="url(#roadGlow)" 
                strokeWidth="6" 
                strokeLinecap="round"
                style={{ pathLength }}
                className="drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
              />
              
              {/* Dashed Center Line */}
              <path 
                d="M 1100,700 C 900,700 900,550 700,550 C 500,550 500,400 300,400 C 100,400 100,200 100,100" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2" 
                strokeDasharray="10 10" 
                strokeLinecap="round" 
              />
            </svg>
            
            {/* Start & End Labels for Road (Positioned for RTL layout, SVG is LTR) */}
            <div className="absolute bottom-[-40px] right-[50px] flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-full backdrop-blur-md shadow-lg" dir="rtl">
              <Flag className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold text-sm">بداية رحلتك</span>
            </div>
            
            <div className="absolute top-[-20px] left-[50px] flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/50 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.3)]" dir="rtl">
              <Rocket className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-black text-sm">النجاح الرقمي</span>
            </div>
          </div>

          {/* Grid Container for Cards */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-5 gap-8 lg:gap-4 min-h-[800px] items-center">
            
            {MAP_STATIONS.map((station, i) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative group ${station.position} flex flex-col justify-center`}
              >
                {/* Connector dot for desktop */}
                <div className="hidden lg:block absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20 border-2 border-slate-900" />
                
                <div className={`glass-card rounded-[24px] p-6 sm:p-8 border-2 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${station.border} ${station.shadow} bg-[#0b1225]/80`}>
                  
                  {/* Glowing Icon Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${station.color} shadow-lg text-white shrink-0`}>
                      <station.icon className="w-7 h-7" />
                    </div>
                    
                    {/* Floating Stat Badge */}
                    <div className={`px-4 py-2 rounded-xl ${station.bg} border ${station.border} flex flex-col items-center justify-center animate-float sm:w-auto w-full text-center`}>
                      <span className={`text-xl font-black ${station.text} leading-none mb-1 drop-shadow-md`}>{station.stat}</span>
                      <span className="text-xs text-gray-300 font-bold whitespace-nowrap">{station.statLabel}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2" dir="ltr">{station.title}</h3>
                    <p className="text-gray-400 text-sm font-bold mb-5 pb-5 border-b border-white/10">{station.subtitle}</p>
                    
                    <ul className="space-y-3">
                      {station.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${station.text}`} />
                          <span className="font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Interactive Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${station.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[24px] pointer-events-none`} />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Start/End indicators */}
          <div className="flex lg:hidden justify-between items-center mt-12 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold text-sm">البداية</span>
            </div>
            <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-4 opacity-50 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">النجاح</span>
              <Rocket className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
