import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { addRequest } from "@/lib/store";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/40 backdrop-blur-md";

export default function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: defaultSubject, message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[k];
        return copy;
      });
    }
  };

  const [error, setError] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.name.trim().length < 3) {
      newErrors.name = "يجب أن يكون الاسم 3 أحرف على الأقل";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح (مثال: you@example.com)";
    }
    if (form.phone.trim()) {
      const phoneRegex = /^[\d+\-\s()]{8,15}$/;
      if (!phoneRegex.test(form.phone.trim())) {
        newErrors.phone = "يرجى إدخال رقم هاتف صحيح (8 إلى 15 رقماً)";
      }
    }
    if (form.message.trim().length < 10) {
      newErrors.message = "يجب أن تحتوي الرسالة على 10 أحرف على الأقل";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setError("يرجى تصحيح الحقول المميزة بالأحمر أولاً.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addRequest(form);
      setSuccess(true);
    } catch {
      setError("حدث خطأ أثناء إرسال طلبك، برجاء المحاولة مرة أخرى أو التواصل عبر واتساب مباشرة.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-[26px] p-10 text-center border-emerald-400/20"
      >
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-extrabold text-white mb-2">تم إرسال طلبك بنجاح!</h3>
        <p className="text-slate-400 mb-7">سنتواصل معك في أقرب وقت ممكن.</p>
        <button
          onClick={() => {
            setSuccess(false);
            setForm({ name: "", email: "", phone: "", subject: defaultSubject, message: "" });
            setErrors({});
          }}
          className="text-blue-300 font-bold hover:text-blue-200 hover:underline transition-colors"
        >
          إرسال طلب آخر
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-[26px] p-7 space-y-4 border-white/10 shadow-[0_30px_90px_-30px_rgba(2,6,23,0.9)]">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5 text-slate-200">الاسم *</label>
          <input required value={form.name} onChange={set("name")} className={`${inputCls} ${errors.name ? "border-red-500/60 focus:ring-red-500/40" : ""}`} placeholder="اسمك الكامل" />
          {errors.name && <p className="text-xs text-red-400 mt-1 font-semibold">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5 text-slate-200">البريد الإلكتروني *</label>
          <input required type="email" value={form.email} onChange={set("email")} className={`${inputCls} ${errors.email ? "border-red-500/60 focus:ring-red-500/40" : ""}`} placeholder="you@example.com" dir="ltr" />
          {errors.email && <p className="text-xs text-red-400 mt-1 font-semibold">{errors.email}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5 text-slate-200">رقم الهاتف</label>
          <input value={form.phone} onChange={set("phone")} className={`${inputCls} ${errors.phone ? "border-red-500/60 focus:ring-red-500/40" : ""}`} placeholder="01xxxxxxxxx" dir="ltr" />
          {errors.phone && <p className="text-xs text-red-400 mt-1 font-semibold">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5 text-slate-200">الموضوع</label>
          <input value={form.subject} onChange={set("subject")} className={inputCls} placeholder="موضوع الرسالة" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1.5 text-slate-200">الرسالة *</label>
        <textarea required rows={4} value={form.message} onChange={set("message")} className={`${inputCls} ${errors.message ? "border-red-500/60 focus:ring-red-500/40" : ""}`} placeholder="اكتب رسالتك هنا..." />
        {errors.message && <p className="text-xs text-red-400 mt-1 font-semibold">{errors.message}</p>}
      </div>
      {error && (
        <div className="bg-red-500/10 text-red-300 text-sm font-semibold rounded-xl p-3 border border-red-500/20">{error}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3.5 rounded-2xl disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Send className="w-5 h-5" aria-hidden="true" />}
        {loading ? "جارٍ الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );
}
