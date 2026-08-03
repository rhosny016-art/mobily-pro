import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface Props {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
  accent?: "blue" | "gold";
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  center = true,
  accent = "blue",
}: Props) {
  return (
    <div
      id={id}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14 md:mb-20 relative z-10`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-bold mb-6 border ${
            accent === "gold"
              ? "border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-[0_0_25px_-5px_rgba(245,158,11,0.4)]"
              : "border-blue-400/30 bg-blue-500/10 text-blue-300 shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)]"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-pulse-ring absolute inline-flex h-full w-full rounded-full ${
                accent === "gold" ? "bg-amber-400" : "bg-blue-400"
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                accent === "gold" ? "bg-amber-400" : "bg-blue-400"
              }`}
            />
          </span>
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="text-4xl md:text-5xl lg:text-[3.4rem] font-black leading-[1.2] text-white [text-wrap:balance]"
      >
        {title}
      </motion.h2>

      {/* Animated underline accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
        className={`mt-6 h-[3px] w-28 rounded-full bg-gradient-to-r ${
          accent === "gold"
            ? "from-amber-400 via-orange-500 to-pink-500"
            : "from-blue-500 via-violet-500 to-cyan-400"
        } ${center ? "mx-auto" : ""}`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
          className="mt-6 text-lg md:text-xl font-medium leading-[1.9] text-slate-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
