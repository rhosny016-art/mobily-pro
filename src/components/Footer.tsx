import { Clock, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { site, whatsappLink } from "../config/site";

const links = [
  { label: "الرئيسية", id: "home" },
  { label: "لماذا نحن", id: "why-us" },
  { label: "خدماتنا", id: "services" },
  { label: "كيف نعمل", id: "process" },
  { label: "شبكة دلني", id: "network" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a2438] pt-16 text-white" aria-label="تذييل الموقع">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <BrandMark light />
          <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-[#bfd2dd]">شريكك في بناء حضور رقمي محلي يلفت الانتباه ويقود إلى نمو حقيقي.</p>
          <div className="mt-6 flex gap-2">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستغرام"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-[#f4c363] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1bd55]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="لينكدإن"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-[#f4c363] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1bd55]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={whatsappLink("مرحباً فريق دلني، أرغب في حجز استشارة مجانية.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-[#f4c363] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1bd55]"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black text-[#f4c363]">روابط سريعة</h2>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm font-bold text-[#d3e1e8] transition hover:text-[#f4c363] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1bd55]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-black text-[#f4c363]">تواصل معنا</h2>
          <ul className="mt-5 space-y-4 text-sm font-bold text-[#d3e1e8]">
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 transition hover:text-[#f4c363] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1bd55]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#f4c363]" />
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={site.emailHref}
                className="flex items-center gap-3 transition hover:text-[#f4c363] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1bd55]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#f4c363]" />
                <span>{site.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-[#f4c363]" />
              <span>{site.cities}</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-[#f4c363]" />
              <span>{site.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-center text-xs font-bold text-[#8fabb9] sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} دلني. جميع الحقوق محفوظة.</span>
          <span>صُنع لنمو الأعمال المحلية.</span>
        </div>
      </div>
    </footer>
  );
}
