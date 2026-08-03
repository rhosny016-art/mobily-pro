import { motion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/components/motion";

interface Props {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

/**
 * دلّني section heading.
 *
 * A consistent eyebrow + title + subtitle rhythm across every section. The
 * eyebrow is a frosted gold pill on dark surfaces and a soft tinted pill on
 * light surfaces, so headings stay legible regardless of backdrop. Each line
 * reveals on scroll with the site-wide easing curve.
 */
export default function SectionHeading({ id, eyebrow, title, subtitle, light = false, center = true }: Props) {
  return (
    <div id={id} className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-12 md:mb-16`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 backdrop-blur-md ${
            light
              ? "glass-card text-gold-300"
              : "bg-gold-500/10 text-gold-700 ring-1 ring-gold-500/15"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${light ? "bg-gold-400" : "bg-gold-500"}`} />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.06 }}
        className={`text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold leading-[1.15] tracking-tight text-balance ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.14 }}
          className={`mt-4 text-base sm:text-lg leading-relaxed text-pretty ${
            light ? "text-white/65" : "text-slate-500"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
