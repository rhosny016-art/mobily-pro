import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Compass, Plus, Minus, Sparkles,
  Video, MessageSquare, Globe, TrendingUp, PhoneCall, Zap, ShieldCheck
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

interface DigitalHub {
  id: string;
  name: string;
  clients: string;
  details: string;
  coords: { x: number; y: number };
}

const DIGITAL_HUBS: DigitalHub[] = [
  { id: "ruh", name: "الرياض، السعودية", clients: "+45 شركة نشطة", details: "إدارة متكاملة للحملات الإعلانية وصناعة المحتوى للشركات بالمملكة.", coords: { x: 430, y: 175 } },
  { id: "dxb", name: "دبي، الإمارات", clients: "+30 مشروع قائم", details: "حلول تقنية رائدة وتطوير واجهات المستخدم للمؤسسات المبتكرة.", coords: { x: 510, y: 135 } },
  { id: "jed", name: "جدة، السعودية", clients: "+25 علامة تجارية", details: "بناء الهويات البصرية والحلول التسويقية لقطاع التجزئة والأغذية.", coords: { x: 390, y: 235 } },
  { id: "kwi", name: "الكويت", clients: "+15 شريك نمو", details: "استشارات التجارة الإلكترونية وتحسين محركات البحث للعلامات المحلية.", coords: { x: 450, y: 95 } },
  { id: "amm", name: "عمان، الأردن", clients: "+20 شركة ريادية", details: "دعم إنتاج المحتوى الرقمي المبتكر والتسويق عبر المؤثرين.", coords: { x: 310, y: 115 } },
];

