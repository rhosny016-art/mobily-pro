import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  /** Raw value string, e.g. "+250", "4.9", "300%", "1,500" */
  value: string;
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
}

/**
 * Counts up from 0 to the numeric part of `value` when scrolled into view,
 * keeping any suffix (+, %, etc.) and thousands separators. rAF-based → cheap.
 */
export default function AnimatedCounter({ value, className = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const rawMatch = value.match(/[0-9.,]+/);
  const rawNumber = rawMatch ? rawMatch[0] : "0";
  const suffix = value.replace(rawNumber, "");
  const hasDecimal = rawNumber.includes(".");
  const hasComma = rawNumber.includes(",");
  const target = parseFloat(rawNumber.replace(/,/g, ""));

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || Number.isNaN(target)) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = target * eased;

      const formatted = hasDecimal
        ? current.toFixed(1)
        : Math.round(current).toLocaleString("en-US");

      el.textContent = hasComma
        ? formatted.replace(/,/g, ",") + suffix
        : formatted + suffix;

      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, hasDecimal, hasComma, suffix]);

  return (
    <span ref={ref} className={className}>
      {"0" + suffix}
    </span>
  );
}
