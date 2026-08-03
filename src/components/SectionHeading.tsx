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

export default function SectionHeading({ id, eyebrow, title, subtitle, light = false, center = true }: Props) {
  return (
    <div id={id} className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14`}>
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0}
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
            light ? "glass-card text-white" : "bg-primary/10 text-primary"
          }`}
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
        className={`text-3xl md:text-4xl font-extrabold leading-tight ${light ? "text-white" : "text-foreground"}`}
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
          className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
