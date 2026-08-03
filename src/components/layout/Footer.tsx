import { Link } from "react-router-dom";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { SVGProps } from "react";
import { NAV_LINKS, SERVICES, SITE, waLink } from "@/lib/constants";
import { LogoMark } from "@/components/ui/Logo";

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.2c0-.8.3-1.4 1.5-1.4h1.4V5.2c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.5H8.6V14h2.4v7h2.5z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const SOCIALS = [
  { label: "فيسبوك", href: "https://www.facebook.com/", icon: FacebookIcon },
  { label: "إنستغرام", href: "https://www.instagram.com/", icon: InstagramIcon },
  { label: "واتساب", href: waLink("مرحباً دلّني 👋"), icon: Phone },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-ink-900/40">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brand-500/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="دلّني — الرئيسية">
              <LogoMark className="h-10 w-10" />
              <span className="font-display text-2xl font-extrabold text-mist-100">
                دلّني<span className="text-gold-400">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-400">
              وكالة تسويق رقمي متكاملة نضع نشاطك على خريطة النجاح — من خرائط Google
              إلى الحملات الإعلانية المربحة.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-mist-400 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:text-brand-300 hover:shadow-glow-brand"
                >
                  <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="روابط الخدمات">
            <h3 className="font-display text-sm font-bold text-mist-100">خدماتنا</h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="text-sm text-mist-400 transition-colors duration-300 hover:text-brand-300"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="روابط الموقع">
            <h3 className="font-display text-sm font-bold text-mist-100">الموقع</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-mist-400 transition-colors duration-300 hover:text-brand-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold text-mist-100">تواصل معنا</h3>
            <ul className="mt-5 space-y-4 text-sm text-mist-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                {SITE.city}
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-300"
                  dir="ltr"
                >
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-brand-300" dir="ltr">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                {SITE.workingHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-7 sm:flex-row">
          <p className="text-xs text-mist-500">
            © {new Date().getFullYear()} وكالة دلّني للتسويق الرقمي — جميع الحقوق محفوظة
          </p>
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-mist-500" dir="ltr">
            {SITE.coordinates}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="العودة إلى الأعلى"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-mist-300 transition-all duration-300 hover:border-gold-400/40 hover:text-gold-300"
          >
            العودة للأعلى
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
