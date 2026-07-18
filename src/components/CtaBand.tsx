import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";

export function CtaBand() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="contact" className="relative overflow-hidden bg-[#c8912e] py-20 text-white sm:py-24" aria-labelledby="contact-title">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 50%, rgba(255,255,255,.22), transparent 20%), radial-gradient(circle at 86% 15%, rgba(96,61,10,.22), transparent 28%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute -bottom-20 left-[9%] h-64 w-64 rounded-full border border-white/25" aria-hidden="true" />
      <div className="absolute -bottom-6 left-[13%] h-48 w-48 rounded-full border border-white/20" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl px-5 text-center"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-black">
          <Sparkles className="h-4 w-4" />
          المكان الصحيح يبدأ بخطوة
        </p>
        <h2 id="contact-title" className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-5xl">
          جاهز لتضع نشاطك على خريطة النجاح؟
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-8 text-white/90 sm:text-lg">
          دعنا نكتشف معاً أين تقف اليوم، وأسرع طريق نحو ظهور أقوى وعملاء أكثر.
        </p>
        <Button
          size="lg"
          className="mt-8 h-14 rounded-full bg-[#0f3855] px-7 text-base font-black text-white shadow-[0_12px_28px_rgba(92,57,7,0.28)] transition hover:-translate-y-0.5 hover:bg-[#092a42]"
        >
          <MessageCircle className="ml-2 h-5 w-5" />
          احجز استشارتك المجانية
          <ArrowLeft className="mr-2 h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  );
}
