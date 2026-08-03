import { motion } from "framer-motion";
import { waLink } from "@/lib/constants";

export function WhatsappFloat() {
  return (
    <motion.a
      href={waLink("مرحباً دلّني 👋 أرغب في الاستفسار عن خدماتكم")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#2EEB6C] to-[#1DA851] text-white shadow-[0_10px_35px_-6px_rgba(37,211,102,0.55)]"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50"
        aria-hidden="true"
      />
      {/* WhatsApp glyph */}
      <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.02 3 3.34 8.68 3.34 15.7c0 2.24.59 4.43 1.71 6.36L3.2 29l7.13-1.87a12.6 12.6 0 0 0 5.7 1.37h.01c7.02 0 12.7-5.68 12.7-12.7 0-3.4-1.32-6.59-3.72-8.99A12.62 12.62 0 0 0 16.04 3zm0 23.33h-.01a10.5 10.5 0 0 1-5.35-1.46l-.38-.23-4.24 1.11 1.13-4.13-.25-.4a10.45 10.45 0 0 1-1.6-5.56c0-5.8 4.72-10.52 10.52-10.52 2.81 0 5.45 1.1 7.44 3.08a10.44 10.44 0 0 1 3.08 7.44c0 5.8-4.72 10.67-10.84 10.67zm5.77-7.88c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58a9.58 9.58 0 0 1-1.77-2.2c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.6 0 1.54 1.12 3.02 1.27 3.23.16.21 2.2 3.36 5.33 4.71.74.32 1.33.51 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-white/10 bg-ink-800/95 px-3.5 py-2 text-xs font-semibold text-mist-100 opacity-0 shadow-card backdrop-blur transition-all duration-300 group-hover:opacity-100">
        تواصل فوري معنا 👋
      </span>
    </motion.a>
  );
}
