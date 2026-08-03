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
      const timeout = setTimeout(() => {
        setIsShaking(false);
      }, 850);
      return () => clearTimeout(timeout);
    }, 5000);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 left-6 z-50"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-xl"
              >
                تواصل معنا الآن!
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
          <motion.a
            href={buildWhatsAppLink("مرحباً، أريد الاستفسار عن خدماتكم 🙏")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل معنا عبر واتساب"
            className="relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl shadow-green-500/40"
            style={{ backgroundColor: "#25D366" }}
            whileHover={{ scale: 1.1 }}
            animate={
              isShaking
                ? {
                    x: [0, -3, 3, -3, 3, -2, 2, 0],
                    rotate: [0, -4, 4, -4, 4, -2, 2, 0],
                  }
                : { x: 0, rotate: 0 }
            }
            transition={{
              duration: isShaking ? 0.75 : 0.2,
              ease: "easeInOut",
            }}
          >
            <WhatsAppIcon className="w-7 h-7" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
