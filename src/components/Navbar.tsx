<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowLeft, PhoneCall } from "lucide-react";
=======
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowLeft, PhoneCall, Sparkles } from "lucide-react";
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
import Logo from "./Logo";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { EASE_OUT } from "@/lib/motion";

const LINKS = [
  { href: "#hero", label: "الرئيسية", id: "hero" },
  { href: "#services", label: "خدماتنا", id: "services" },
  { href: "#why-us", label: "لماذا نحن", id: "why-us" },
  { href: "#network", label: "شبكتنا", id: "network" },
  { href: "#reviews", label: "آراء العملاء", id: "reviews" },
  { href: "#faq", label: "الأسئلة الشائعة", id: "faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { pathname } = useLocation();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
<<<<<<< HEAD
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (open) {
        setVisible(true);
      } else if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      
      setScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;

      // Section highlight
      const sections = LINKS.map(l => l.id);
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
=======
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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
          }
        }
      }
    };

<<<<<<< HEAD
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
=======
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
<<<<<<< HEAD
    if (pathname === "/") {
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(targetId);
=======
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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
        }
      }
    }
    setOpen(false);
  };

  return (
<<<<<<< HEAD
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 px-2 sm:px-3 md:px-8 pt-2 sm:pt-3 md:pt-4 pointer-events-none transform ${
      visible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"
    }`}>
      <div
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-[22px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-slate-800 sm:rounded-full"
      >
        <div className="flex h-14 items-center justify-between gap-2 px-3 py-1 sm:h-14 sm:px-4 md:h-16 md:px-7">
          {/* Logo on Right side in RTL */}
          <Link to="/" aria-label="دلّني - الرئيسية" className="flex items-center shrink-0">
            <Logo animated={!scrolled} light={false} size={34} />
          </Link>

          {/* Desktop Links in Center */}
=======
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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
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
<<<<<<< HEAD
                  className={`px-4 py-1.5 rounded-full font-bold text-xs md:text-sm transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? "text-amber-600 bg-amber-50/80 font-black"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  {l.label}
=======
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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                </a>
              );
            })}
          </nav>

<<<<<<< HEAD
          {/* Left Side: Golden Orange CTA */}
=======
          {/* Desktop CTA */}
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={buildWhatsAppLink("مرحباً، أريد استشارة مجانية 🙏")}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm text-white bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#EA580C] hover:from-[#EA580C] hover:to-[#D97706] shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
=======
              className="btn-primary px-6 py-2.5 text-sm"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
              استشارة مجانية
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-trigger"
            type="button"
<<<<<<< HEAD
            className="lg:hidden pointer-events-auto flex h-10 w-10 min-w-[44px] items-center justify-center rounded-full border border-slate-200/70 bg-white/90 p-2 text-slate-800 shadow-sm transition-all hover:bg-slate-100/90 hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 active:bg-slate-200/80"
=======
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
<<<<<<< HEAD
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5.5 h-5.5 text-slate-900" aria-hidden="true" />
=======
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
<<<<<<< HEAD
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-5.5 h-5.5 text-slate-900" aria-hidden="true" />
=======
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Mobile Drawer Sidebar Navigation */}
=======
      {/* Mobile drawer */}
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              id="mobile-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
<<<<<<< HEAD
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-md pointer-events-auto"
=======
              className="fixed inset-0 z-50 bg-[#02040f]/80 backdrop-blur-md lg:hidden"
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
            />

            <motion.div
              id="mobile-sidebar-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
<<<<<<< HEAD
              transition={{ type: "spring", damping: 26, stiffness: 210 }}
              className="fixed top-0 right-0 z-50 flex h-dvh w-full max-w-full flex-col justify-between overflow-hidden bg-white shadow-2xl pointer-events-auto sm:w-[85vw] sm:max-w-[320px]"
              dir="rtl"
            >
              <div className="flex items-center justify-between border-b border-slate-100/80 bg-white px-4 py-4 sm:px-5">
                <Link to="/" onClick={() => setOpen(false)} aria-label="دلّني - الرئيسية">
                  <Logo animated={false} light={false} size={32} />
=======
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 z-50 flex h-dvh w-[86vw] max-w-[340px] flex-col bg-[#05081c]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl lg:hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <Link to="/" onClick={() => setOpen(false)} aria-label="دلّني - الرئيسية">
                  <Logo animated={false} light size={30} />
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                </Link>
                <button
                  id="mobile-sidebar-close"
                  type="button"
                  onClick={() => setOpen(false)}
<<<<<<< HEAD
                  className="p-2 rounded-full text-slate-700 hover:bg-slate-100/80 active:bg-slate-200/70 transition-all flex items-center justify-center min-w-[38px] min-h-[38px] border border-slate-100"
=======
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

<<<<<<< HEAD
              <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6">
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">التنقل السريع</p>
                  <span className="rounded-full border border-amber-200/50 bg-amber-50 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-600">
                    دلّني
                  </span>
                </div>

=======
              {/* Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
                <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  القائمة
                </p>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                {LINKS.map((l, idx) => {
                  const active = activeSection === l.id && pathname === "/";
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
<<<<<<< HEAD
                      transition={{ delay: 0.04 + idx * 0.04, duration: 0.25 }}
=======
                      transition={{ delay: 0.05 * idx, duration: 0.4, ease: EASE_OUT }}
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                    >
                      <a
                        href={l.href}
                        onClick={(e) => handleNavClick(e, l.href)}
<<<<<<< HEAD
                        className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-extrabold transition-all sm:text-base ${
                          active
                            ? "border-r-4 border-amber-500 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent text-amber-700 shadow-xs"
                            : "text-slate-800 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {active && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
                          )}
                          <span>{l.label}</span>
                        </span>
                        <ArrowLeft
                          className={`w-4 h-4 transition-transform duration-200 ${
                            active
                              ? "text-amber-600 -translate-x-1"
                              : "text-slate-300 group-hover:text-slate-600 group-hover:-translate-x-1"
                          }`}
=======
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
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                        />
                      </a>
                    </motion.div>
                  );
                })}
              </div>

<<<<<<< HEAD
              <div className="border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-slate-100/90 px-4 py-4 sm:px-5">
=======
              {/* Footer CTA */}
              <div className="border-t border-white/[0.07] px-5 py-6 bg-gradient-to-t from-blue-950/30 to-transparent">
                <p className="text-xs text-slate-500 font-semibold mb-3 px-1">
                  البداية من هنا — استشارتك الأولى مجانية بالكامل
                </p>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
                <a
                  href={buildWhatsAppLink("مرحباً، أريد استشارة مجانية 🙏")}
                  target="_blank"
                  rel="noopener noreferrer"
<<<<<<< HEAD
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#EA580C] px-4 py-3.5 text-sm font-extrabold text-white shadow-md shadow-amber-500/20 transition-all hover:from-[#EA580C] hover:to-[#D97706] active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
=======
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
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


