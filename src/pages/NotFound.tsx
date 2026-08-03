import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, SearchX } from "lucide-react";
import { usePageMeta } from "@/lib/usePageMeta";
import { MapCanvas } from "@/components/home/MapCanvas";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  usePageMeta("الصفحة غير موجودة");

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_45%,rgba(46,107,255,0.12),transparent_70%)]" />
        <MapCanvas className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
        {/* Floating pin */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-500/40" aria-hidden="true" />
          <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-aurora-600 shadow-glow-brand">
            <LogoMark className="h-14 w-14" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-mist-400"
        >
          <SearchX className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
          هذا الموقع غير موجود على الخريطة
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-mono text-[7rem] font-bold leading-none text-arc md:text-[10rem]"
          dir="ltr"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-2 max-w-md text-base leading-relaxed text-mist-400 md:text-lg"
        >
          يبدو أن الصفحة التي تبحث عنها انتقلت… أو أنها لم تكن على الخريطة من الأساس.
          لا تقلق — طريق العودة إلى الرئيسية ممهد بالكامل.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="btn-shine inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-brand-500 to-brand-600 px-8 py-4 font-display text-base font-bold text-white shadow-glow-brand transition-transform duration-300 hover:scale-[1.03]"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            العودة إلى الرئيسية
          </Link>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 py-4 font-display text-base font-bold text-mist-100 transition-colors hover:border-brand-400/40"
          >
            تصفح خدماتنا
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
