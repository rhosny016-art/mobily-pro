import { Compass, Eye, Gem, HeartHandshake, ShieldCheck, Zap } from "lucide-react";
import { STATS } from "@/lib/constants";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/home/CtaSection";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    icon: Gem,
    title: "الجودة قبل الكمية",
    text: "نقبل عدداً محدوداً من العملاء لنمنح كل مشروع عمق الاهتمام الذي يستحقه.",
  },
  {
    icon: ShieldCheck,
    title: "النزاهة",
    text: "لا مراجعات مزيفة، لا وعود مستحيلة، لا أسعار خفية. تعاملنا معك كما نحب أن نُعامل.",
  },
  {
    icon: Zap,
    title: "السرعة في التنفيذ",
    text: "الفرصة لا تنتظر أحداً. ننفذ بسرعة منظمة بلا تردد ولا إطالة.",
  },
  {
    icon: HeartHandshake,
    title: "شراكة طويلة",
    text: "نتائجنا تتراكم — لذلك نعامل كل عميل كشريك، لا كصفقة.",
  },
];

const TEAM = [
  {
    name: "محمود رضوان",
    role: "المؤسس ومدير التسويق",
    initials: "م",
    color: "from-brand-400 to-aurora-600",
    bio: "خبرة 8 سنوات في التسويق الرقمي، قاد أكثر من 150 مشروعاً للصدارة المحلية.",
  },
  {
    name: "أحمد الشاذلي",
    role: "خبير خرائط Google",
    initials: "أ",
    color: "from-route-300 to-brand-600",
    bio: "متخصص Local SEO معتمد، يدير مئات الملفات التجارية في مصر والخليج.",
  },
  {
    name: "سلمى مصطفى",
    role: "مديرة الحملات الإعلانية",
    initials: "س",
    color: "from-aurora-400 to-aurora-600",
    bio: "أدارت ميزانيات إعلانية تفوق 20 مليون جنيه عبر Google وMeta وTikTok.",
  },
  {
    name: "كريم فوزي",
    role: "استراتيجي المحتوى والتحويل",
    initials: "ك",
    color: "from-gold-300 to-gold-500",
    bio: "يحوّل الزائر إلى عميل: صفحات هبوط، رسائل، ومسارات تحويل مبنية على البيانات.",
  },
];

