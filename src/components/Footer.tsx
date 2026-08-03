import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { getSiteSettings } from "@/lib/store";
import { DEFAULT_SETTINGS } from "@/lib/siteData";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const QUICK_LINKS = [
  { to: "/", label: "الرئيسية" },
  { to: "/services", label: "الخدمات" },
  { to: "/blog", label: "المدونة" },
  { to: "/about", label: "من نحن" },
];

const SERVICE_LINKS = [
  "إنشاء نشاط على خرائط Google",
  "تحسين الظهور المحلي",
  "حملات Google Ads",
  "إعلانات وسائل التواصل",
  "كتابة التعليقات والمراجعات",
];

export default function Footer() {
  const [s, setS] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    getSiteSettings().then(setS);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#04081c] text-white/80 border-t border-white/[0.06] overflow-hidden">
      {/* Animated gradient hairline on top */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-blue-500/60 to-transparent animate-gradient-x"
        style={{ backgroundSize: "200% 100%" }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-32 left-0 w-[400px] h-[400px] rounded-full bg-violet-600/[0.06] blur-[120px] pointer-events-none" aria-hidden="true" />

      {/* CTA strip */}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-14 md:pt-20">
        <div className="border-gradient-animated rounded-3xl px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_70px_-25px_rgba(37,99,235,0.4)]">
          <div className="text-center md:text-right">
            <h3 className="text-2xl md:text-4xl font-black text-white [text-wrap:balance]">
              جاهز تضع نشاطك على <span className="text-gradient-cyan">خريطة النجاح؟</span>
            </h3>
            <p className="mt-3 text-slate-400 font-medium max-w-xl mx-auto md:mx-0">
              تواصل معنا الآن واحصل على تقييم شامل لنشاطك واستشارة مجانية بالكامل.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-7 py-3.5 text-base"
            >
              <WhatsAppIcon className="w-5 h-5" />
              ابدأ الآن مجاناً
            </a>
            <Link to="/services" className="btn-ghost px-7 py-3.5 text-base">
              <Sparkles className="w-5 h-5 text-amber-300" aria-hidden="true" />
              استكشف الخدمات
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-14 md:py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light animated={false} />
          <p className="mt-5 text-sm leading-relaxed text-slate-400 font-medium">{s.footer_text}</p>
          <div className="flex gap-3 mt-7">
            {[
              { href: s.social_facebook, Icon: FacebookIcon, label: "فيسبوك", color: "hover:bg-[#1877F2]" },
              { href: s.social_instagram, Icon: InstagramIcon, label: "إنستجرام", color: "hover:bg-gradient-to-tr hover:from-amber-400 hover:via-pink-500 hover:to-purple-600" },
              { href: s.social_linkedin, Icon: LinkedinIcon, label: "لينكدإن", color: "hover:bg-[#0A66C2]" },
            ].map(({ href, Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-11 h-11 rounded-2xl bg-white/[0.05] flex items-center justify-center hover:text-white hover:scale-110 border border-white/10 transition-all duration-300 hover:shadow-[0_8px_25px_-8px_rgba(59,130,246,0.6)] ${color}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-extrabold mb-6 text-base flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-violet-500 inline-block" aria-hidden="true" />
            روابط سريعة
          </h4>
          <ul className="space-y-3.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-slate-400 hover:text-white hover:pr-1.5 inline-block transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-extrabold mb-6 text-base flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-400 to-blue-500 inline-block" aria-hidden="true" />
            خدماتنا
          </h4>
          <ul className="space-y-3.5 text-sm">
            {SERVICE_LINKS.map((label) => (
              <li key={label}>
                <Link
                  to="/services"
                  className="text-slate-400 hover:text-white hover:pr-1.5 inline-block transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-extrabold mb-6 text-base flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 inline-block" aria-hidden="true" />
            تواصل معنا
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 text-slate-400">
              <span className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-blue-400" aria-hidden="true" />
              </span>
              <span className="pt-1.5">{s.address}</span>
            </li>
            <li className="flex items-start gap-3 text-slate-400">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              </span>
              <span className="pt-1.5" dir="ltr">{s.phone}</span>
            </li>
            <li className="flex items-start gap-3 text-slate-400">
              <span className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-violet-400" aria-hidden="true" />
              </span>
              <span className="pt-1.5" dir="ltr">{s.email}</span>
            </li>
            <li className="flex items-start gap-3 text-slate-400">
              <span className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-400" aria-hidden="true" />
              </span>
              <span className="pt-1.5">{s.working_hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.06] bg-[#03060f]/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            © 2026 <span className="font-bold text-slate-300">دلّني</span> — جميع الحقوق محفوظة
          </span>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            <Link to="/about" className="hover:text-white transition-colors">من نحن</Link>
            <Link to="/blog" className="hover:text-white transition-colors">المدونة</Link>
            <Link to="/dashboard/login" className="hover:text-white transition-colors">لوحة التحكم</Link>
            <button
              onClick={backToTop}
              className="flex items-center gap-1.5 font-bold text-slate-300 hover:text-white transition-colors group"
              aria-label="العودة إلى الأعلى"
            >
              العودة للأعلى
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
