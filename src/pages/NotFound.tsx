import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Compass, ArrowLeft } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";
import { EASE_OUT } from "@/lib/motion";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      <AuroraBackground
        orbs={[
          { className: "top-[15%] right-[10%] w-[420px] h-[420px]", color: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)" },
          { className: "bottom-[10%] left-[8%] w-[420px] h-[420px]", color: "radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)" },
        ]}
      />

      <div className="relative max-w-xl w-full text-center z-10">
        {/* Floating pin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="relative inline-flex mb-8"
        >
          <div className="absolute inset-0 rounded-[28px] bg-blue-500/25 blur-2xl animate-pulse-glow" aria-hidden="true" />
          <div className="relative w-24 h-24 rounded-[28px] bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center text-white shadow-[0_25px_60px_-15px_rgba(37,99,235,0.7)] border border-white/20 animate-float">
            <MapPin className="w-12 h-12 drop-shadow-lg" aria-hidden="true" />
          </div>
          <motion.div
            animate={{ rotate: [0, -12, 12, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            className="absolute -top-3 -left-3 w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xl border border-white/20"
            aria-hidden="true"
          >
            <Compass className="w-5 h-5" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
          className="font-display text-sm font-black uppercase tracking-[0.35em] text-blue-300"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65, ease: EASE_OUT }}
          className="mt-4 text-3xl font-black text-white sm:text-5xl [text-wrap:balance]"
        >
          يبدو أنك <span className="text-gradient">ضللت الطريق!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease: EASE_OUT }}
          className="mx-auto mt-5 max-w-md text-sm leading-8 text-slate-400 font-medium sm:text-base"
        >
          الصفحة التي تبحث عنها غير موجودة حالياً، لكن لا تقلق. نحن خبراء في وضع الأشياء على الخريطة
          وإعادة العملاء إلى المسار الصحيح.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.65, ease: EASE_OUT }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link to="/" className="btn-primary px-8 py-4 rounded-2xl text-base">
            العودة للرئيسية
          </Link>
          <Link to="/services" className="btn-ghost px-8 py-4 rounded-2xl text-base group">
            استكشف خدماتنا
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
