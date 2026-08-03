import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Shared motion primitives for دلّني.
 *
 * One vocabulary of easings + reveal variants so every section animates with
 * the same rhythm. Keeps per-component motion config out of JSX and lets us
 * tune the whole site's feel from a single file.
 */

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Stagger container — children fade/slide up in sequence when scrolled in. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

/** Standard fade-up child reveal. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_SOFT },
  },
};

/** Smaller, snappier fade-up for dense grids (cards, stats). */
export const fadeUpItemSm: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_SOFT },
  },
};

/** Scale-in reveal for badges / icons / hero chips. */
export const scaleInItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_SOFT },
  },
};

/** Reveal-on-scroll wrapper that mirrors the old per-element `whileInView`
 *  pattern but reads cleaner when composing lists. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
  amount?: number;
}) {
  const M = motion[as as "div"] ?? motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay }}
    >
      {children}
    </M>
  );
}
