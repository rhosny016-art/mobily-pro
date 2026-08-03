import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Target, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import AuroraBackground from "@/components/AuroraBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import { DEFAULT_SETTINGS, TEAM } from "@/lib/siteData";
import { getSiteSettings } from "@/lib/store";
import { EASE_OUT } from "@/lib/motion";

const VALUES = [
  { Icon: Target, title: "رسالتنا", text: "تمكين كل نشاط تجاري من الوصول لعملائه المحليين بأدوات رقمية فعالة وبتكلفة عادلة.", accent: "from-blue-500 to-indigo-600" },
  { Icon: Eye, title: "رؤيتنا", text: "أن نكون الوكالة الأولى في المنطقة العربية في التسويق المحلي وخدمات خرائط Google.", accent: "from-violet-500 to-purple-600" },
  { Icon: Heart, title: "قيمنا", text: "الشفافية الكاملة، النتائج القابلة للقياس، والتعامل مع نجاح عملائنا كنجاحنا الشخصي.", accent: "from-rose-500 to-pink-600" },
];

export default function About() {
  const [s, setS] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    getSiteSettings().then(setS);
  }, []);
  const storyParagraphs = s.about_story.split("\n").filter(Boolean);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "top-[-10%] left-[20%] w-[500px] h-[500px]", color: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" },
            { className: "bottom-[-15%] right-[8%] w-[480px] h-[480px]", color: "radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)" },
          ]}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 glass border-amber-400/25 text-amber-200 text-sm font-bold px-5 py-2 rounded-full mb-7"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            من نحن
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-black text-white leading-[1.2] [text-wrap:balance]"
          >
            {s.about_title.split("—").map((part, i, arr) => (
              <span key={i}>
                {part.trim()}
                {i < arr.length - 1 ? (
                  <>
                    {" "}
                    <span className="text-gradient">—</span>{" "}
                  </>
                ) : null}
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: EASE_OUT }}
            className="mt-6 text-lg text-slate-300 font-medium leading-relaxed"
          >
            {s.about_subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-9 h-[3px] w-28 mx-auto rounded-full bg-gradient-to-l from-amber-400 via-orange-500 to-pink-500"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ================= STORY + STATS ================= */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "top-[10%] right-[-8%] w-[560px] h-[560px]", color: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)" },
          ]}
          grid={false}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
          <div>
            <SectionHeading eyebrow="قصتنا" title="كيف بدأت دلّني؟" center={false} />
            <div className="space-y-5 -mt-4">
              {storyParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_OUT }}
                  className={`leading-[2] font-medium ${
                    i === 0 ? "text-lg text-slate-200" : "text-slate-400"
                  }`}
                >
                  {i === 0 && (
                    <span className="float-right ml-3 text-5xl leading-none font-black text-gradient select-none" aria-hidden="true">
                      "
                    </span>
                  )}
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-5 md:gap-6">
            {s.stats.map((st, i) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: EASE_OUT }}
                whileHover={{ y: -6 }}
                className={`relative card-premium rounded-3xl p-6 sm:p-8 text-center overflow-hidden ${
                  i % 2 === 0 ? "border-gradient" : "border-white/[0.07]"
                }`}
              >
                <div className="absolute -top-10 right-1/2 translate-x-1/2 w-32 h-32 rounded-full bg-blue-500/15 blur-[50px] pointer-events-none" aria-hidden="true" />
                <AnimatedCounter
                  value={st.value}
                  className="relative font-display text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                />
                <p className="relative mt-3 text-sm font-bold text-slate-300">{st.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-violet-500/40 to-transparent" aria-hidden="true" />
        <AuroraBackground
          orbs={[
            { className: "bottom-[-20%] left-[15%] w-[600px] h-[600px]", color: "radial-gradient(circle, rgba(37,99,235,0.1), transparent 70%)" },
          ]}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
          <SectionHeading eyebrow="ما يحركنا" title="رسالتنا ورؤيتنا وقيمنا" />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: EASE_OUT }}
                whileHover={{ y: -8 }}
                className="group relative card-premium rounded-[26px] p-7 sm:p-9 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                <div className="relative w-18 h-18 mx-auto mb-6">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${v.accent} opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-500`} aria-hidden="true" />
                  <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${v.accent} text-white flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-3`}>
                    <v.Icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-white mb-3">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-cyan-500/30 to-transparent" aria-hidden="true" />
        <AuroraBackground
          orbs={[
            { className: "top-[30%] right-[-10%] w-[500px] h-[500px]", color: "radial-gradient(circle, rgba(34,211,238,0.08), transparent 70%)" },
          ]}
          grid={false}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
          <SectionHeading
            eyebrow="فريقنا"
            title="العقول وراء دلّني"
            subtitle="فريق شغوف يجمع الخبرة التسويقية بالفهم العميق للسوق المحلي."
            light
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_OUT }}
                className="text-center group"
              >
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-5">
                  {/* Gradient ring */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 opacity-30 group-hover:opacity-80 blur-[2px] transition-opacity duration-500" aria-hidden="true" />
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 opacity-60 group-hover:rotate-180 transition-transform duration-700" style={{ WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))" }} aria-hidden="true" />
                  <LazyImage
                    src={m.avatar}
                    alt={m.name}
                    wrapperClassName="relative w-full h-full rounded-full border-[3px] border-[#070c26] overflow-hidden transition-transform duration-500 group-hover:scale-105 shadow-2xl bg-slate-900"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-white group-hover:text-blue-200 transition-colors duration-300">{m.name}</h3>
                <p className="text-sm text-slate-400 font-semibold mt-1">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px]", color: "radial-gradient(ellipse, rgba(37,99,235,0.2), transparent 70%)" },
          ]}
          grid={false}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="text-3xl md:text-5xl font-black text-white [text-wrap:balance]"
          >
            لنكتب قصة نجاحك <span className="text-gradient">معاً</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="mt-5 text-lg text-slate-300 font-medium flex items-center justify-center gap-2"
          >
            تواصل معنا اليوم — الاستشارة الأولى مجانية بالكامل.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <WhatsAppButton size="lg">تواصل معنا الآن</WhatsAppButton>
            <Link to="/services" className="btn-ghost px-7 py-4 rounded-2xl text-base group">
              اكتشف خدماتنا
              <span className="transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true">←</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
