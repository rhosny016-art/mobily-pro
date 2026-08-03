import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Sparkles, MapPin, Globe, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { getServices, getSiteSettings } from "@/lib/store";
import { SERVICES as DEFAULT_SERVICES, DEFAULT_SETTINGS } from "@/lib/siteData";

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
    <section id="services" className="relative scroll-mt-24 py-16 md:py-32 overflow-hidden">
      {/* 3D Deep Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-[#0f172a] to-transparent pointer-events-none opacity-50" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="خدماتنا"
          title="حلول تسويقية متكاملة لنمو أعمالك"
          subtitle="نقدم لك باقة من الخدمات المبتكرة والمصممة خصيصاً لتلبية احتياجات نشاطك التجاري وتعزيز تواجدك الرقمي."
          light={true}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-12 perspective-[1200px]">
          {services.map((s, i) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, rotateX: 20, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="h-full"
            >
              <ServiceCard service={s} />
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
    <section className="relative py-16 md:py-32 overflow-hidden">
      {/* Cosmic Nebula Background */}
      <div className="absolute inset-0 bg-[#020617] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020617]/90 to-[#020617] pointer-events-none" />
      
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[180px] pointer-events-none animate-pulse-glow" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="تأثير حقيقي"
          title="أرقام تعكس التزامنا بالنجاح"
          subtitle="لغة الأرقام هي الدليل الأوضح على ما نحققه من نجاحات ملموسة لشركائنا في مختلف القطاعات."
          light={true}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-12">
          {stats.map((s: any, i: number) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring" }}
              className="relative group glass-card rounded-2xl p-6 sm:p-8 text-center glass-card-hover overflow-hidden"
            >
              {/* Animated inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
              
              <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-200 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                {s.value}
              </p>
              
              <div className="w-10 h-[2px] bg-blue-500/50 mx-auto my-4 transform group-hover:w-24 group-hover:bg-purple-500 transition-all duration-300" />
              
              <p className="text-sm sm:text-base font-bold text-gray-300 tracking-wide group-hover:text-white transition-colors duration-200 relative z-10">
                {s.label}
              </p>
              
              <span className="absolute top-2 right-4 text-[10px] font-mono text-gray-600 font-bold mix-blend-screen">
                #STAT_0{i + 1}
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
    <section id="why-us" className="relative scroll-mt-24 py-16 md:py-32 overflow-hidden">
      {/* Deep Space Gradients */}
      <div className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        <SectionHeading
          eyebrow="لماذا نحن"
          title="شريكك الاستراتيجي في كل خطوة"
          subtitle="نؤمن بأن كل مشروع هو فرصة لابتكار قصة نجاح فريدة، لذا نكرس خبراتنا لنقدم لك حلولاً تتجاوز التوقعات."
          light={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-12 perspective-[1000px]">
          {why_choose_us.map((item: any, i: number) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, rotateY: 30, x: -30 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="group relative glass-card rounded-3xl p-6 sm:p-8 glass-card-hover flex flex-col justify-between text-right overflow-hidden transform-style-3d"
                dir="rtl"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="absolute top-6 left-6 text-6xl font-black text-gray-800/30 group-hover:text-blue-500/10 transition-colors duration-500 select-none">
                  0{i + 1}
                </span>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gray-800/50 border border-gray-700 text-blue-400 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-blue-600 group-hover:border-blue-400 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover:-translate-y-2">
                    <Icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
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
