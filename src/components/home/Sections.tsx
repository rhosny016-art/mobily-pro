import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Sparkles, MapPin, Globe, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import AuroraBackground from "@/components/AuroraBackground";
import { getServices, getSiteSettings } from "@/lib/store";
import { SERVICES as DEFAULT_SERVICES, DEFAULT_SETTINGS } from "@/lib/siteData";
import { EASE_OUT } from "@/lib/motion";

const ICON_MAP: Record<string, any> = {
  Users,
  TrendingUp,
  Sparkles,
  MapPin,
  Globe,
  CheckCircle2,
};

export function ServicesSection() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);

  return (
    <section id="services" className="relative scroll-mt-24 py-20 md:py-32 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-blue-500/40 to-transparent" aria-hidden="true" />
      <AuroraBackground
        orbs={[
          { className: "top-[-10%] left-[-6%] w-[560px] h-[560px]", color: "radial-gradient(circle, rgba(37,99,235,0.14), transparent 70%)" },
          { className: "bottom-[-15%] right-[-6%] w-[520px] h-[520px]", color: "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)" },
        ]}
        grid={false}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="خدماتنا"
          title="حلول تسويقية متكاملة لنمو أعمالك"
          subtitle="نقدم لك باقة من الخدمات المبتكرة والمصممة خصيصاً لتلبية احتياجات نشاطك التجاري وتعزيز تواجدك الرقمي."
          light
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-6 md:pt-8">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (i % 3) * 0.12, duration: 0.65, ease: EASE_OUT }}
              className="h-full"
            >
              <ServiceCard service={s} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);
  const { stats } = settings;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <AuroraBackground
        orbs={[
          { className: "top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px]", color: "radial-gradient(ellipse, rgba(59,130,246,0.2), transparent 70%)" },
          { className: "bottom-[-30%] right-[-8%] w-[500px] h-[500px]", color: "radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)" },
        ]}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="تأثير حقيقي"
          title="أرقام تعكس التزامنا بالنجاح"
          subtitle="لغة الأرقام هي الدليل الأوضح على ما نحققه من نجاحات ملموسة لشركائنا في مختلف القطاعات."
          light
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 pt-10">
          {stats.map((s: any, i: number) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: EASE_OUT }}
              className="relative group card-premium rounded-3xl p-6 sm:p-8 text-center overflow-hidden"
            >
              {/* Radial hover wash */}
              <div className="absolute inset-0 bg-[radial-gradient(280px_circle_at_50%_-10%,rgba(59,130,246,0.18),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

              {/* Animated gradient underline */}
              <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-l from-blue-500 via-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" aria-hidden="true" />

              {/* Decorative dashed ring */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-dashed border-white/10 group-hover:border-blue-400/40 group-hover:animate-spin-slower transition-colors duration-500" aria-hidden="true" />

              <div className="relative z-10">
                <AnimatedCounter
                  value={s.value}
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-[0_0_25px_rgba(59,130,246,0.45)]"
                />
                <div className="w-10 h-[2.5px] bg-gradient-to-l from-blue-500 to-violet-500 mx-auto my-5 rounded-full transition-all duration-500 group-hover:w-24" />
                <p className="text-sm sm:text-base font-bold text-slate-300 tracking-wide group-hover:text-white transition-colors duration-300">
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);
  const { why_choose_us } = settings;

  return (
    <section id="why-us" className="relative scroll-mt-24 py-20 md:py-32 overflow-hidden">
      <AuroraBackground
        orbs={[
          { className: "top-[10%] right-[-10%] w-[600px] h-[600px]", color: "radial-gradient(circle, rgba(139,92,246,0.13), transparent 70%)" },
          { className: "bottom-[5%] left-[-8%] w-[550px] h-[550px]", color: "radial-gradient(circle, rgba(34,211,238,0.1), transparent 70%)" },
        ]}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="لماذا نحن"
          title="شريكك الاستراتيجي في كل خطوة"
          subtitle="نؤمن بأن كل مشروع هو فرصة لابتكار قصة نجاح فريدة، لذا نكرس خبراتنا لنقدم لك حلولاً تتجاوز التوقعات."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-6 md:pt-8">
          {why_choose_us.map((item: any, i: number) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: EASE_OUT }}
                className="group relative card-premium rounded-3xl p-7 sm:p-8 flex flex-col justify-between text-right"
                dir="rtl"
              >
                {/* Hover gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/[0.07] via-transparent to-violet-500/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-600" aria-hidden="true" />

                {/* Ghost number */}
                <span className="absolute top-5 left-6 font-display text-6xl font-black text-white/[0.05] group-hover:text-blue-500/15 transition-colors duration-500 select-none" aria-hidden="true">
                  0{i + 1}
                </span>

                <div className="relative z-10">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 opacity-0 blur-lg group-hover:opacity-50 transition-opacity duration-500" aria-hidden="true" />
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-blue-400 flex items-center justify-center transition-all duration-500 group-hover:from-blue-600 group-hover:to-violet-600 group-hover:border-blue-400/50 group-hover:text-white group-hover:-translate-y-1.5 group-hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.6)]">
                      <Icon className="w-8 h-8" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
