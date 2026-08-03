import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  animated?: boolean;
  light?: boolean;
  showSubtext?: boolean;
}

export default function Logo({ size = 36, animated = true, light = false }: LogoProps) {
  return (
    <motion.div
      className="flex items-center gap-2 sm:gap-2.5 md:gap-3 select-none cursor-pointer group shrink-0"
      initial={animated ? { opacity: 0, x: 10 } : false}
      animate={{ opacity: 1, x: 0 }}
      whileHover="hover"
      dir="rtl"
    >
      {/* 3D Map Pin Graphic */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Soft ambient glow behind the pin */}
        <div
          className="absolute inset-0 -m-2 rounded-full bg-blue-500/25 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />
        <svg
          width={size}
          height={size * 1.12}
          viewBox="0 0 54 60"
          fill="none"
          aria-hidden="true"
          className="drop-shadow-[0_6px_14px_rgba(37,99,235,0.45)] transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
        >
          <defs>
            <linearGradient id="pinBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="arrowGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
            <filter id="shadowPin" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" floodColor="#0F172A" />
            </filter>
          </defs>

          {/* Main Map Pin Base */}
          <path
            d="M 27 4 C 14.3 4 4 14.3 4 27 C 4 39.5 18.5 52 27 58 C 35.5 52 50 39.5 50 27 C 50 14.3 39.7 4 27 4 Z"
            fill="url(#pinBodyGrad)"
            filter="url(#shadowPin)"
          />

          {/* Globe Latitude & Longitude Mesh Grid */}
          <path d="M 12 18 C 20 27, 34 27, 42 18" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
          <path d="M 8 27 C 18 38, 36 38, 46 27" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
          <path d="M 15 37 C 21 44, 33 44, 39 37" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
          <path d="M 27 4 C 18 20, 18 38, 27 58" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
          <path d="M 27 4 C 36 20, 36 38, 27 58" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />

          {/* Orange Top-Left Shoulder Dot */}
          <circle cx="10" cy="15" r="4.5" fill="#F97316" />

          {/* Diagonal Growth Arrow piercing through pin */}
          <motion.g variants={{ hover: { x: 2, y: -2, transition: { duration: 0.25 } } }}>
            <path d="M 14 44 L 45 11" stroke="url(#arrowGoldGrad)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 11 47 L 38 18" stroke="url(#arrowGoldGrad)" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
            <path d="M 33 11 L 46 10 L 45 23 L 40 17 Z" fill="url(#arrowGoldGrad)" />
          </motion.g>

          {/* White Navigation Compass Arrow at bottom tip */}
          <path d="M 27 47 L 23 53 L 27 51 L 31 53 Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Typography Column */}
      <div className="flex flex-col text-right">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-none ${
              light ? "text-white" : "text-[#0F2942] group-hover:text-blue-600 transition-colors"
            }`}
            style={{ fontFamily: '"Cairo", "Montserrat", sans-serif' }}
          >
            دلّني
          </span>
        </div>
      </div>
    </motion.div>
  );
}
