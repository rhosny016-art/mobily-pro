import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { SERVICES, SITE, waLink } from "@/lib/constants";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MapCanvas } from "@/components/home/MapCanvas";
import { cn } from "@/lib/utils";

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "واتساب مباشر",
    value: SITE.whatsappDisplay,
    href: waLink("مرحباً دلّني 👋"),
    note: "الرد خلال دقائق في أوقات العمل",
    accent: "text-whatsapp",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: "نرد خلال 24 ساعة عمل",
    accent: "text-brand-300",
  },
  {
    icon: Clock,
    title: "أوقات العمل",
    value: SITE.workingHours,
    href: undefined,
    note: "السبت – الخميس",
    accent: "text-gold-300",
  },
  {
    icon: MapPin,
    title: "المقر",
    value: SITE.city,
    href: undefined,
    note: "نستقبلك بكل سرور بموعد مسبق",
    accent: "text-aurora-400",
  },
];

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/10 bg-ink-900/70 px-5 py-3.5 text-[15px] text-mist-100 placeholder:text-mist-500 transition-colors focus:border-brand-400/50 focus:outline-none";

export default function Contact() {
  usePageMeta(
    "تواصل معنا",
    "تواصل مع وكالة دلّني: واتساب مباشر، نموذج اتصال، أو زيارة المقر. احجز استشارتك التسويقية المجانية اليوم.",
  );

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title={
          <>
            جاهزون للرد… <span className="text-arc">وأنت جاهز للانطلاق</span>
          </>
        }
        subtitle="اترك رسالتك وسيعاودك مستشار تسويقي خلال أقل من ساعتي عمل — أو تواصل مباشرة عبر واتساب."
      />

      <section className="pb-24 md:pb-32" aria-label="نموذج التواصل">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Info cards */}
          <Reveal className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CARDS.map((c) => (
              <div
                key={c.title}
                className="glass group rounded-3xl p-6 transition-colors duration-300 hover:border-white/15"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-ink-800 transition-transform duration-300 group-hover:-translate-y-1">
                  <c.icon className={cn("h-6 w-6", c.accent)} aria-hidden="true" />
                </span>
                <h2 className="font-display text-sm font-bold text-mist-400">{c.title}</h2>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-1 block font-mono text-[15px] font-bold text-mist-100 transition-colors hover:text-brand-300"
                    dir="ltr"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 font-mono text-[15px] font-bold text-mist-100" dir="ltr">
                    {c.value}
                  </p>
                )}
                <p className="mt-2 text-xs text-mist-500">{c.note}</p>
              </div>
            ))}
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Form */}
            <Reveal>
              <div className="glass-deep border-arc relative overflow-hidden rounded-[2rem] p-8 md:p-10">
                <div
                  className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-brand-500/12 blur-[70px]"
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex min-h-[26rem] flex-col items-center justify-center gap-5 text-center"
                    >
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-400/12 text-emerald-300">
                        <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                      </span>
                      <h2 className="font-display text-2xl font-extrabold text-mist-100">
                        وصلتنا رسالتك! 🎉
                      </h2>
                      <p className="max-w-sm text-[15px] leading-relaxed text-mist-400">
                        سيعاودك مستشار تسويقي خلال أقل من ساعتي عمل. للرد الأسرع، تواصل معنا
                        مباشرة عبر واتساب.
                      </p>
                      <a
                        href={waLink("مرحباً دلّني 👋 أرسلت للتو نموذج التواصل وأرغب في رد أسرع")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-shine mt-2 rounded-full bg-gradient-to-l from-[#1DA851] to-[#25D366] px-7 py-3 font-display text-sm font-bold text-white"
                      >
                        تواصل فوري عبر واتساب
                      </a>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={onSubmit}
                      className="relative space-y-5"
                    >
                      <h2 className="font-display text-2xl font-extrabold text-mist-100">
                        أرسل استفسارك — <span className="text-arc">مجاناً وبدون التزام</span>
                      </h2>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-mist-300">
                            الاسم *
                          </label>
                          <input id="name" name="name" required placeholder="اسمك الكريم" className={INPUT_CLASS} />
                        </div>
                        <div>
                          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-mist-300">
                            رقم الهاتف *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            dir="ltr"
                            placeholder="01XXXXXXXXX"
                            className={INPUT_CLASS}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="service" className="mb-2 block text-sm font-semibold text-mist-300">
                          الخدمة المطلوبة
                        </label>
                        <select id="service" name="service" defaultValue="" className={cn(INPUT_CLASS, "appearance-none")}>
                          <option value="" disabled className="bg-ink-900">
                            اختر الخدمة…
                          </option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title} className="bg-ink-900">
                              {s.title}
                            </option>
                          ))}
                          <option value="other" className="bg-ink-900">
                            استشارة عامة / أخرى
                          </option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-mist-300">
                          رسالتك *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          placeholder="حدثنا عن نشاطك وما الذي تريد تحقيقه…"
                          className={cn(INPUT_CLASS, "resize-none")}
                        />
                      </div>
                      {error && (
                        <p className="rounded-2xl border border-red-400/25 bg-red-400/8 px-4 py-3 text-sm text-red-300">
                          تعذر إرسال الرسالة حالياً. جرّب التواصل المباشر عبر{" "}
                          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                            واتساب
                          </a>
                          .
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={sending}
                        className="btn-shine inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-l from-brand-500 to-brand-600 py-4 font-display text-base font-bold text-white shadow-glow-brand transition-all duration-300 enabled:hover:scale-[1.01] disabled:opacity-60 sm:w-auto sm:px-10"
                      >
                        <Send className="h-4.5 w-4.5 -scale-x-100" aria-hidden="true" />
                        {sending ? "جارٍ الإرسال…" : "أرسل الرسالة"}
                      </button>
                      <p className="text-xs text-mist-500">
                        بإرسالك الرسالة فأنت توافق على تواصل فريق دلّني معك عبر الهاتف أو واتساب.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Map panel */}
            <Reveal delay={0.1}>
              <div className="relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[2rem] border border-white/8 bg-ink-900/50">
                <MapCanvas className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" aria-hidden="true" />
                <div className="relative mt-auto p-8">
                  <div className="glass-deep rounded-3xl p-6">
                    <p className="font-mono text-[11px] tracking-widest text-mist-500" dir="ltr">
                      DALNI HQ — {SITE.coordinates}
                    </p>
                    <p className="mt-2 font-display text-xl font-extrabold text-mist-100">
                      نخدمك أينما كنت — <span className="text-arc">ونتصدر منطقتك</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-mist-400">
                      فريقنا يدير ملفات تجارية وحملات في مصر والخليج بالكامل عن بُعد — فلا
                      يهم أين يقع نشاطك، المهم أين يريد عملاؤك أن يجدوه.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
