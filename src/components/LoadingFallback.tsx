import { motion } from "framer-motion";
import Logo from "./Logo";

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingFallback({ message = "جاري تحميل الصفحة بذكاء...", fullScreen = true }: LoadingFallbackProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4"
    : "w-full min-h-[300px] bg-slate-50/40 rounded-3xl border border-slate-100 flex flex-col items-center justify-center p-6";

  return (
    <div id="loading-fallback-container" className={containerClasses} dir="rtl">
      {/* Decorative ambient background glows for full screen */}
      {fullScreen && (
        <>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="relative flex flex-col items-center max-w-sm text-center">
        {/* Pulsing ring behind the logo */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/5 border border-primary/10"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-accent/5 border border-accent/10"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <div className="relative transform hover:scale-105 transition-transform">
            <Logo size={48} animated={true} light={false} />
          </div>
        </div>

        {/* Loading text with shimmer */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-black text-slate-850 tracking-tight mb-2"
        >
          {message}
        </motion.h3>

        {/* Subtle customized message */}
        <p className="text-xs text-slate-500 font-medium mb-5 max-w-xs leading-relaxed">
          نعمل على تسريع ظهور الملفات التجارية وحملات الإعلانات لنجاح مشروعك 🚀
        </p>

        {/* Custom premium sliding progress bar */}
        <div className="w-40 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
