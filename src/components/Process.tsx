import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, Map, Rocket, TrendingUp } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "تحليل الوضع الحالي",
    text: "نراجع ملفك التجاري وحضورك الرقمي ومنافسيك في منطقتك — مجاناً وبدون أي التزام.",
  },
  {
    icon: Map,
    step: "02",
    title: "استراتيجية مخصصة",
    text: "خطة عمل واضحة بأولويات مرتبة حسب الأثر، ومؤشرات نجاح قابلة للقياس من اليوم الأول.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "التنفيذ والإطلاق",
    text: "نبني ونحسّن ملفك ونطلق الحملات الإعلانية مع متابعة يومية دقيقة للأداء.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "قياس وتطوير مستمر",
    text: "تقارير شهرية مبسطة وقرارات تحسين مستمرة تنمّي نتائجك شهراً بعد شهر.",
  },
];

export function Process() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="process" className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="process-title">
      <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#d8f1f4]/50 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div id="process-title">
          <SectionTitle
            eyebrow="كيف نعمل"
            title="منهجية واضحة من أول مكالمة حتى النمو"
            description="أربع خطوات مدروسة تحوّل ظهورك الرقمي إلى مكالمات وزيارات ومبيعات يمكن قياسها."
          />
        </div>

        <div className="relative mt-16">
          {/* connector line */}
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-[52px] hidden h-px bg-gradient-to-l from-transparent via-[#e0be72] to-transparent lg:block"
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, step, title, text }, index) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl border border-[#e9eef1] bg-[#fbfcfd] px-6 pb-7 pt-12 text-center shadow-[0_12px_30px_rgba(20,62,83,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-[#e3c27a] hover:shadow-[0_20px_38px_rgba(173,119,28,0.13)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 right-6 rounded-full bg-[#c8912e] px-3 py-1 font-mono text-xs font-bold text-white shadow-[0_6px_14px_rgba(190,126,26,0.35)]"
                >
                  {step}
                </span>
                <div className="relative mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#efe6d2] bg-white shadow-[inset_0_1px_0_white,0_10px_22px_rgba(20,62,83,0.08)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b58] text-[#f6c767] shadow-lg shadow-[#0d3b58]/15 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-black text-[#173a56]">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[#63798a]">{text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
