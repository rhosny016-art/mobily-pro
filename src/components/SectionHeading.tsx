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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function SectionHeading({ id, eyebrow, title, subtitle, center = true }: Props) {
  return (
    <div id={id} className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14 relative z-10`}>
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0}
          className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-bold mb-6 glass-card text-blue-300 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        custom={1}
        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={2}
          className="mt-6 text-lg md:text-xl font-medium leading-[1.8] text-gray-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
