import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { ICON_MAP } from "@/lib/icons";
import { getServices, getSiteSettings } from "@/lib/store";
import { DEFAULT_SETTINGS, SERVICES as DEFAULT_SERVICES } from "@/lib/siteData";

export function ServicesSection() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);
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
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
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
