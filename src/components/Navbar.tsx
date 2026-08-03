import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowLeft, PhoneCall, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { EASE_OUT } from "@/lib/motion";

const LINKS = [
  { href: "/", label: "الرئيسية", id: "hero" },
  { href: "#services", label: "خدماتنا", id: "services" },
  { href: "#why-us", label: "لماذا نحن", id: "why-us" },
  { href: "#reviews", label: "آراء العملاء", id: "reviews" },
  { href: "#faq", label: "الأسئلة الشائعة", id: "faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = LINKS.map((l) => l.id).filter(Boolean);
      let current = "hero";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);

    if (href === "/") {
      e.preventDefault();
      if (pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        navigate("/", { state: { scrollTo: href.substring(1) } });
      } else {
        const target = document.getElementById(href.substring(1));
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 92;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#05081c]/85 backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_8px_40px_-10px_rgba(0,0,0,0.7)] py-2.5"
          : "bg-transparent border-b border-transparent py-4 md:py-5"
      }`}
    >
      {/* Reading progress bar */}
      <motion.div
        className="absolute top-0 right-0 left-0 h-[2px] origin-right bg-gradient-to-l from-blue-500 via-violet-500 to-cyan-400 z-10"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo (right in RTL) */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="دلّني - الرئيسية"
          >
            <Logo animated size={38} light />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1.5" dir="rtl">
            {LINKS.map((l) => {
              const active = activeSection === l.id;
              const isHome = l.href === "/";
              const onHome = pathname === "/";
              const isActive = isHome ? onHome : active;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`relative group px-4 py-2 rounded-xl font-bold text-sm transition-colors duration-300 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-blue-500/25 to-violet-500/15 border border-blue-400/25 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-blue-300" aria-hidden="true" />}
                    {l.label}
                  </span>
                  {/* animated underline on hover */}
                  <span className="absolute bottom-1 right-4 left-4 h-px bg-gradient-to-l from-blue-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300" />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={buildWhatsAppLink("مرحباً، أريد استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-2.5 text-sm"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              استشارة مجانية
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-trigger"
            type="button"
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
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
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-[#02040f]/80 backdrop-blur-md lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 z-50 flex h-dvh w-[86vw] max-w-[340px] flex-col bg-[#05081c]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl lg:hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <Link to="/" onClick={() => setOpen(false)} aria-label="دلّني - الرئيسية">
                  <Logo animated={false} light size={30} />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
                <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  القائمة
                </p>
                {LINKS.map((l, idx) => {
                  const active = activeSection === l.id && pathname === "/";
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.4, ease: EASE_OUT }}
                    >
                      <a
                        href={l.href}
                        onClick={(e) => handleNavClick(e, l.href)}
                        className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold transition-all mb-2 border ${
                          active
                            ? "bg-gradient-to-l from-blue-600/25 to-violet-600/15 text-white border-blue-400/30 shadow-[0_0_25px_-8px_rgba(59,130,246,0.6)]"
                            : "text-slate-400 border-transparent hover:text-white hover:bg-white/[0.06] hover:border-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              active ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" : "bg-slate-600 group-hover:bg-blue-400"
                            }`}
                          />
                          {l.label}
                        </span>
                        <ArrowLeft
                          className={`w-4 h-4 transition-transform duration-200 ${
                            active ? "text-blue-300 -translate-x-1" : "text-slate-600 group-hover:text-white group-hover:-translate-x-1"
                          }`}
                          aria-hidden="true"
                        />
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer CTA */}
              <div className="border-t border-white/[0.07] px-5 py-6 bg-gradient-to-t from-blue-950/30 to-transparent">
                <p className="text-xs text-slate-500 font-semibold mb-3 px-1">
                  البداية من هنا — استشارتك الأولى مجانية بالكامل
                </p>
                <a
                  href={buildWhatsAppLink("مرحباً، أريد استشارة مجانية 🙏")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
                  <span>استشارة مجانية عبر واتساب</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
