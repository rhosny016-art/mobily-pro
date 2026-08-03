import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft, PhoneCall } from "lucide-react";
import Logo from "./Logo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = LINKS.map(l => l.id).filter(Boolean);
      let current = "hero";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    
    if (href.startsWith('#')) {
      e.preventDefault();
      if (pathname !== '/') {
        navigate('/', { state: { scrollTo: href.substring(1) } });
      } else {
        const target = document.getElementById(href.substring(1));
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent border-transparent py-5"
      } pointer-events-none`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Right Side (RTL): Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          >
            <Logo animated={true} light={true} size={40} />
          </Link>

          {/* Desktop Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2" dir="rtl">
            {LINKS.map((l) => {
              const active = activeSection === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-1.5 relative overflow-hidden group ${
                    active
                      ? "text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {active && (
                    <motion.div 
                      layoutId="nav_active_indicator"
                      className="absolute inset-0 bg-blue-600/20 rounded-xl border border-blue-500/30" 
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Left Side: CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={buildWhatsAppLink("مرحباً، أريد استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-3d-button inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              استشارة مجانية
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-trigger"
            type="button"
            className="lg:hidden pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white shadow-sm transition-all hover:bg-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-[#030712]/80 backdrop-blur-md pointer-events-auto lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 flex h-dvh w-[85vw] max-w-[320px] flex-col justify-between overflow-hidden bg-[#030712] border-l border-white/10 shadow-2xl pointer-events-auto lg:hidden"
              dir="rtl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <Link to="/" onClick={() => setOpen(false)}>
                  <Logo animated={false} light={true} size={32} />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">
                {LINKS.map((l, idx) => {
                  const active = activeSection === l.id;
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                    >
                      <a
                        href={l.href}
                        onClick={(e) => handleNavClick(e, l.href)}
                        className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold transition-all mb-2 ${
                          active
                            ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{l.label}</span>
                        <ArrowLeft className={`w-4 h-4 transition-transform duration-200 ${active ? "text-blue-400 -translate-x-1" : "text-gray-600 group-hover:text-white group-hover:-translate-x-1"}`} />
                      </a>
                    </motion.div>
                  );
                })}
              </div>
              <div className="border-t border-white/10 px-5 py-6 bg-gradient-to-t from-blue-900/10 to-transparent">
                <a
                  href={buildWhatsAppLink("مرحباً، أريد استشارة مجانية 🙏")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-3d-button flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-bold text-white transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
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
