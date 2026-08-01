import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { getSiteSettings } from "@/lib/store";
import { DEFAULT_SETTINGS } from "@/lib/siteData";

const FacebookIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
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
  return (
    <footer className="bg-[#060B24] text-white/80 border-t border-white/5 relative overflow-hidden">
      {/* توهج خلفي ناعم جداً */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light animated={false} />
          <p className="mt-5 text-sm leading-relaxed text-gray-400 font-medium">{s.footer_text}</p>
          <div className="flex gap-3 mt-6">
            {[
              { href: s.social_facebook, Icon: FacebookIcon, label: "فيسبوك" },
              { href: s.social_instagram, Icon: InstagramIcon, label: "إنستجرام" },
              { href: s.social_linkedin, Icon: LinkedinIcon, label: "لينكدإن" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:scale-110 border border-white/5 transition-all duration-300"
              >
                <Icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-extrabold mb-5 text-base">روابط سريعة</h4>
          <ul className="space-y-3 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-gray-400 hover:text-white hover:translate-x-[-4px] inline-block transition-all duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-extrabold mb-5 text-base">خدماتنا</h4>
          <ul className="space-y-3 text-sm">
            {SERVICE_LINKS.map((label) => (
              <li key={label}>
                <Link to="/services" className="text-gray-400 hover:text-white hover:translate-x-[-4px] inline-block transition-all duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-extrabold mb-5 text-base">تواصل معنا</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 text-gray-400">
              <MapPin className="w-4.5 h-4.5 text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{s.address}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-400">
              <Phone className="w-4.5 h-4.5 text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
              <span dir="ltr">{s.phone}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-400">
              <Mail className="w-4.5 h-4.5 text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
              <span dir="ltr">{s.email}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-400">
              <Clock className="w-4.5 h-4.5 text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{s.working_hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 relative z-10 bg-[#05081b]/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2026 دلّني — جميع الحقوق محفوظة</span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/about" className="hover:text-white transition-colors">من نحن</Link>
            <Link to="/blog" className="hover:text-white transition-colors">المدونة</Link>
            <Link to="/dashboard/login" className="hover:text-white transition-colors">لوحة التحكم</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