export default function InteractiveAgencyMap() {
  const [selectedHub, setSelectedHub] = useState<DigitalHub | null>(null);
  const [zoom, setZoom] = useState(1);
  const [activePinDetail, setActivePinDetail] = useState(true);

  const agencyCoords = { x: 210, y: 145 }; // Cairo center

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setSelectedHub(null);
  };

  return (
    <section id="network" className="relative scroll-mt-24 py-20 md:py-28 bg-[#090D16] text-white overflow-hidden" dir="rtl">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[150px] pointer-events-none" />

      {/* Futuristic Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#38BDF8 1px, transparent 1px),
            linear-gradient(90deg, #38BDF8 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          id="network-section-heading"
          eyebrow="شبكة أعمالنا الإقليمية"
          title="وكالة سحابية عابرة للحدود 🌐"
          subtitle="نعمل كمنظومة سحابية متكاملة وذكية تخدم عملائنا وشركاء نجاحنا في مختلف أرجاء الخليج والوطن العربي بأقصى إنتاجية وسرعة."
          light
        />

        <div id="map-dashboard" className="grid lg:grid-cols-12 gap-8 items-stretch pt-6 bg-slate-900/80 backdrop-blur-2xl p-4 sm:p-6 rounded-[32px] border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          
          {/* SIDEBAR: Hub Selector & Services (4 cols) */}
          <motion.div
            id="map-sidebar"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-between bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative z-10"
          >
            <div>
              <div id="cloud-info-badge" className="space-y-4 text-right">
                <div className="bg-gradient-to-br from-amber-500/15 via-blue-600/10 to-transparent border border-amber-500/30 rounded-2xl p-4.5 shadow-inner">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    <h4 className="text-sm font-black text-amber-300">منظومة سحابية بدون حدود</h4>
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    نُدير أعمالكم، حملاتكم، وهوياتكم الرقمية عبر الخليج ومصر بكل مرونة وتنسيق مباشر على مدار الساعة.
                  </p>
                </div>

                <div className="space-y-3">
                  <div id="session-card" className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Video className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-white">جلسات نمو بالفيديو</h5>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">لقاءات دورية عبر Zoom و Meet لتخطيط الحملات وتحليل النتائج.</p>
                    </div>
                  </div>

                  <div id="whatsapp-card" className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-white">دعم وتواصل فوري</h5>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">فريق مخصص لك على WhatsApp لإنجاز المهام بسرعة فائقة.</p>
                    </div>
                  </div>
                </div>

                {/* Regional Active Hubs List */}
                <div id="hubs-list-container" className="mt-5 pt-2">
                  <h5 className="text-[11px] font-black text-amber-400/80 uppercase tracking-wider mb-2.5">شركاؤنا وتواجدنا بالمنطقة:</h5>
                  <div className="space-y-2">
                    {DIGITAL_HUBS.map((hub) => {
                      const isSelected = selectedHub?.id === hub.id;
                      return (
                        <button
                          id={`hub-btn-${hub.id}`}
                          key={hub.id}
                          type="button"
                          onClick={() => {
                            setSelectedHub(hub);
                            setActivePinDetail(false);
                          }}
                          className={`w-full text-right p-3 rounded-xl border transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20"
                              : "bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-slate-950 animate-ping" : "bg-amber-400"}`} />
                            <span className="text-xs font-bold">{hub.name}</span>
                          </div>
                          <div className={`text-[10px] font-black ${isSelected ? "text-slate-950" : "text-amber-400"}`}>
                            <span>{hub.clients}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Hub Details Footer inside sidebar */}
            <div id="active-hub-detail" className="mt-5 pt-3 border-t border-slate-800/80 text-right">
              {selectedHub ? (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">تفاصيل التواجد الإقليمي</span>
                    <button
                      id="reset-hub-btn"
                      type="button"
                      onClick={handleReset}
                      className="text-[10px] font-bold text-amber-400 hover:underline"
                    >
                      إعادة تعيين
                    </button>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Zap className="w-4 h-4 fill-slate-950" />
                    </div>
                    <div className="text-xs">
                      <p className="font-extrabold text-white">
                        {selectedHub.name}
                      </p>
                      <p className="text-[10px] text-slate-300 font-medium mt-1">
                        {selectedHub.clients} • {selectedHub.details}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-1 text-xs text-slate-400 font-medium">
                  انقر على أي شريك بالخريطة لعرض تفاصيل التواجد السحابي.
                </div>
              )}
            </div>

          </motion.div>

          {/* MAIN MAP CANVAS (8 cols) */}
          <motion.div
            id="map-canvas-container"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-[#0D1527] border border-slate-800 rounded-2xl overflow-hidden relative min-h-[480px] flex flex-col shadow-2xl"
          >
            {/* Top Map Controls */}
            <div id="map-controls" className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-lg flex items-center gap-2">
              <button
                id="zoom-in-btn"
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-200 transition"
                title="تكبير"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                id="zoom-out-btn"
                onClick={handleZoomOut}
                className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-200 transition"
                title="تصغير"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                id="reset-zoom-btn"
                onClick={handleReset}
                className="px-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
                title="إعادة ضبط"
              >
                تصفير
              </button>
            </div>

            {/* Compass Badge */}
            <div id="compass-indicator" className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-700/80 shadow-lg pointer-events-none">
              <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
            </div>

            {/* Futuristic Tech Map Canvas */}
            <div id="map-viewport" className="w-full h-full relative overflow-hidden flex items-center justify-center flex-1 min-h-[390px]">
              
              <motion.div
                id="map-zoom-wrapper"
                animate={{ scale: zoom }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-[620px] h-[410px] relative origin-center shrink-0 cursor-grab active:cursor-grabbing"
              >
                <svg viewBox="0 0 620 410" className="w-full h-full block">
                  <defs>
                    {/* Glowing Arc Gradient */}
                    <linearGradient id="arcGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#EAB308" stopOpacity="0.95" />
                    </linearGradient>

                    <linearGradient id="cairoNodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>

                    <filter id="glowGss" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Dark Map Canvas Background */}
                  <rect width="620" height="410" fill="#0B132B" />

                  {/* Map Grid Dots */}
                  <g opacity="0.15">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 26} x2="620" y2={i * 26} stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" />
                    ))}
                    {Array.from({ length: 24 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * 26} y1="0" x2={i * 26} y2="410" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" />
                    ))}
                  </g>

                  {/* Stylized Continent Silhouette outlines */}
                  <path
                    d="M 100,80 Q 200,60 280,100 T 360,180 T 260,280 T 150,220 Z"
                    fill="#1C2541"
                    opacity="0.6"
                    filter="url(#glowGss)"
                  />
                  <path
                    d="M 320,110 Q 420,90 520,130 T 560,240 T 450,290 T 350,200 Z"
                    fill="#1C2541"
                    opacity="0.6"
                    filter="url(#glowGss)"
                  />

                  {/* Radiating Waves from Main Cairo Hub */}
                  <circle cx={agencyCoords.x} cy={agencyCoords.y} r="65" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  <circle cx={agencyCoords.x} cy={agencyCoords.y} r="110" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.25" />

                  {/* Glowing Connection Light Arcs */}
                  {DIGITAL_HUBS.map((hub) => {
                    const isSelected = selectedHub?.id === hub.id;
                    const midX = (agencyCoords.x + hub.coords.x) / 2;
                    const midY = (agencyCoords.y + hub.coords.y) / 2 - 45;
                    return (
                      <g key={`arc-group-${hub.id}`}>
                        <motion.path
                          id={`hub-path-${hub.id}`}
                          d={`M ${agencyCoords.x},${agencyCoords.y} Q ${midX},${midY} ${hub.coords.x},${hub.coords.y}`}
                          fill="none"
                          stroke="url(#arcGoldGrad)"
                          strokeWidth={isSelected ? "4" : "2.2"}
                          strokeLinecap="round"
                          filter="url(#glowGss)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: isSelected ? 1 : 0.7 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        {/* Animated Light Pulse travelling on the arc */}
                        <motion.circle
                          r="3"
                          fill="#FCD34D"
                          filter="url(#glowGss)"
                          animate={{
                            cx: [agencyCoords.x, midX, hub.coords.x],
                            cy: [agencyCoords.y, midY, hub.coords.y],
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

                {/* Regional Pins */}
                {DIGITAL_HUBS.map((hub) => {
                  const isSelected = selectedHub?.id === hub.id;
                  return (
                    <motion.button
                      id={`hub-pin-${hub.id}`}
                      key={hub.id}
                      type="button"
                      onClick={() => {
                        setSelectedHub(hub);
                        setActivePinDetail(false);
                      }}
                      whileHover={{ scale: 1.2 }}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        left: `${(hub.coords.x / 620) * 100}%`,
                        top: `${(hub.coords.y / 410) * 100}%`,
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full shadow-lg border transition-all ${
                          isSelected 
                            ? "bg-amber-500 border-amber-300 text-slate-950 ring-4 ring-amber-500/30 scale-110" 
                            : "bg-slate-900 border-amber-500/60 text-amber-400 hover:bg-slate-800"
                        }`}>
                          <Globe className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                        <div className="mt-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2 py-0.5 rounded-lg shadow-md text-[9px] font-black text-amber-300 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                          {hub.name}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}

                {/* Main Cairo Hub Pin */}
                <motion.div
                  id="main-agency-pin"
                  className="absolute z-20 cursor-pointer"
                  style={{
                    left: `${(agencyCoords.x / 620) * 100}%`,
                    top: `${(agencyCoords.y / 410) * 100}%`,
                  }}
                  onClick={() => setActivePinDetail(prev => !prev)}
                  whileHover={{ scale: 1.15 }}
                >
                  {/* Glowing Rings */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-500/30 animate-ping pointer-events-none" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-400/20 animate-ping pointer-events-none" style={{ animationDelay: "0.5s" }} />

                  <div className="relative -translate-x-1/2 -translate-y-[85%] flex flex-col items-center">
                    <MapPin className="w-10 h-10 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" fill="#F59E0B" strokeWidth={1.5} />
                    
                    {/* Main Cairo Popup Info-Window */}
                    <AnimatePresence>
                      {activePinDetail && (
                        <motion.div
                          id="main-info-popup"
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-12 bg-slate-950/95 border border-amber-500/40 text-white rounded-2xl shadow-2xl p-4 min-w-[220px] text-right backdrop-blur-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                            <span className="text-[10px] font-black text-amber-400 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              المركز الإداري السحابي
                            </span>
                            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded text-[8px] font-black">
                              القاهرة — نشط 24/7
                            </span>
                          </div>
                          
                          <p className="text-xs font-black leading-relaxed text-white">منصة عمل سحابية عابرة للحدود</p>
                          <p className="text-[10px] text-slate-300 mt-1">ندير حملاتكم، نصمم أعمالكم، ونتواصل معكم لحظة بلحظة.</p>
                          
                          <div className="flex items-center gap-1 mt-2 text-[9px] text-amber-400 font-black">
                            <span>4.9 ★★★★★</span>
                            <span className="text-slate-400">(+200 مراجعة معتمدة)</span>
                          </div>

                          <div className="flex gap-2 mt-3 pt-2 border-t border-slate-800">
                            <a
                              id="free-consultation-btn"
                              href="https://wa.me/201115252874"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-[10px] py-2 px-2.5 rounded-xl text-center flex items-center justify-center gap-1 transition shadow-md"
                            >
                              <span>استشارة سحابية مجانية 🚀</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

              </motion.div>

            </div>

            {/* Glassmorphic Stats Row at the Bottom of Map */}
            <div id="map-bottom-glass-cards" className="p-4 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl grid sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">+300% نمو الظهور</div>
                  <div className="text-[10px] text-slate-400 font-medium">على خرائط جوجل بالمملكة</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">+5 دول عربية</div>
                  <div className="text-[10px] text-slate-400 font-medium">تغطية وإدارة تسويقية سحابية</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">إشارات مرجعية حقيقية</div>
                  <div className="text-[10px] text-slate-400 font-medium">توثيق وتحسين التقييمات</div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

