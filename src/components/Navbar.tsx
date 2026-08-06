import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import Logo from "./Logo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const SECTION_LINKS = [
  { href: "#services", label: "خدماتنا", id: "services" },
  { href: "#process", label: "كيف نعمل", id: "process" },
  { href: "#why-us", label: "لماذا نحن", id: "why-us" },
  { href: "#network", label: "شبكتنا", id: "network" },
  { href: "#reviews", label: "آراء العملاء", id: "reviews" },
  { href: "#faq", label: "الأسئلة الشائعة", id: "faq" },
];

const PAGE_LINKS = [
  { to: "/", label: "الرئيسية" },
  { to: "/services", label: "خدماتنا" },
  { to: "/blog", label: "المدونة" },
  { to: "/about", label: "من نحن" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }
    const onScroll = () => {
      const ids = SECTION_LINKS.map((l) => l.id);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("#")) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto w-full max-w-6xl rounded-full border transition-all duration-300 ${
          scrolled || open
            ? "bg-night-900/85 backdrop-blur-xl border-white/10 shadow-[0_12px_40px_-12px_rgba(4,7,14,0.8)]"
            : "bg-night-900/40 backdrop-blur-md border-white/8"
        }`}
      >
        <div className="flex h-14 md:h-16 items-center justify-between gap-2 px-3 sm:px-5">
          <Link to="/" aria-label="دلّني - الرئيسية" className="shrink-0">
            <Logo animated={!scrolled} light size={32} />
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
            {(isHome ? SECTION_LINKS : PAGE_LINKS).map((l) =>
              "href" in l ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleSectionClick(e, l.href)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    l.id === activeSection
                      ? "text-brass-300 bg-white/8"
                      : "text-slate-300/90 hover:text-white hover:bg-white/6"
                  }`}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 text-slate-300/90 hover:text-white hover:bg-white/6"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-extrabold text-night-950 bg-gradient-to-l from-brass-600 via-brass-500 to-brass-400 shadow-[0_8px_24px_-8px_rgba(237,155,47,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(237,155,47,0.9)] active:translate-y-0"
            >
              <PhoneCall className="w-4 h-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
              استشارة مجانية
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition hover:bg-white/12 active:bg-white/18"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-night-950/70 backdrop-blur-sm lg:hidden pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 z-50 flex h-dvh w-[86vw] max-w-[340px] flex-col bg-night-900 border-l border-white/8 lg:hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <Logo animated={false} light size={30} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white hover:bg-white/8"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5" aria-label="قائمة الجوال">
                {(isHome ? SECTION_LINKS : PAGE_LINKS).map((l, i) =>
                  "href" in l ? (
                    <motion.a
                      key={l.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                      href={l.href}
                      onClick={(e) => handleSectionClick(e, l.href)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-bold text-slate-200 transition hover:bg-white/6 hover:text-white"
                    >
                      <span>{l.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brass-500/0 transition-all" />
                    </motion.a>
                  ) : (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-bold text-slate-200 transition hover:bg-white/6 hover:text-white"
                      >
                        <span>{l.label}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-500/0 transition-all" />
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <div className="px-4 py-5 border-t border-white/8">
                <a
                  href={buildWhatsAppLink("مرحباً، أريد حجز استشارة مجانية 🙏")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-brass-600 via-brass-500 to-brass-400 px-4 py-3.5 text-sm font-extrabold text-night-950 shadow-[0_10px_30px_-8px_rgba(237,155,47,0.7)] active:scale-[0.98] transition-transform"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
                  استشارة مجانية عبر واتساب
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
