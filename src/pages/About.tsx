import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Target } from "lucide-react";
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
      {/* Hero */}
      <section className="relative gradient-hero pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white leading-tight"
          >
            {s.about_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg text-white/70"
          >
            {s.about_subtitle}
          </motion.p>
        </div>
      </section>

      {/* القصة + الإحصائيات */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
                  className="text-foreground/75 leading-loose"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {s.stats.map((st, i) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[24px] p-5 sm:p-8 text-center ${i % 2 === 0 ? "gradient-primary text-white" : "bg-muted"}`}
              >
                <p className={`text-4xl font-black ${i % 2 === 0 ? "text-white" : "text-primary"}`}>{st.value}</p>
                <p className={`mt-2 text-sm font-semibold ${i % 2 === 0 ? "text-white/80" : "text-muted-foreground"}`}>{st.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* الرسالة والرؤية والقيم */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
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
                className="bg-white rounded-[24px] border border-border p-6 sm:p-8 text-center shadow-sm"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary text-white flex items-center justify-center mb-5">
                  <v.Icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* الفريق */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
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
                  <div className="absolute inset-0 rounded-full gradient-primary opacity-0 group-hover:opacity-20 blur transition" />
                  <LazyImage
                    src={m.avatar}
                    alt={m.name}
                    wrapperClassName="relative w-36 h-36 mx-auto rounded-full border-4 border-muted overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-sm z-10"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-extrabold">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 gradient-hero">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white">لنكتب قصة نجاحك معاً</h2>
          <p className="mt-4 text-white/70">تواصل معنا اليوم — الاستشارة الأولى مجانية بالكامل.</p>
          <div className="mt-8">
            <WhatsAppButton size="lg">تواصل معنا الآن</WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
