import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, CheckCircle2, Clock, Mail, Phone, Send, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { site, whatsappLink } from "../config/site";

const businessTypes = ["مطعم أو كافيه", "عيادة أو مركز طبي", "متجر أو علامة تجارية", "شركة أو مكتب خدمات", "نشاط آخر"] as const;

type FormValues = {
  name: string;
  phone: string;
  business: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", phone: "", business: "", message: "" };

const fieldClass =
  "w-full rounded-2xl border bg-[#f8fafb] px-4 py-3 text-sm font-bold text-[#14324e] placeholder:font-medium placeholder:text-[#93a9b8] transition focus:bg-white focus:outline-none focus:ring-4";
const fieldTone = "border-[#e2eaef] focus:border-[#c8912e] focus:ring-[#e9c675]/30";
const fieldErrorTone = "border-[#d45b4f] focus:border-[#d45b4f] focus:ring-[#d45b4f]/15";

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "من فضلك أدخل اسمك الكامل.";
  const digits = values.phone.replace(/[^\d]/g, "");
  if (digits.length < 8) errors.phone = "من فضلك أدخل رقم جوال صحيح للتواصل.";
  if (!values.business) errors.business = "اختر نوع نشاطك التجاري.";
  return errors;
}

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [waHref, setWaHref] = useState("");

  const update = (key: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const text = [
      "مرحباً فريق دلني،",
      `أنا ${values.name.trim()}، صاحب/ة نشاط: ${values.business}.`,
      values.message.trim() ? `رسالتي: ${values.message.trim()}` : "أرغب في حجز استشارة مجانية.",
      `رقمي للتواصل: ${values.phone.trim()}`,
    ].join("\n");

    const href = whatsappLink(text);
    setWaHref(href);
    setSubmitted(true);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const channels = [
    {
      icon: WhatsAppIcon,
      title: "واتساب — الأسرع رداً",
      value: site.phoneDisplay,
      href: whatsappLink("مرحباً فريق دلني، أرغب في حجز استشارة مجانية."),
      ltr: true,
    },
    { icon: Phone, title: "اتصال مباشر", value: site.phoneDisplay, href: site.phoneHref, ltr: true },
    { icon: Mail, title: "البريد الإلكتروني", value: site.email, href: site.emailHref, ltr: false },
    { icon: Clock, title: "ساعات العمل", value: site.workingHours, href: undefined, ltr: false },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0d2f47] py-20 text-white sm:py-28" aria-labelledby="contact-title">
      {/* atmosphere */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(900px_480px_at_85%_0%, rgba(42,110,142,0.35), transparent 60%), radial-gradient(700px_420px_at_8%_100%, rgba(200,145,46,0.28), transparent 58%)",
        }}
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(125,185,215,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(125,185,215,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {/* copy + channels */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e3c27a]/40 bg-[#c8912e]/15 px-3 py-1.5 text-sm font-black text-[#f3c46a]">
            <Sparkles className="h-4 w-4" />
            المكان الصحيح يبدأ بخطوة
          </p>
          <h2 id="contact-title" className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-5xl">
            جاهز لتضع نشاطك على خريطة النجاح؟
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-8 text-[#c3d6e2] sm:text-lg">
            املأ النموذج أو راسلنا مباشرة، وسيتواصل معك مختص خلال يوم عمل واحد لتحليل وضعك الحالي — مجاناً وبدون أي التزام.
          </p>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {channels.map(({ icon: Icon, title, value, href, ltr }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#f3c46a]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-[#9db8c8]">{title}</span>
                    <span dir={ltr ? "ltr" : undefined} className="mt-1 block text-sm font-black text-white">
                      {value}
                    </span>
                  </span>
                </>
              );
              const rowClass =
                "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm transition";
              return (
                <li key={title}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`${rowClass} hover:border-[#e3c27a]/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1bd55]`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={rowClass}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-[#d5e4ee]">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#f3c46a]" />
              رد خلال أقل من 24 ساعة
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#f3c46a]" />
              الاستشارة الأولى مجانية بالكامل
            </span>
          </div>
        </motion.div>

        {/* form card */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[1.75rem] border border-white/40 bg-white p-6 text-[#102f4d] shadow-[0_30px_70px_rgba(3,15,26,0.45)] sm:p-8"
        >
          {submitted ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf6ed] text-[#1e9450]">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h3 className="mt-6 text-2xl font-black text-[#123553]">تم تجهيز طلبك بنجاح</h3>
              <p className="mt-3 max-w-sm text-sm font-medium leading-7 text-[#5c7488]">
                فتحنا لك محادثة واتساب لإتمام الإرسال. إن لم تُفتح تلقائياً،
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="font-black text-[#b5771d] underline underline-offset-4">
                  {" "}
                  اضغط هنا للمتابعة
                </a>
                .
              </p>
              <Button
                variant="outline"
                className="mt-7 rounded-full px-6"
                onClick={() => {
                  setSubmitted(false);
                  setValues(initialValues);
                }}
              >
                إرسال طلب آخر
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="text-xl font-black text-[#123553]">احجز استشارتك المجانية</h3>
              <p className="mt-2 text-sm font-medium text-[#5c7488]">أقل من دقيقة — وسنعود إليك بخطة واضحة.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-black text-[#3c5a72]">
                    الاسم الكامل
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="مثال: أحمد محمد"
                    value={values.name}
                    onChange={update("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`${fieldClass} ${errors.name ? fieldErrorTone : fieldTone}`}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" role="alert" className="mt-1.5 text-xs font-bold text-[#c24539]">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-black text-[#3c5a72]">
                    رقم الجوال
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    dir="ltr"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+20 1XX XXX XXXX"
                    value={values.phone}
                    onChange={update("phone")}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    className={`text-left ${fieldClass} ${errors.phone ? fieldErrorTone : fieldTone}`}
                  />
                  {errors.phone ? (
                    <p id="contact-phone-error" role="alert" className="mt-1.5 text-xs font-bold text-[#c24539]">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-business" className="mb-1.5 block text-xs font-black text-[#3c5a72]">
                    نوع النشاط التجاري
                  </label>
                  <select
                    id="contact-business"
                    value={values.business}
                    onChange={update("business")}
                    aria-invalid={Boolean(errors.business)}
                    aria-describedby={errors.business ? "contact-business-error" : undefined}
                    className={`${fieldClass} ${errors.business ? fieldErrorTone : fieldTone} ${values.business ? "" : "text-[#93a9b8]"} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%233c5a72%22 stroke-width=%222.5%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[position:left_1rem_center] bg-no-repeat pl-10`}
                  >
                    <option value="" disabled>
                      اختر نوع نشاطك
                    </option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type} className="text-[#14324e]">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.business ? (
                    <p id="contact-business-error" role="alert" className="mt-1.5 text-xs font-bold text-[#c24539]">
                      {errors.business}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-black text-[#3c5a72]">
                    رسالتك <span className="font-medium text-[#93a9b8]">(اختياري)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="حدثنا باختصار عن نشاطك وهدفك الحالي…"
                    value={values.message}
                    onChange={update("message")}
                    className={`${fieldClass} ${fieldTone} resize-none`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-6 h-[52px] w-full rounded-full bg-[#c48325] text-base font-black text-white shadow-[0_12px_25px_rgba(190,126,26,0.30),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#d8952f] hover:shadow-[0_18px_34px_rgba(190,126,26,0.42)]"
              >
                <Send className="ml-2 h-5 w-5" />
                أرسل طلب الاستشارة
              </Button>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-bold text-[#7b93a5]">
                <WhatsAppIcon className="h-4 w-4 text-[#1e9450]" />
                سيتم تحويلك إلى واتساب لتأكيد الطلب — مجاني وبدون أي التزام.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
