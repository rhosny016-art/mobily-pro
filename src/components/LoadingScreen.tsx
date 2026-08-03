import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

/** First-visit-only brand splash — max ~1.2s, skipped for reduced motion. */
export function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("dalni-loaded") === "1";
      sessionStorage.setItem("dalni-loaded", "1");
    } catch {
      /* sandboxed context — show the splash once per mount instead */
    }
    if (reduce || seen) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1250);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoMark className="h-20 w-20 drop-shadow-[0_0_30px_rgba(46,107,255,0.5)]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-2xl font-extrabold text-mist-100"
            >
              دلّني<span className="text-gold-400">.</span>
            </motion.p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-0.5 w-40 origin-right rounded-full bg-gradient-to-l from-brand-400 via-aurora-400 to-gold-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
