import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { MapPin, Search, Star, Layers, Plus, Minus, ArrowUpRight, PhoneCall, Compass } from "lucide-react";

export default function GoogleMapVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalizing mouse positions between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics to normalized coordinates for buttery fluid motion
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 3D rotation values driven by spring coordinates (max 12deg tilt)
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  // Floating parallax translations for crystal badges (creates 3D layered depth)
  const badgeX = useTransform(springX, [-0.5, 0.5], [22, -22]);
  const badgeY = useTransform(springY, [-0.5, 0.5], [22, -22]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    
    // Normalize coordinates to [-0.5, 0.5]
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    // Smoothly spring back to flat resting state
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      id="google-map-visual-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-1 py-2 md:px-6 md:py-8 group/map-container cursor-pointer select-none"
      style={{ perspective: 1200 }}
    >
      {/* 4K Ultra-glossy Neon Backlight & Ambient Glow Aura (توهج نيون متعدد الأبعاد) */}
      <div className="absolute -inset-6 md:-inset-12 bg-gradient-to-tr from-[#0066CC]/40 via-[#8B5CF6]/30 to-[#10B981]/30 blur-[45px] md:blur-[65px] opacity-80 rounded-full pointer-events-none transition-all duration-700 group-hover/map-container:scale-105 group-hover/map-container:opacity-95" />
      <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-bl from-blue-600/25 via-violet-500/20 to-emerald-500/20 blur-[30px] md:blur-[45px] opacity-70 rounded-full pointer-events-none animate-pulse duration-[5000ms]" />
      <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 bg-blue-500/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      {/* 1. الشارة الطافية بالأعلى لليمين: "+300% ظهور محلي" (Luxury Crystal Glass Badge with Parallax) */}
      <motion.div
        style={{ x: badgeX, y: badgeY }}
        className="absolute -top-3 right-1 sm:right-4 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-slate-900/95 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] group-hover/map-container:shadow-[0_35px_70px_rgba(0,102,204,0.45)] px-2.5 md:px-5 py-1 md:py-3 border border-white/15 flex flex-col items-center justify-center min-w-[85px] md:min-w-[125px] transition-all duration-300"
          dir="rtl"
        >
          <div className="flex items-center gap-1 md:gap-1.5">
            <span className="text-xs md:text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.35)] leading-none">+300%</span>
            <ArrowUpRight className="w-2.5 h-2.5 md:w-4 md:h-4 text-emerald-400 animate-bounce" />
          </div>
          <span className="text-[7.5px] md:text-[10px] font-extrabold text-slate-300 tracking-wider mt-0.5 md:mt-1.5">ظهور وتصدر محلي</span>
        </motion.div>
      </motion.div>

      {/* 2. الشارة الطافية بالأسفل لليسار: "★ 4.9 متوسط التقييم" (Luxury Crystal Glass Badge with Parallax) */}
      <motion.div
        style={{ x: badgeX, y: badgeY }}
        className="absolute -bottom-3 left-1 sm:left-4 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="bg-slate-900/95 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] group-hover/map-container:shadow-[0_35px_70px_rgba(0,102,204,0.45)] px-2.5 md:px-5 py-1 md:py-3 border border-white/15 flex flex-col items-center justify-center min-w-[85px] md:min-w-[125px] transition-all duration-300"
          dir="rtl"
        >
          <div className="flex items-center gap-1 md:gap-1.5 justify-center">
            <Star className="w-3 h-3 md:w-4.5 md:h-4.5 text-amber-400 fill-[#F59E0B] drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <span className="text-xs md:text-lg font-black text-white leading-none">4.9</span>
          </div>
          <span className="text-[7.5px] md:text-[10px] font-extrabold text-slate-300 tracking-wider mt-0.5 md:mt-1.5">تقييمات معتمدة</span>
        </motion.div>
      </motion.div>

      {/* 3. الشارة الطافية الطويلة بالأسفل لليمين: "اتصالات ومكالمات مباشرة +500" - مخفية على شاشات الجوال لتفادي تداخل العناصر */}
      <motion.div
        style={{ x: badgeX, y: badgeY }}
        className="absolute -bottom-6 right-4 z-20 pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          className="bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] group-hover/map-container:shadow-[0_35px_70px_rgba(0,102,204,0.45)] px-5 py-3 border border-white/15 flex flex-col items-center justify-center transition-all duration-300"
          dir="rtl"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white leading-none">+500</span>
            <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 animate-pulse">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-slate-300 tracking-wider mt-1.5">مكالمات عملاء مباشرة</span>
        </motion.div>
      </motion.div>

      {/* Outer Glow Outline Wrap (حاوية بحدود نيون متوهجة ولمعان فائق مع دعم كامل لثلاثي الأبعاد والظل العائم) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{ 
          y: { duration: 0.8, delay: 0.3 },
          opacity: { duration: 0.8, delay: 0.3 },
          backgroundPosition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="relative rounded-[24px] p-[2px] shadow-[0_20px_40px_rgba(0,0,0,0.65)] group-hover/map-container:shadow-[0_55px_110px_rgba(0,102,204,0.42)] transition-all duration-500 z-10 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0,102,204,1) 0%, rgba(139,92,246,1) 25%, rgba(16,185,129,1) 50%, rgba(249,115,22,1) 75%, rgba(0,102,204,1) 100%)",
          backgroundSize: "300% 300%",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="w-full h-full rounded-[22px] bg-slate-950/95 overflow-hidden relative flex flex-col">
          {/* Shimmer sweep animation (تأثير لمعان معدني يمر بانتظام عبر الكرت) */}
          <motion.div
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none z-20"
            animate={{
              x: ['-100%', '250%']
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2.5
            }}
          />

          {/* Map Header with Glassmorphic design & Search Bar */}
          <div className="relative flex items-center justify-between px-3 md:px-5 py-2.5 md:py-4 bg-slate-900/60 backdrop-blur-md border-b border-white/10 z-10">
          {/* Compass Dial Indicator on the left */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-blue-400">
              <Compass className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin-slow" />
            </div>
          </div>

          {/* Luxury Search Bar Input */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-white/10 rounded-full px-2.5 py-1 md:px-4 md:py-2 w-28 sm:w-48 shadow-inner group/search hover:border-blue-500/40 transition-colors">
            <Search className="w-3 h-3 text-blue-400 shrink-0" />
            <span className="text-[8.5px] md:text-[10px] font-bold text-slate-400 tracking-wider truncate">بحث...</span>
          </div>

          {/* Current Location on the Right */}
          <div className="flex items-center gap-1.5 text-[9px] md:text-xs text-white font-extrabold" dir="rtl">
            <div className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-red-500"></span>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-white to-slate-200">الظهور النشط</span>
          </div>
        </div>

        {/* Body of the Map with high-contrast luxury dark styled elements */}
        <div className="relative h-[165px] sm:h-[310px] overflow-hidden bg-[#090D1F]">
          <svg viewBox="0 0 400 310" className="w-full h-full block object-cover" aria-hidden="true">
            <defs>
              {/* تدرج مائي للمحيط/البحيرة (أزرق نيون داكن غني باللمعان) */}
              <linearGradient id="waterGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="40%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              {/* تدرج للحدائق والمناطق الخضراء (أخضر زمردي عميق متوهج) */}
              <linearGradient id="parkGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064E3B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#022C22" stopOpacity="0.9" />
              </linearGradient>
              {/* تدرج للمناطق السكنية والمباني الفاتحة المضيئة بلمعان */}
              <linearGradient id="urbanGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              {/* فلتر ظلال خفيف للمباني والملصقات */}
              <filter id="softShadowDark" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
              </filter>
              {/* نمط شبكي ناعم للغاية للطرق الفرعية والشبكة */}
              <pattern id="mapGridDark" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1E293B" strokeWidth="0.8" opacity="0.4" />
              </pattern>
            </defs>

            {/* الخلفية الأساسية للخريطة */}
            <rect width="400" height="310" fill="#0B0F24" />
            
            {/* الشبكة الهندسية الفاخرة */}
            <rect width="400" height="310" fill="url(#mapGridDark)" />

            {/* كتل المباني الحضرية المصممة بظلال ناعمة */}
            <rect x="15" y="15" width="100" height="65" rx="14" fill="url(#urbanGradDark)" filter="url(#softShadowDark)" stroke="#1E293B" strokeWidth="1" />
            <rect x="290" y="20" width="95" height="70" rx="14" fill="url(#urbanGradDark)" filter="url(#softShadowDark)" stroke="#1E293B" strokeWidth="1" />
            <rect x="20" y="210" width="110" height="65" rx="14" fill="url(#urbanGradDark)" filter="url(#softShadowDark)" stroke="#1E293B" strokeWidth="1" />
            <rect x="280" y="220" width="105" height="60" rx="14" fill="url(#urbanGradDark)" filter="url(#softShadowDark)" stroke="#1E293B" strokeWidth="1" />

            {/* مجرى مائي أنيق يتوسط الخريطة بلون أزرق نيون ممتع */}
            <path d="M-10,50 Q70,55 100,90 T160,150 T230,180 T320,220 T410,240" fill="none" stroke="url(#waterGradDark)" strokeWidth="26" strokeLinecap="round" opacity="0.9" />
            <path d="M-10,50 Q70,55 100,90 T160,150 T230,180 T320,220 T410,240" fill="none" stroke="#2563EB" strokeWidth="12" strokeLinecap="round" opacity="0.4" />
            <path d="M-10,50 Q70,55 100,90 T160,150 T230,180 T320,220 T410,240" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

            {/* حدائق غناء بمساحات خضراء هادئة */}
            <path d="M 230,70 C 260,50 310,60 300,100 C 290,120 250,120 230,100 C 210,80 210,70 230,70 Z" fill="url(#parkGradDark)" filter="url(#softShadowDark)" />
            <ellipse cx="65" cy="235" rx="45" ry="25" fill="url(#parkGradDark)" filter="url(#softShadowDark)" />
            <circle cx="345" cy="245" r="20" fill="url(#parkGradDark)" filter="url(#softShadowDark)" />

            {/* شبكة الطرق الراقية والحديثة المضيئة كشرايين طاقة */}
            {/* طريق أفقي رئيسي */}
            <path d="M -10,135 L 410,135" stroke="#1E293B" strokeWidth="18" />
            <path d="M -10,135 L 410,135" stroke="#0F172A" strokeWidth="12" />

            {/* طريق عمودي رئيسي */}
            <path d="M 180,-10 L 180,330" stroke="#1E293B" strokeWidth="16" />
            <path d="M 180,-10 L 180,330" stroke="#0F172A" strokeWidth="10" />

            {/* طريق أفقي فرعي */}
            <path d="M -10,215 L 410,215" stroke="#1E293B" strokeWidth="14" />
            <path d="M -10,215 L 410,215" stroke="#0F172A" strokeWidth="8" />

            {/* طريق عمودي فرعي */}
            <path d="M 75,-10 L 75,330" stroke="#1E293B" strokeWidth="12" />
            <path d="M 75,-10 L 75,330" stroke="#0F172A" strokeWidth="6" />

            {/* خطوط الطرق المتقطعة المضيئة باللون الذهبي الدافئ */}
            <path d="M -10,135 L 410,135" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.6" />
            <path d="M 180,-10 L 180,330" stroke="#10B981" strokeWidth="1.2" strokeDasharray="10 8" opacity="0.6" />

            {/* دوائر النطاق الجغرافي للظهور المحلي (تأثير راداري نيون رائع) */}
            <circle cx="232" cy="114" r="35" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
            <circle cx="232" cy="114" r="65" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
            <circle cx="232" cy="114" r="100" fill="none" stroke="#10B981" strokeWidth="0.8" strokeDasharray="8 8" opacity="0.2" />

            {/* مسار الحركة المضيء والنابض بالنمو المتسارع */}
            <motion.path
              d="M 75,235 C 120,230 160,200 200,160 C 240,120 290,100 340,65"
              fill="none"
              stroke="url(#routeGradientDark)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="10 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, strokeDashoffset: [0, -50] }}
              transition={{
                pathLength: { duration: 2.2, ease: "easeInOut" },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
              }}
            />
            <defs>
              <linearGradient id="routeGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          {/* 4K Ultra Glow Map Pin (الدبوس الأحمر المضيء ذو التوهج النيون والمظهر المجسم) */}
          <div className="absolute animate-bounce duration-[2000ms] top-[34%] right-[42%]">
            <span className="absolute inset-0 -m-6 rounded-full bg-red-500/35 blur-md animate-ping" />
            <span className="absolute inset-0 -m-3 rounded-full bg-red-500/20 blur-sm animate-ping" style={{ animationDelay: "0.5s" }} />
            <MapPin className="relative w-8 h-8 sm:w-10 sm:h-10 text-red-500 drop-shadow-[0_8px_20px_rgba(239,68,68,0.65)]" fill="#EF4444" strokeWidth={1.5} aria-hidden="true" />
          </div>

          {/* Map Interactive Glass Controls (أزرار التحكم الزجاجية الفاخرة) */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 z-20">
            <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-md">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-md">
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20">
            <button className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-md">
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>أبعاد 4K ثلاثية</span>
            </button>
          </div>

          {/* Beautifully styled Map Label Badges */}
          
          {/* 1. المقر الرئيسي لشركتك */}
          <div className="absolute top-[16%] right-[22%] sm:top-[28%] sm:right-[30%]">
            <div className="bg-slate-950/95 border border-emerald-500/35 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-extrabold text-white shadow-[0_10px_25px_rgba(16,185,129,0.25)] flex items-center gap-1 sm:gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>مقر نشاطك المتصدر</span>
            </div>
          </div>

          {/* 2. القاهرة، مصر */}
          <div className="absolute hidden sm:block" style={{ top: "12%", right: "14%" }}>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <MapPin className="w-7 h-7 text-blue-400 drop-shadow-[0_4px_10px_rgba(59,130,246,0.5)]" fill="#2563EB" strokeWidth={1.5} aria-hidden="true" />
              <div className="mt-1 bg-slate-950/80 border border-white/10 px-2 py-1 rounded text-[8px] font-black text-slate-200 whitespace-nowrap shadow-md backdrop-blur-md">
                القاهرة، مصر
              </div>
            </motion.div>
          </div>

          {/* 3. الجيزة */}
          <div className="absolute hidden sm:block" style={{ bottom: "25%", left: "16%" }}>
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <MapPin className="w-7 h-7 text-emerald-400 drop-shadow-[0_4px_10px_rgba(16,185,129,0.5)]" fill="#059669" strokeWidth={1.5} aria-hidden="true" />
              <div className="mt-1 bg-slate-950/80 border border-white/10 px-2 py-1 rounded text-[8px] font-black text-slate-200 whitespace-nowrap shadow-md backdrop-blur-md">
                المهندسين، الجيزة
              </div>
            </motion.div>
          </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
