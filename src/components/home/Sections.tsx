import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
<<<<<<< HEAD
import { ICON_MAP } from "@/lib/icons";
import { getServices, getSiteSettings } from "@/lib/store";
import { DEFAULT_SETTINGS, SERVICES as DEFAULT_SERVICES } from "@/lib/siteData";
=======
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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e

export function ServicesSection() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);
<<<<<<< HEAD
  return (
    <section id="services" className="relative scroll-mt-24 py-10 md:py-28 bg-slate-50/50 overflow-hidden">
      {/* الخلفية المزخرفة فائقة النعومة */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-24 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />
      
      {/* نمط النقاط الناعمة جداً للخلفية */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          eyebrow="خدماتنا الاحترافية"
          title="حلول تسويقية متكاملة لنمو عملك"
          subtitle="من الظهور المتصدر على خرائط Google إلى الحملات الإعلانية الذكية — كل ما يحتاجه نشاطك لتجاوز منافسيه."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4 md:pt-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
=======

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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
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
<<<<<<< HEAD
  return (
    <section className="relative py-10 md:py-28 bg-[#0A143F] overflow-hidden">
      {/* توهج نيون خلفي */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[180px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
      
      {/* شبكة هندسية خلفية دقيقة */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          eyebrow="أرقام تتحدث"
          title="مسيرة من النتائج والأرقام الحقيقية"
          subtitle="لا نعدك بمجرد إعلانات؛ بل نلتزم بتحقيق قفزة نوعية ملموسة في أرقام مبيعاتك وحضورك المحلي."
          light={true}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="relative group bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 sm:p-8 text-center shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
            >
              {/* توهج سفلي ناعم يظهر عند التحويم */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl md:rounded-b-2xl" />
              
              {/* مؤشر رقمي متوهج ومميز */}
              <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0066CC] tracking-tight drop-shadow-[0_2px_10px_rgba(0,102,204,0.08)] bg-clip-text">
                {s.value}
              </p>
              
              <div className="w-8 sm:w-10 h-[2px] bg-emerald-500/40 mx-auto my-3 sm:my-4 transform group-hover:w-20 transition-all duration-300" />
              
              <p className="text-xs sm:text-sm font-bold text-gray-600 tracking-wide group-hover:text-[#0066CC] transition-colors duration-200">
                {s.label}
              </p>
              
              <span className="absolute top-2 right-4 text-[9px] sm:text-[10px] font-mono text-gray-300 select-none font-bold">
                DALNI.{i + 1}
              </span>
=======

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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
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
<<<<<<< HEAD
  return (
    <section id="why-us" className="relative scroll-mt-24 py-10 md:py-28 bg-white overflow-hidden">
      {/* تدرج جانبي خفيف */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-gray-50/50 blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          eyebrow="لماذا وكالة دلّني؟"
          title="شريك نجاحك الحقيقي وليس مجرد مقدم خدمة"
          subtitle="نتعامل مع كل مشروع كأنه استثمارنا الخاص — بكل شفافية، وبأعلى معايير الإتقان التقني والتسويقي."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {why_choose_us.map((item, i) => {
=======

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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
<<<<<<< HEAD
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-[20px] md:rounded-[24px] border border-gray-100 p-5 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-500/10 transition-all duration-300 flex flex-col justify-between text-right"
                dir="rtl"
              >
                {/* رقم تسلسلي فاخر كخلفية مائية خفيفة جداً في الكارت */}
                <span className="absolute top-5 left-5 text-4xl sm:text-5xl font-black text-gray-100/50 select-none pointer-events-none font-mono group-hover:text-blue-500/5 transition-colors duration-300">
                  0{i + 1}
                </span>

                <div>
                  {/* حاوية الأيقونة الدائرية الأنيقة */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
=======
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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
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
