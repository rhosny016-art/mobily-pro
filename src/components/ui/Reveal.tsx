import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — children should use motion items or <RevealItem>. */
export function RevealGroup({
  children,
  className,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0.09, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/** Section heading: coordinate eyebrow + big title + optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <RevealGroup
      className={cn(
        "mb-14 flex flex-col gap-4 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      <RevealItem>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] font-medium tracking-widest text-mist-400">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
          {eyebrow}
        </span>
      </RevealItem>
      <RevealItem>
        <h2
          className={cn(
            "max-w-3xl font-display text-3xl font-bold leading-[1.25] text-mist-100 md:text-5xl md:leading-[1.2]",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </RevealItem>
      {subtitle && (
        <RevealItem>
          <p className="max-w-2xl text-base leading-relaxed text-mist-400 md:text-lg">
            {subtitle}
          </p>
        </RevealItem>
      )}
    </RevealGroup>
  );
}
