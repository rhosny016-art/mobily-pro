import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Target } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import { DEFAULT_SETTINGS, TEAM } from "@/lib/siteData";
import { getSiteSettings } from "@/lib/store";

const VALUES = [
  { Icon: Target, title: "رسالتنا", text: "تمكين كل نشاط تجاري من الوصول لعملائه المحليين بأدوات رقمية فعالة وبتكلفة عادلة." },
  { Icon: Eye, title: "رؤيتنا", text: "أن نكون الوكالة الأولى في المنطقة العربية في التسويق المحلي وخدمات خرائط Google." },
  { Icon: Heart, title: "قيمنا", text: "الشفافية الكاملة، النتائج القابلة للقياس، والتعامل مع نجاح عملائنا كنجاحنا الشخصي." },
];

export default function About() {
  const [s, setS] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    getSiteSettings().then(setS);
  }, []);
  const storyParagraphs = s.about_story.split("\n").filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="من نحن"
        eyebrowIcon={<Target className="w-4 h-4 text-amber-400" aria-hidden="true" />}
        title={s.about_title}
        subtitle={s.about_subtitle}
      />

      {/* القصة + الإحصائيات */}
      <section className="relative py-12 md:py-20 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <SectionHeading eyebrow="قصتنا" title="كيف بدأت دلّني؟" center={false} />
            <div className="space-y-5 -mt-6">
              {storyParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-slate-600 leading-loose font-medium"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {s.stats.map((st, i) => {
              const dark = i % 2 === 0;
              return (
                <motion.div
                  key={st.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className={`relative overflow-hidden rounded-[24px] p-5 sm:p-8 text-center border transition-all duration-300 ${
                    dark
                      ? "bg-gradient-to-br from-[#0066CC] to-[#1E40AF] text-white border-blue-700 shadow-lg shadow-blue-500/20"
                      : "bg-slate-50 text-slate-900 border-slate-100 hover:shadow-xl"
                  }`}
                >
                  {/* مؤشر سفلي أنيق يميّز البطاقات الداكنة */}
                  {dark && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-400 to-emerald-400" aria-hidden="true" />
                  )}
                  <p className={`text-4xl font-black ${dark ? "text-white" : "text-[#0066CC]"}`}>{st.value}</p>
                  <p className={`mt-2 text-sm font-semibold ${dark ? "text-white/80" : "text-slate-500"}`}>{st.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* الرسالة والرؤية والقيم */}
      <section className="relative py-12 md:py-20 bg-slate-50/60 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="ما يحركنا" title="رسالتنا ورؤيتنا وقيمنا" />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-[24px] border border-slate-100 p-6 sm:p-8 text-center shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300"
              >
                {/* رقم تسلسلي مائي أنيق يتسق مع بطاقات لماذا نحن */}
                <span className="absolute top-5 left-5 text-4xl font-black text-slate-100/70 select-none pointer-events-none font-mono group-hover:text-blue-500/5 transition-colors duration-300">
                  0{i + 1}
                </span>
                <div className="relative w-16 h-16 mx-auto rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  <v.Icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* الفريق */}
      <section className="relative py-12 md:py-20 bg-white overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="فريقنا" title="العقول وراء دلّني" subtitle="فريق شغوف يجمع الخبرة التسويقية بالفهم العميق للسوق المحلي." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-36 h-36 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-full ring-2 ring-blue-100/opacity-0 group-hover:ring-blue-200 transition" />
                  <LazyImage
                    src={m.avatar}
                    alt={m.name}
                    wrapperClassName="relative w-36 h-36 mx-auto rounded-full border-4 border-white overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-md z-10"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-extrabold text-slate-900">{m.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, #111B47 0%, #060B24 100%)" }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black"
          >
            لنكتب قصة نجاحك معاً
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-white/70 text-lg font-medium"
          >
            تواصل معنا اليوم — الاستشارة الأولى مجانية بالكامل.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex justify-center"
          >
            <WhatsAppButton size="lg">تواصل معنا الآن</WhatsAppButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
