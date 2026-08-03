import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { stagger, wordReveal } from "@/lib/motion";
import { MapCanvas } from "@/components/home/MapCanvas";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20" aria-label="مقدمة الصفحة">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(46,107,255,0.14),transparent_70%)]" />
        <MapCanvas className="absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />
      </div>

      <motion.div
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center md:px-8"
      >
        <motion.span
          variants={wordReveal}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] font-medium tracking-widest text-mist-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
          {eyebrow}
        </motion.span>
        <motion.h1
          variants={wordReveal}
          className="font-display text-4xl font-extrabold leading-[1.2] text-mist-100 md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p variants={wordReveal} className="max-w-2xl text-base leading-relaxed text-mist-400 md:text-lg">
            {subtitle}
          </motion.p>
        )}
        {children}
      </motion.div>
    </section>
  );
}
