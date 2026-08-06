import { motion } from "framer-motion";

interface Props {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  }),
};

export default function SectionHeading({ id, eyebrow, title, subtitle, light = false, center = true }: Props) {
  return (
    <div id={id} className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-12 md:mb-16`}>
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-bold mb-5 ${
            light
              ? "glass-dark text-brass-300"
              : "bg-brass-500/10 text-brass-700 border border-brass-500/20"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${light ? "bg-brass-400" : "bg-brass-500"} animate-pulse-soft`} />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={1}
        className={`text-3xl md:text-[42px] font-black leading-[1.2] tracking-tight ${
          light ? "text-white" : "text-night-900"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
          className={`mt-4 text-base md:text-lg leading-relaxed font-medium ${
            light ? "text-slate-300/80" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
