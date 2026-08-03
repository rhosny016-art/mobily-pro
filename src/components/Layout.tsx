import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { trackVisit, trackWhatsAppClick } from "@/lib/store";
import { EASE_OUT } from "@/lib/motion";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackVisit(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href.includes("wa.me")) {
        trackWhatsAppClick(pathname);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-xl"
      >
        الانتقال إلى المحتوى
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Page transition: fade + slide on route change */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
