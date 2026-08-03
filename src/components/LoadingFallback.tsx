import { motion } from "framer-motion";
import Logo from "./Logo";

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingFallback({
  message = "جاري تحميل الصفحة بذكاء...",
  fullScreen = true,
}: LoadingFallbackProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-[#030712] z-[100] flex flex-col items-center justify-center p-4"
    : "w-full min-h-[320px] bg-[#05081c]/60 rounded-3xl border border-white/[0.06] flex flex-col items-center justify-center p-6";

  return (
    <div id="loading-fallback-container" className={containerClasses} dir="rtl">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-600/15 blur-[110px] pointer-events-none animate-pulse-glow" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/15 blur-[110px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} aria-hidden="true" />
      {fullScreen && <div className="noise-overlay" aria-hidden="true" />}

      <div className="relative flex flex-col items-center max-w-sm text-center">
        {/* Logo with pulsing rings */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-7">
          <motion.div
            className="absolute inset-0 rounded-full border border-blue-400/20"
            animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0.1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-violet-400/15"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 rounded-full ring-conic opacity-40" aria-hidden="true" />
          <div className="relative">
            <Logo size={46} animated light />
          </div>
        </div>

        {/* Loading message */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-black text-white tracking-tight mb-2"
        >
          {message}
        </motion.h3>

        <p className="text-xs text-slate-500 font-medium mb-6 max-w-xs leading-relaxed">
          نعمل على تسريع ظهور الملفات التجارية وحملات الإعلانات لنجاح مشروعك 🚀
        </p>

        {/* Premium gradient progress bar */}
        <div className="w-44 h-1.5 bg-white/[0.06] rounded-full overflow-hidden border border-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-l from-blue-500 via-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.7)]"
            initial={{ x: "120%" }}
            animate={{ x: "-120%" }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
