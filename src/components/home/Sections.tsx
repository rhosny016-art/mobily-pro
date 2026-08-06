import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Sparkles, MessageCircle, ScanSearch, Rocket, BarChart3 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { ICON_MAP } from "@/lib/icons";
import { getServices, getSiteSettings } from "@/lib/store";
import { DEFAULT_SETTINGS, SERVICES as DEFAULT_SERVICES } from "@/lib/siteData";

/* ============ Platform marquee ============ */

const PLATFORMS = [
  "خرائط Google",
  "Google Ads",
  "YouTube",
  "TikTok",
  "Instagram",
  "Facebook",
  "Snapchat",
  "Local SEO",
  "Google Analytics",
];

export function PlatformStrip() {
  return (
    <div className="relative bg-fog border-y border-line overflow-hidden" aria-hidden="true">
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-fog to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-fog to-transparent z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto py-5">
        <div className="overflow-hidden" dir="ltr">
          <div className="marquee-track flex w-max items-center gap-10">
            {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="flex items-center gap-10 text-sm font-bold text-night-500/70 whitespace-nowrap"
              >
                {p}
                <span className="w-1.5 h-1.5 rounded-full bg-brass-400/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Services ============ */

export function ServicesSection() {
  const [services, setServices] = useState(DEFAULT_SERVICES.filter((s) => s.visible !== false));
  useEffect(() => {
    getServices().then((list) => setServices(list.filter((s) => s.visible !== false)));
  }, []);

  return (
    <section id="services" className="relative scroll-mt-24 py-16 md:py-28 bg-fog overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-fog to-transparent pointer-events-none" />
      <div className="absolute top-40 left-1/4 w-[420px] h-[420px] rounded-full bg-brass-500/6 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[420px] h-[420px] rounded-full bg-night-600/8 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-fog-dots opacity-[0.35] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="خدماتنا الاحترافية"
          title="حلول تسويقية متكاملة لنمو عملك"
          subtitle="من الظهور المتصدر على خرائط Google إلى الحملات الإعلانية الذكية — كل ما يحتاجه نشاطك لتجاوز منافسيه."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Process ============ */

const PROCESS_STEPS = [
  {
    icon: MessageCircle,
    step: "01",
    title: "استشارة مجانية",
    text: "نتعرف على نشاطك وأهدافك وجمهورك المستهدف، ونقدم لك رؤية أولية فورية دون أي التزام.",
  },
  {
    icon: ScanSearch,
    step: "02",
    title: "تشخيص وتحليل",
    text: "نفحص ملفك التجاري ومواقعك ومنافسيك بعمق لنرصد الفرص الضائعة ونبني الخطة المثالية.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "تنفيذ الخطة",
    text: "نطلق التحسينات والحملات على أرض الواقع: خرائط، إعلانات، محتوى، وتقييمات — بدقة كاملة.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "قياس وتحسين",
    text: "تقارير دورية شفافة تظهر أرقامك الحقيقية، مع تحسين مستمر يضاعف عائد استثمارك.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-24 py-16 md:py-28 bg-white overflow-hidden">
      <div className="absolute top-24 right-1/4 w-[380px] h-[380px] rounded-full bg-brass-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="رحلتنا معك"
          title="أربع خطوات نحو خريطة النجاح"
          subtitle="منهجية واضحة ومجرّبة — تعرف مسبقاً ماذا سنفعل ومتى سترى النتائج."
        />

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-[52px] right-[12%] left-[12%] border-t-2 border-dashed border-brass-500/25"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PROCESS_STEPS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="group relative h-full text-center rounded-[24px] border border-line bg-white p-7 shadow-card hover:shadow-card-lg hover:border-brass-500/30 transition-all duration-300 hover:-translate-y-1.5">
                  <div className="relative w-[72px] h-[72px] mx-auto mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-brass-500/10 group-hover:bg-brass-500/20 transition-colors duration-300" />
                    <div className="relative w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-night-900 to-night-700 text-brass-300 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:from-brass-500 group-hover:to-brass-600 group-hover:text-night-950 transition-all duration-300">
                      <p.icon className="w-8 h-8" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 font-display text-[11px] font-bold bg-night-900 text-brass-300 rounded-full w-7 h-7 flex items-center justify-center border border-brass-500/40 shadow-md">
                      {p.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-night-900 mb-2.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Stats (animated counters) ============ */

function parseStat(value: string): { prefix: string; num: number; decimals: number; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, decimals: 0, suffix: value };
  const decimals = match[2].includes(".") ? 1 : 0;
  return { prefix: match[1], num: parseFloat(match[2]), decimals, suffix: match[3] };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { prefix, num, decimals, suffix } = parseStat(value);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, num, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1] as const,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, num, decimals]);

  return (
    <span ref={ref} className="font-display">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);
  const { stats } = settings;

  return (
    <section className="relative py-16 md:py-28 bg-night-950 overflow-hidden">
      <div className="absolute inset-0 bg-night-grid opacity-40" aria-hidden="true" />
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-brass-500/8 blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-night-600/30 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="أرقام تتحدث"
          title="مسيرة من النتائج والأرقام الحقيقية"
          subtitle="لا نعدك بمجرد إعلانات؛ بل نلتزم بتحقيق قفزة نوعية ملموسة في أرقام مبيعاتك وحضورك المحلي."
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group relative h-full rounded-[22px] glass-dark p-6 md:p-9 text-center hover:bg-white/8 hover:border-brass-500/30 transition-all duration-300 hover:-translate-y-1.5">
                <span className="absolute top-3 left-5 font-display text-[10px] font-bold text-slate-500 select-none">
                  DALNI.0{i + 1}
                </span>
                <p className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-none text-gradient-gold">
                  <CountUp value={s.value} />
                </p>
                <div className="w-10 h-[2px] bg-gradient-to-l from-brass-500 to-transparent mx-auto my-4 group-hover:w-16 transition-all duration-500" />
                <p className="text-xs sm:text-sm font-bold text-slate-300/85">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Why choose us ============ */

export function WhyChooseUsSection() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);
  const { why_choose_us } = settings;

  return (
    <section id="why-us" className="relative scroll-mt-24 py-16 md:py-28 bg-white overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-night-600/6 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="لماذا وكالة دلّني؟"
          title="شريك نجاحك الحقيقي وليس مجرد مقدم خدمة"
          subtitle="نتعامل مع كل مشروع كأنه استثمارنا الخاص — بكل شفافية، وبأعلى معايير الإتقان التقني والتسويقي."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {why_choose_us.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-[24px] border border-line bg-white p-7 shadow-card hover:shadow-card-lg hover:border-brass-500/30 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  <span
                    className="absolute -bottom-4 -left-2 font-display text-7xl font-bold text-night-900/4 select-none pointer-events-none group-hover:text-brass-500/8 transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="w-14 h-14 rounded-2xl bg-night-900 text-brass-300 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-brass-400 group-hover:to-brass-600 group-hover:text-night-950 group-hover:scale-110 group-hover:shadow-[0_10px_24px_-8px_rgba(237,155,47,0.6)] transition-all duration-300">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-extrabold text-night-900 mb-2.5 group-hover:text-night-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
