import type { Variants } from "framer-motion";

/** Shared, GPU-friendly animation variants (transform + opacity only). */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: EASE_OUT },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE_OUT },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: EASE_OUT },
  }),
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE_OUT },
  }),
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE_OUT },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Char-level text reveal (Arabic-friendly: splits on words). */
export const wordReveal = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: delay + i * 0.09, duration: 0.65, ease: EASE_OUT },
  }),
});
