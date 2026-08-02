import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface PageHeroProps {
  eyebrow?: ReactNode;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

/**
 * Unified "دلّني" hero for secondary pages (Services / About / Blog / ...).
 *
 * Replaces the generic `gradient-hero` token with the brand's deep-cobalt
 * studio backdrop, a faint blueprint grid, and dual amber/cyan ambient glows
 * — the same visual language used on the home page so every entry point feels
 * cut from one cloth instead of three different palettes.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  }),
};

export default function PageHero({ eyebrow, eyebrowIcon, title, subtitle, children }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 content-paint"
      dir="rtl"
    >
      {/* Brand deep-cobalt studio backdrop with a richer top light */}
      <div className="absolute inset-0 bg-[#070E22]" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(30,64,175,0.55) 0%, rgba(7,14,34,0) 60%)",
        }}
        aria-hidden="true"
      />

      {/* Blueprint grid pattern — same motif as the home hero for cohesion */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none gpu"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Studio ambient glows — static blur, no animation budget */}
      <div className="absolute top-1/4 right-1/4 w-[520px] h-[520px] rounded-full bg-amber-400/12 blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-1/4 w-[460px] h-[460px] rounded-full bg-blue-500/12 blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center">
        {eyebrow && (
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 glass-card text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            {eyebrowIcon ?? <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />}
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl md:text-5xl font-black text-white leading-[1.18] tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
