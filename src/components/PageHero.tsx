import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

/** Dark premium header for inner pages. */
export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-night-950 overflow-hidden">
      {/* Backdrop layers */}
      <div className="absolute inset-0 bg-night-grid opacity-60" aria-hidden="true" />
      <div className="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-brass-500/10 blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 left-1/4 w-[480px] h-[480px] rounded-full bg-night-600/40 blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise opacity-[0.035] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-44 pb-16 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 glass-dark text-brass-300 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6"
        >
          <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.18] tracking-tight max-w-3xl mx-auto"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-slate-300/85 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
