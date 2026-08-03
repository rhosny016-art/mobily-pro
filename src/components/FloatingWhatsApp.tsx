import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) {
      setIsShaking(false);
      return;
    }

    const interval = setInterval(() => {
      setIsShaking(true);
      const timeout = setTimeout(() => setIsShaking(false), 850);
      return () => clearTimeout(timeout);
    }, 6000);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 z-50"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: -12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="absolute right-[calc(100%+14px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0b1437]/95 backdrop-blur-xl text-white text-sm font-bold px-4 py-2.5 rounded-2xl border border-white/10 shadow-2xl"
              >
                تواصل معنا الآن!
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0b1437] rotate-45 border-l border-b border-white/10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glow + ping rings */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#25D366" }} aria-hidden="true" />
          <span className="absolute -inset-2 rounded-full bg-[#25D366]/20 blur-lg" aria-hidden="true" />

          <motion.a
            href={buildWhatsAppLink("مرحباً، أريد الاستفسار عن خدماتكم 🙏")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل معنا عبر واتساب"
            className="relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl shadow-green-500/50 border border-white/20"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #0d9488 100%)",
            }}
            whileHover={{ scale: 1.12, rotate: 6 }}
            whileTap={{ scale: 0.92 }}
            animate={
              isShaking
                ? { x: [0, -3, 3, -3, 3, -2, 2, 0], rotate: [0, -4, 4, -4, 4, -2, 2, 0] }
                : { x: 0, rotate: 0 }
            }
            transition={{ duration: isShaking ? 0.75 : 0.2, ease: "easeInOut" }}
          >
            <WhatsAppIcon className="w-7 h-7 drop-shadow-md" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
