import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Sparkles, ArrowLeft, X, CheckCircle2, MapPin, Compass, Radio, Trophy
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface DigitalHub {
  id: string;
  name: string;
  country: string;
  region: "gulf" | "mena" | "global";
  clients: string;
  details: string;
  isCentral?: boolean;
  coords: { x: number; y: number };
  badgePos?: "top" | "bottom" | "left" | "right";
}

// Well-organized, realistic geographic coordinates inside safe bounds [150..650] on 800x800 canvas
const DIGITAL_HUBS: DigitalHub[] = [
  // --- المركز الرئيسي ---
  { 
    id: "amm", 
    name: "المقر الرئيسي", 
    country: "إدارة التغطية والتسويق",
    region: "global",
    clients: "+150 مشروع ناجح", 
    details: "المركز السحابي الرئيسي لوكالة دلّني للتسويق الرقمي المتكامل، لتنسيق استراتيجيات النجاح وتصدر المحركات والخرائط والإعلانات الممولة.",
    isCentral: true,
    coords: { x: 500, y: 450 },
    badgePos: "bottom"
  },

  // --- دول الخليج العربي ---
  { 
    id: "ruh", 
    name: "الرياض", 
    country: "السعودية",
    region: "gulf",
    clients: "+45 شركة نشطة", 
    details: "إدارة متكاملة لحملات النجاح الإعلانية، تحسين خرائط Google وصناعة المحتوى للشركات بالمملكة.", 
    coords: { x: 440, y: 410 },
    badgePos: "top"
  },
  { 
    id: "jed", 
    name: "جدة", 
    country: "السعودية",
    region: "gulf",
    clients: "+30 علامة تجارية", 
    details: "بناء الهويات البصرية والحلول التسويقية الميدانية لقطاع التجزئة والمطاعم بالمنطقة الغربية.", 
    coords: { x: 380, y: 460 },
    badgePos: "bottom"
  },
  { 
    id: "kwi", 
    name: "الكويت", 
    country: "الكويت",
    region: "gulf",
    clients: "+25 شريك نمو", 
    details: "استشارات التجارة الإلكترونية، تحسين نتائج المحركات Local SEO للشركات المحلية بالديرة.", 
    coords: { x: 480, y: 340 },
    badgePos: "top"
  },
  { 
    id: "dxb", 
    name: "دبي", 
    country: "الإمارات",
    region: "gulf",
    clients: "+35 مشروع قائم", 
    details: "حلول تقنية رائدة، توثيق الحسابات والأنشطة التجارية للمؤسسات المبتكرة بالإمارات.", 
    coords: { x: 560, y: 390 },
    badgePos: "right"
  },

  // --- الشرق الأوسط وشمال أفريقيا ---
  { 
    id: "egy", 
    name: "مصر", 
    country: "مصر",
    region: "mena",
    clients: "+60 مشروع نشط", 
    details: "مركز البرمجة والإنتاج الإبداعي وإدارة بروفايلات خرائط جوجل والحملات التسويقية بكافة المحافظات.", 
    coords: { x: 320, y: 400 },
    badgePos: "bottom"
  },
  { 
    id: "amm_jo", 
    name: "عَمّان", 
    country: "الأردن",
    region: "mena",
    clients: "+16 شركة", 
    details: "حلول إعلانية وتطوير البرمجيات للمتاجر الإلكترونية وشركات التكنولوجيا بالأردن.", 
    coords: { x: 390, y: 330 },
    badgePos: "top"
  },
  { 
    id: "bgd", 
    name: "بغداد", 
    country: "العراق",
    region: "mena",
    clients: "+14 مشروع", 
    details: "تسويق الأنشطة التجارية والتجارة الإلكترونية والظهور بالمحركات والخرائط بالعراق.", 
    coords: { x: 440, y: 280 },
    badgePos: "right"
  },
  { 
    id: "cas", 
    name: "المغرب", 
    country: "المغرب",
    region: "mena",
    clients: "+12 شركة", 
    details: "تقديم الاستشارات التسويقية والسوشيال ميديا للشركات والمتاجر في المغرب ودول المغارب.", 
    coords: { x: 190, y: 360 },
    badgePos: "left"
  },
  { 
    id: "tun", 
    name: "تونس", 
    country: "تونس",
    region: "mena",
    clients: "+10 شركات", 
    details: "تسويق محلي وتطوير الهويات التجارية للمؤسسات والمشاريع بجمهورية تونس.", 
    coords: { x: 260, y: 290 },
    badgePos: "top"
  },
  { 
    id: "ist", 
    name: "تركيا", 
    country: "تركيا",
    region: "mena",
    clients: "+15 شركة", 
    details: "خدمات تسويق وتوثيق الشركات الناشئة والعلامات المستهدفة للجمهور العربي والتركي.", 
    coords: { x: 360, y: 230 },
    badgePos: "top"
  },

  // --- أوروبا والعالم (Global) ---
  { 
    id: "lon", 
    name: "لندن", 
    country: "المملكة المتحدة",
    region: "global",
    clients: "+12 مؤسسة", 
    details: "إدارة وتسويق الأعمال الموجهة للجاليات العربية والاستثمارات الشرق أوسطية في بريطانيا.", 
    coords: { x: 220, y: 190 },
    badgePos: "top"
  },
  { 
    id: "fra", 
    name: "ألمانيا", 
    country: "ألمانيا",
    region: "global",
    clients: "+8 شركاء", 
    details: "استشارات تقنية وتسويق سحابي للعلامات التجارية العاملة في السوق الأوروبي.", 
    coords: { x: 290, y: 180 },
    badgePos: "top"
  },
  { 
    id: "nyc", 
    name: "أمريكا", 
    country: "أمريكا",
    region: "global",
    clients: "+10 مشاريع", 
    details: "ربط العلامات التجارية بالأسواق الأمريكية وتوسيع نطاق الحملات العابرة للقارات.", 
    coords: { x: 160, y: 270 },
    badgePos: "left"
  },
  { 
    id: "kul", 
    name: "ماليزيا", 
    country: "ماليزيا",
    region: "global",
    clients: "+9 مشاريع", 
    details: "تغطية تسويقية وتقنية للمشاريع والاستثمارات المتواجدة بدول جنوب شرق آسيا.", 
    coords: { x: 630, y: 510 },
    badgePos: "right"
  },
];