export default function About() {
  usePageMeta(
    "من نحن",
    "تعرّف على دلّني: وكالة تسويق رقمي مصرية متخصصة في خرائط Google والظهور المحلي — قصتنا، قيمنا، وفريقنا.",
  );

  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title={
          <>
            قصتنا بدأت من سؤال واحد: <br />
            <span className="text-arc">«لماذا لا يجدني عملائي؟»</span>
          </>
        }
        subtitle="وُلدت دلّني من إحباط حقيقي: أنشطة تجارية ممتازة تختفي من خرائط Google بينما منافس أقل جودة يملأ هاتفه بالطلبات. قررنا تغيير هذا."
      />

      {/* ── Story ── */}
      <section className="py-16 md:py-24" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="border-arc glass-deep relative overflow-hidden rounded-[2rem] p-8 md:p-10">
                <div
                  className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-500/15 blur-[70px]"
                  aria-hidden="true"
                />
                <p className="relative font-mono text-xs tracking-widest text-gold-400" dir="ltr">
                  EST. 2020 — CAIRO
                </p>
                <h2 id="story-title" className="relative mt-4 font-display text-2xl font-extrabold text-mist-100 md:text-3xl">
                  من «دلّني على الطريق»… إلى «دلّني على عملائك»
                </h2>
                <div className="relative mt-6 space-y-4 text-[15px] leading-relaxed text-mist-400">
                  <p>
                    في 2020، وقفنا أمام عشرات الأنشطة التجارية التي تدفع إيجارات غالية، وتقدم
                    خدمة ممتازة… ومع ذلك يبحث عنها عملاؤها في كل مكان إلا حيث توجد فعلاً: نتائج
                    البحث الأولى.
                  </p>
                  <p>
                    بدأنا بملف تجاري واحد لمطعم صغير في المعادي. خلال ثلاثة شهور، انتقل من
                    الصفحة الثالثة إلى أول نتيجة، وارتفعت مكالماته ثلاثة أضعاف. منذ ذلك اليوم،
                    تخصصنا في ما نجيده فعلاً: <strong className="text-mist-200">الظهور المحلي وخرائط Google</strong>.
                  </p>
                  <p>
                    اليوم، ندير مئات الملفات التجارية والحملات الإعلانية لأنشطة في مصر والخليج،
                    لكن فلسفتنا لم تتغير: <strong className="text-mist-200">أرقام حقيقية، وشفافية كاملة،
                    وعملاء يبقون معنا لسنوات</strong> — لأن النتائج هي أصدق رسالة تسويقية.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          <RevealGroup className="grid grid-cols-2 gap-5">
            {STATS.map((s) => (
              <RevealItem key={s.label}>
                <div className="glass rounded-3xl p-7 text-center transition-colors duration-300 hover:border-brand-400/25">
                  <p className="font-mono text-3xl font-bold text-arc md:text-4xl" dir="ltr">
                    <AnimatedCounter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[13px] text-mist-400">{s.label}</p>
                </div>
              </RevealItem>
            ))}
            <RevealItem className="col-span-2">
              <div className="glass-deep border-arc relative flex items-center gap-5 rounded-3xl p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
                  <Compass className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-mist-300">
                  <strong className="font-display text-mist-100">رسالتنا:</strong> أن يجد كل
                  نشاط تجاري جيد العملاء الذين يستحقهم — عبر أنظمة تسويق صادقة وقابلة للقياس.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section className="py-16 md:py-24" aria-label="رسالتنا ورؤيتنا">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <article className="glass relative h-full overflow-hidden rounded-[2rem] p-9 md:p-12">
              <div className="absolute -top-14 -left-14 h-40 w-40 rounded-full bg-brand-500/12 blur-[60px]" aria-hidden="true" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow-brand">
                <Eye className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-extrabold text-mist-100">رؤيتنا</h3>
              <p className="relative mt-4 text-[15px] leading-relaxed text-mist-400">
                أن نكون الاسم الأول في الشرق الأوسط لتحسين الظهور المحلي — الشركة التي تضع
                أنشطة المنطقة كلها على خريطة النجاح، وتغيّر المعادلة: «الأنشطة الجيدة يجب أن
                تُرى دائماً».
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="glass relative h-full overflow-hidden rounded-[2rem] p-9 md:p-12">
              <div className="absolute -top-14 -left-14 h-40 w-40 rounded-full bg-gold-400/10 blur-[60px]" aria-hidden="true" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950 shadow-glow-gold">
                <Compass className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-extrabold text-mist-100">ما الذي نميز به أنفسنا؟</h3>
              <p className="relative mt-4 text-[15px] leading-relaxed text-mist-400">
                نحن وكالة متخصصة، لا وكالة «تفعل كل شيء»: تركيزنا على الخرائط والظهور المحلي
                يجعلنا أعمق معرفة وأدق تنفيذاً من أي فريق عام. كل تحسين عندنا مبني على خبرة
                مئات المشاريع، لا على نظريات منقولة.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 md:py-24" aria-labelledby="values-title">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="قيمنا"
            title={
              <span id="values-title">
                مبادئ لا <span className="text-gold-arc">نساوم</span> عليها
              </span>
            }
          />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <RevealItem key={v.title} className="h-full">
                <div className="group h-full rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/25">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-ink-800 text-gold-300 transition-colors duration-300 group-hover:border-gold-400/30">
                    <v.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-mist-100">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-400">{v.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 md:py-24" aria-labelledby="team-title">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="فريق العمل"
            title={
              <span id="team-title">
                ناس بتحب <span className="text-arc">شغلها</span>… بجد
              </span>
            }
            subtitle="فريق صغير متخصص — وليس جيشاً من المندوبين. لأن مشروعك يستحق أيدي خبراء، لا عمالة موسمية."
          />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <RevealItem key={m.name} className="h-full">
                <div className="glass group h-full rounded-3xl p-7 text-center transition-colors duration-300 hover:border-white/15">
                  <div className="relative mx-auto w-fit">
                    <span
                      className={cn(
                        "grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br font-display text-3xl font-extrabold text-white shadow-lg transition-transform duration-300 group-hover:scale-105",
                        m.color,
                      )}
                      aria-hidden="true"
                    >
                      {m.initials}
                    </span>
                    <span className="absolute inset-0 -z-10 rounded-full bg-brand-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-mist-100">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-300">{m.role}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-mist-400">{m.bio}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
