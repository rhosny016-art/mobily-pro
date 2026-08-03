import { motion } from "framer-motion";
import { ArrowLeft, MapPin, PhoneCall, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { MapCanvas } from "./MapCanvas";
import { SITE, waLink } from "@/lib/constants";
import { wordReveal, stagger, EASE } from "@/lib/motion";
import { Stars } from "@/components/ui/Stars";
import { cn } from "@/lib/utils";

const HERO_WORDS = ["نضع", "عملك", "على", "خريطة", "النجاح"];

const TRUST_AVATARS = [
  { i: "أ", c: "from-aurora-400 to-brand-500" },
  { i: "م", c: "from-route-300 to-brand-500" },
  { i: "م", c: "from-gold-300 to-gold-500" },
  { i: "س", c: "from-brand-300 to-aurora-500" },
];

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 md:pt-28"
      aria-label="الترحيب"
    >
      {/* Backdrop: canvas map + aurora + grid */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,black,transparent)]" />
        <div className="grid-lines absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_72%_30%,rgba(46,107,255,0.20),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_18%_72%,rgba(139,92,246,0.13),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_88%_80%,rgba(34,211,238,0.09),transparent_60%)]" />
        <MapCanvas className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-14 xl:grid-cols-[1.15fr_0.85fr]">
          {/* ── Copy ── */}
          <motion.div
            variants={stagger(0.11, 0.15)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-7"
          >
            {/* Eyebrow */}
            <motion.span
              variants={wordReveal}
              className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-[13px] font-medium text-mist-300"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
              وكالة تسويق رقمي متكاملة — {SITE.city}
              <span className="hidden font-mono text-[11px] tracking-widest text-mist-500 sm:inline" dir="ltr">
                {SITE.coordinates}
              </span>
            </motion.span>

            {/* Headline */}
            <h1 className="font-display text-[2.65rem] font-extrabold leading-[1.15] tracking-tight text-mist-100 sm:text-6xl md:text-7xl">
              {HERO_WORDS.map((w, i) => (
                <motion.span
                  key={i}
                  variants={wordReveal}
                  className={cn(
                    "inline-block",
                    i === 3 && "text-arc",
                    i === 4 && "relative text-gold-arc",
                  )}
                >
                  {w}
                  {i < HERO_WORDS.length - 1 && <span>&nbsp;</span>}
                </motion.span>
              ))}
              <motion.span variants={wordReveal} className="mt-3 block">
                <span className="text-arc">من يبحث عنك</span>{" "}
                <span className="relative inline-block">
                  سيجدك
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 12"
                    className="absolute -bottom-2 right-0 w-full text-gold-400/70"
                    fill="none"
                  >
                    <path
                      d="M3 9C60 3 160 3 217 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </motion.span>
            </h1>

            {/* Sub */}
            <motion.p
              variants={wordReveal}
              className="max-w-xl text-base leading-relaxed text-mist-400 md:text-lg"
            >
              نُصعّد ظهور نشاطك على خرائط Google ومنصات الإعلانات — بحلول عملية،
              فريق متخصص، وتقارير شهرية تثبت أن كل جنيه استثمارك يعمل لصالحك.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={wordReveal} className="flex flex-wrap items-center gap-4">
              <a
                href={waLink("مرحباً دلّني 👋 أرغب في استشارة تسويقية مجانية لنشاطي")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-brand-500 to-brand-600 px-7 py-3.5 font-display text-[15px] font-bold text-white shadow-glow-brand transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <PhoneCall className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
                احجز استشارة مجانية
              </a>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 font-display text-[15px] font-bold text-mist-100 backdrop-blur transition-colors duration-300 hover:border-brand-400/40 hover:bg-white/[0.07]"
              >
                اكتشف خدماتنا
                <ArrowLeft className="h-4.5 w-4.5 text-mist-400 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-brand-300" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={wordReveal} className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5" aria-hidden="true">
                  {TRUST_AVATARS.map((a, i) => (
                    <span
                      key={i}
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full border-2 border-ink-950 bg-gradient-to-br text-[12px] font-bold text-white",
                        a.c,
                      )}
                    >
                      {a.i}
                    </span>
                  ))}
                </div>
                <div>
                  <Stars rating={5} />
                  <p className="mt-0.5 text-xs text-mist-400">
                    ثقة <span className="font-mono font-semibold text-mist-200" dir="ltr">+150</span> نشاط تجاري
                  </p>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden="true" />
              <p className="flex items-center gap-2 text-sm text-mist-400">
                <MapPin className="h-4 w-4 text-gold-400" aria-hidden="true" />
                ظهور محلي في مصر والخليج
              </p>
            </motion.div>
          </motion.div>

          {/* ── Floating dashboard cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
            className="relative hidden xl:block"
            aria-hidden="true"
          >
            <div className="relative mx-auto h-[560px] w-[480px]">
              {/* Main glass card — map rank */}
              <div className="glass-deep border-arc absolute top-0 right-0 w-[330px] rounded-3xl p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] tracking-widest text-mist-500" dir="ltr">
                    GOOGLE MAPS · LIVE
                  </p>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    مباشر
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/8 bg-ink-900/70 p-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold text-mist-100">
                      مطعم الذوق — المعادي
                    </p>
                    <p className="text-xs text-mist-400">تصنيف «مطعم» · القاهرة</p>
                  </div>
                  <span className="mr-auto rounded-full bg-gold-400/10 px-3 py-1 font-mono text-sm font-bold text-gold-300" dir="ltr">
                    #1
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { label: "الظهور الشهري", value: "48,200", pct: "+212%" },
                    { label: "نقرات الاتجاهات", value: "3,840", pct: "+164%" },
                    { label: "مكالمات واردة", value: "612", pct: "+96%" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <span className="text-mist-400">{row.label}</span>
                      <span className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-mist-100" dir="ltr">{row.value}</span>
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300" dir="ltr">
                          <TrendingUp className="h-3 w-3" />
                          {row.pct}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating review card */}
              <div className="glass animate-float absolute bottom-0 left-0 w-[280px] rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-sm font-bold text-ink-950">
                    م
                  </span>
                  <div>
                    <p className="text-sm font-bold text-mist-100">د. منى عبد الرحمن</p>
                    <p className="text-[11px] text-mist-400">عيادة أسنان</p>
                  </div>
                </div>
                <Stars rating={5} className="mt-3" />
                <p className="mt-2 text-[13px] leading-relaxed text-mist-400">
                  «التقييمات وصلت 4.8 والحجوزات تضاعفت — شكراً دلّني» 🙏
                </p>
              </div>

              {/* Floating rating chip */}
              <div className="glass-deep animate-float-slow absolute top-2 left-0 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-card">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-400/15 text-gold-300">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <div>
                  <p className="font-mono text-[15px] font-bold leading-none text-mist-100" dir="ltr">4.9 / 5</p>
                  <p className="mt-1 text-[10px] leading-none text-mist-400">تقييم عملائنا</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] text-mist-500">مرّر للأسفل</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-brand-400"
          />
        </span>
      </motion.div>
    </section>
  );
}
