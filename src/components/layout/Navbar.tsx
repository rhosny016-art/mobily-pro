import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, PhoneCall, X } from "lucide-react";
import { NAV_LINKS, waLink } from "@/lib/constants";
import { Wordmark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu + reset scroll on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-deep border-b border-white/6 py-3" : "bg-transparent py-5",
        )}
      >
        {/* Reading progress */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute bottom-0 right-0 h-[2px] w-full origin-right bg-gradient-to-l from-brand-400 via-aurora-400 to-gold-400"
        />
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8"
          aria-label="التنقل الرئيسي"
        >
          <Link to="/" aria-label="دلّني — الصفحة الرئيسية" className="shrink-0">
            <Wordmark />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                      isActive
                        ? "text-mist-100"
                        : "text-mist-400 hover:text-mist-100",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-brand-400/25 bg-brand-500/12"
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={waLink("مرحباً دلّني 👋 أرغب في استشارة مجانية")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-l from-brand-500 to-brand-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-glow-brand transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              استشارة مجانية
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-mist-100 transition-colors hover:border-brand-400/40 lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
          >
            <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full flex-col justify-center px-8 pt-20"
              aria-label="قائمة الجوال"
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between rounded-2xl px-5 py-4 font-display text-2xl font-bold transition-colors",
                          isActive ? "text-arc" : "text-mist-200 hover:text-mist-100",
                        )
                      }
                    >
                      {link.label}
                      <span className="font-mono text-xs text-mist-500" dir="ltr">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-8"
              >
                <a
                  href={waLink("مرحباً دلّني 👋 أرغب في استشارة مجانية")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-brand-500 to-brand-600 px-6 py-4 font-display text-base font-bold text-white shadow-glow-brand"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden="true" />
                  احجز استشارة مجانية
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