export default function InteractiveAgencyMap() {
  const [selectedHub, setSelectedHub] = useState<DigitalHub | null>(null);

  const centralHub = DIGITAL_HUBS.find(h => h.isCentral) || DIGITAL_HUBS[0];
  const otherHubs = DIGITAL_HUBS.filter(h => !h.isCentral);

  return (
    <section 
      id="network" 
      aria-label="خريطة النجاح للأنشطة التجارية"
      className="relative py-14 sm:py-20 lg:py-28 bg-[#030712] text-white overflow-hidden border-t border-slate-900"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] lg:w-[950px] h-[340px] sm:h-[650px] lg:h-[950px] bg-gradient-to-r from-amber-500/10 via-cyan-500/5 to-transparent rounded-full blur-[130px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="network-section-heading"
          eyebrow="خريطة نجاح الأنشطة التجارية 🏆"
          title="خريطة النجاح لتغطية الأنشطة التجارية والتسويقية"
          subtitle="وكالة تسويق رقمي متكاملة تقدم منظومة سحابية شاملة لتصدر الأنشطة التجارية وتفوقها في نتائج البحث والخرائط والحملات الإعلانية عبر مختلف الأسواق."
          light
        />

        {/* HIGH-END REALISTIC GLOBE CONTAINER */}
        <div 
          id="map-dashboard" 
          className="relative mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl bg-[#040914] border border-slate-800/90 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl"
        >
          {/* TOP HUD STATUS BAR */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-slate-200">
                خريطة نجاح الأنشطة التجارية <span className="text-amber-400 font-mono">((تغطية واقعية كاملة))</span>
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>مشاريع ناجحة 100%</span>
            </div>
          </div>

          {/* MAIN GLOBE CANVAS WRAPPER - BOUNDED & SPACED */}
          <div id="map-viewport" className="w-full max-w-[760px] aspect-square mx-auto relative flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            
            {/* REALISTIC HIGH-PRECISION VECTOR MAP & TERRAIN SVG */}
            <svg 
              viewBox="0 0 800 800" 
              className="w-full h-full block select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Oceanic Realistic Deep Radial Fill */}
                <radialGradient id="realisticOceanGrad" cx="50%" cy="46%" r="52%">
                  <stop offset="0%" stopColor="#0B172E" />
                  <stop offset="50%" stopColor="#071022" />
                  <stop offset="80%" stopColor="#040A17" />
                  <stop offset="100%" stopColor="#02050D" />
                </radialGradient>

                {/* Continental Terrain Realistic Gradient */}
                <linearGradient id="realisticLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#122543" />
                  <stop offset="50%" stopColor="#0E1C33" />
                  <stop offset="100%" stopColor="#081324" />
                </linearGradient>

                {/* Golden Coastal Outer Glow */}
                <linearGradient id="coastalGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.3" />
                </linearGradient>

                {/* Cyber Arc Connection Beam */}
                <linearGradient id="cyanArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                </linearGradient>

                {/* Topographic Dot Texture Pattern */}
                <pattern id="landTopoDots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.9" fill="#F59E0B" opacity="0.18" />
                  <circle cx="8" cy="8" r="0.7" fill="#38BDF8" opacity="0.12" />
                </pattern>

                <filter id="superGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Realistic Globe Sphere Base & Atmosphere Rim */}
              <circle cx="400" cy="400" r="372" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.2" filter="url(#superGlow)" />
              <circle cx="400" cy="400" r="360" fill="url(#realisticOceanGrad)" stroke="#1E293B" strokeWidth="2" opacity="0.98" />
              <circle cx="400" cy="400" r="360" fill="none" stroke="url(#coastalGlowGrad)" strokeWidth="1.5" opacity="0.65" />

              {/* Realistic Latitude & Longitude Orthographic Grid Lines */}
              <g stroke="#1E3A8A" strokeWidth="0.75" strokeDasharray="3,3" fill="none" opacity="0.45">
                <ellipse cx="400" cy="160" rx="240" ry="40" />
                <ellipse cx="400" cy="280" rx="330" ry="60" />
                <ellipse cx="400" cy="400" rx="360" ry="75" />
                <ellipse cx="400" cy="520" rx="330" ry="60" />
                <ellipse cx="400" cy="640" rx="240" ry="40" />
                <ellipse cx="400" cy="400" rx="120" ry="360" />
                <ellipse cx="400" cy="400" rx="240" ry="360" />
                <ellipse cx="400" cy="400" rx="310" ry="360" />
              </g>

              {/* REALISTIC DETAILED CONTINENT VECTOR GEOMETRY */}
              <g stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.5" fill="url(#realisticLandGrad)">
                
                {/* Europe & United Kingdom */}
                <path d="M 200,170 Q 215,150 230,165 Q 240,155 255,160 Q 280,150 300,165 Q 320,155 340,175 Q 360,170 380,185 Q 390,210 375,225 Q 350,235 330,220 Q 310,240 290,230 Q 270,220 250,235 Q 230,225 210,210 Q 195,190 200,170 Z" />
                
                {/* Iberian Peninsula & North Africa (Maghreb to Egypt) */}
                <path d="M 170,320 Q 200,300 240,290 Q 280,285 320,295 Q 360,310 390,340 Q 400,370 380,410 Q 350,430 310,425 Q 260,420 220,400 Q 180,380 165,350 Q 160,335 170,320 Z" />
                
                {/* Arabian Peninsula & Levant (Saudi Arabia, Oman, Gulf, Jordan, Iraq) */}
                <path d="M 380,330 Q 420,310 460,300 Q 500,315 540,340 Q 575,370 580,420 Q 570,470 530,490 Q 480,505 440,490 Q 400,470 385,430 Q 375,380 380,330 Z" />
                
                {/* Asia & Anatolia (Turkey, Mesopotamia, Iran to SE Asia) */}
                <path d="M 350,220 Q 400,200 460,210 Q 520,195 580,230 Q 640,260 670,320 Q 690,390 660,460 Q 620,530 570,540 Q 530,510 510,460 Q 490,410 460,380 Q 420,360 380,340 Q 360,300 350,220 Z" />
                
                {/* North & South Americas (West Side of Globe) */}
                <path d="M 100,220 Q 130,190 170,200 Q 190,230 180,270 Q 160,310 135,320 Q 110,300 95,260 Q 90,240 100,220 Z" />

              </g>

              {/* Realistic Topographic Dot Overlay across Continents */}
              <g stroke="none" fill="url(#landTopoDots)">
                <circle cx="400" cy="400" r="350" />
              </g>

              {/* Realistic Curved Connection Beams from Central Hub */}
              {otherHubs.map((hub) => {
                const isSelected = selectedHub?.id === hub.id;
                const midX = (centralHub.coords.x + hub.coords.x) / 2;
                const midY = (centralHub.coords.y + hub.coords.y) / 2 - 20;
                
                return (
                  <g key={`arc-group-${hub.id}`}>
                    <path
                      d={`M ${centralHub.coords.x},${centralHub.coords.y} Q ${midX},${midY} ${hub.coords.x},${hub.coords.y}`}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth={isSelected ? "3" : "1.5"}
                      strokeOpacity={isSelected ? "0.85" : "0.3"}
                      filter="url(#cyanGlow)"
                    />
                    <motion.path
                      d={`M ${centralHub.coords.x},${centralHub.coords.y} Q ${midX},${midY} ${hub.coords.x},${hub.coords.y}`}
                      fill="none"
                      stroke="url(#cyanArcGradient)"
                      strokeWidth={isSelected ? "2" : "1"}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <motion.circle
                      r="2.5"
                      fill="#38BDF8"
                      filter="url(#superGlow)"
                      animate={{
                        cx: [centralHub.coords.x, midX, hub.coords.x],
                        cy: [centralHub.coords.y, midY, hub.coords.y],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* OVERLAY INTERACTIVE PINS - PERFECTLY ORGANIZED & BOUNDED INSIDE MAP */}

            {/* CENTRAL MAIN HUB PIN: "عُمان والخليج" */}
            <motion.div
              id="central-hub-pin"
              className="absolute z-40 cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{
                left: `${(centralHub.coords.x / 800) * 100}%`,
                top: `${(centralHub.coords.y / 800) * 100}%`,
              }}
              onClick={() => setSelectedHub(centralHub)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-amber-500/40 animate-ping pointer-events-none" />

              <div className="relative flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.9)] border-2 border-amber-200">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
              </div>

              <div className="mt-1 bg-[#091222]/95 border-2 border-amber-400 text-amber-300 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-xl shadow-lg whitespace-nowrap backdrop-blur-md">
                {centralHub.name} (الرئيسي)
              </div>
            </motion.div>

            {/* REGIONAL CITY PINS - ELEGANTLY SPACED & NON-CLIPPING */}
            {otherHubs.map((hub) => {
              const isSelected = selectedHub?.id === hub.id;
              // Smart alignment to prevent text badges from clipping left/right edges on mobile
              const labelAlignClass = 
                hub.coords.x < 220 ? "left-0 translate-x-0" :
                hub.coords.x > 620 ? "right-0 translate-x-0" :
                "-translate-x-1/2 left-1/2";

              return (
                <div
                  key={`pin-node-${hub.id}`}
                  id={`pin-node-${hub.id}`}
                  className="absolute z-30 cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin"
                  style={{
                    left: `${(hub.coords.x / 800) * 100}%`,
                    top: `${(hub.coords.y / 800) * 100}%`,
                  }}
                  onClick={() => setSelectedHub(hub)}
                >
                  <div className={`relative flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 rounded-full transition-all shadow-md border ${
                    isSelected
                      ? "bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border-white shadow-[0_0_14px_rgba(245,158,11,0.9)] scale-110"
                      : "bg-slate-900 border-amber-400/90 hover:border-white hover:bg-amber-600"
                  }`}>
                    <MapPin className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${isSelected ? "text-slate-950" : "text-amber-400"}`} />
                  </div>

                  <div className={`absolute top-full mt-0.5 ${labelAlignClass} bg-[#070E1C]/95 border text-[8px] sm:text-[11px] font-bold px-1 sm:px-1.5 py-0.5 rounded shadow-md whitespace-nowrap backdrop-blur-sm pointer-events-none transition-all ${
                    isSelected
                      ? "border-amber-400 text-amber-300 font-black scale-105"
                      : "border-slate-800 text-slate-200 group-hover/pin:border-amber-400/80 group-hover/pin:text-amber-300"
                  }`}>
                    {hub.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM QUICK STATS FOOTER BAR */}
          <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>فروع ومواقع النجاح: <strong className="text-amber-300 font-bold">15 مدينة ناجحة</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>خريطة نجاح نشطة 24/7</span>
            </div>
          </div>
        </div>



        {/* DETAILED MODAL / CARD WHEN A HUB IS CLICKED */}
        <AnimatePresence>
          {selectedHub && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="mt-6 mx-auto max-w-2xl bg-slate-950/95 border border-amber-500/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-right"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-amber-300">
                      {selectedHub.isCentral ? "مركز النجاح الرئيسي — " : "مدينة النجاح — "} 
                      {selectedHub.name} ({selectedHub.country})
                    </h4>
                    <p className="text-xs text-slate-400">تغطية الأنشطة التجارية وتصدر نتائج الخرائط</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHub(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  aria-label="إغلاق التفاصيل"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">الأنشطة والشركاء الناجحون</p>
                  <p className="text-sm font-black text-amber-400">{selectedHub.clients}</p>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">المنطقة الجغرافية</p>
                  <p className="text-sm font-black text-cyan-300">{selectedHub.country}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {selectedHub.details}
              </p>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
                <a
                  href={buildWhatsAppLink(`مرحباً، أود الاستفسار عن خدمات النجاح والتسويق لفرع (${selectedHub.name} - ${selectedHub.country})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <span>تواصل مباشر مع فرع {selectedHub.name}</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
