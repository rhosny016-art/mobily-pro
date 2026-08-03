import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "@/components/chat/Chatbot";
import { WhatsappFloat } from "@/components/WhatsappFloat";

/**
 * Scroll manager: scrolls AFTER the page transition exits so the
 * user never sees a jump mid-fade. Hash anchors (#section) are
 * resolved once the new page is mounted.
 */
export function Layout() {
  const { pathname, hash } = useLocation();
  const pendingHash = useRef<string | null>(null);

  const resolveScroll = () => {
    const h = pendingHash.current;
    if (h) {
      pendingHash.current = null;
      const el = document.querySelector(h);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className="relative flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[200] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        تخطَّ إلى المحتوى الرئيسي
      </a>
      <Navbar />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          pendingHash.current = hash || null;
          // Let the incoming page's first paint settle before scrolling
          requestAnimationFrame(() => requestAnimationFrame(resolveScroll));
        }}
      >
        <motion.main
          key={pathname + hash}
          id="main"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Chatbot />
      <WhatsappFloat />
    </div>
  );
}
