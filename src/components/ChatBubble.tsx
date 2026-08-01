import { whatsappLink } from "../config/site";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function ChatBubble() {
  return (
    <a
      href={whatsappLink("مرحباً فريق دلني، أرغب في حجز استشارة مجانية لنشاطي التجاري.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="group fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-gradient-to-b from-[#2ee06f] to-[#16a34a] text-white shadow-[0_12px_26px_rgba(14,140,60,0.40),inset_0_1px_0_rgba(255,255,255,.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(14,140,60,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2ee06f]/40 sm:bottom-7 sm:left-7"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-[#2ee06f]/50 motion-reduce:hidden" />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0d304a] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-xl transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 sm:block"
      >
        تحدث معنا الآن
      </span>
    </a>
  );
}
