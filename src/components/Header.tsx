import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { NAV_LINKS, SITE, WA_DEFAULT, scrollToSection } from "../lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // wait for the drawer to close before scrolling on mobile
    setTimeout(() => scrollToSection(id), open ? 250 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-slate-200/70 shadow-[0_8px_30px_rgba(2,20,50,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => go("hero")}
            aria-label="العودة إلى الرئيسية"
            className="transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            <Logo />
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition-all duration-200 hover:bg-slate-100/80 hover:text-slate-900"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30"
            >
              <WhatsAppIcon className="h-4 w-4" />
              استشارة مجانية
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="فتح القائمة"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 active:scale-95 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[86vw] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <Logo size={36} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 active:scale-90"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6" aria-label="قائمة الجوال">
                <p className="px-3 pb-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  قائمة التنقل
                </p>
                {NAV_LINKS.map((l, i) => (
                  <motion.button
                    key={l.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    onClick={() => go(l.id)}
                    className="block w-full rounded-2xl px-4 py-3.5 text-start text-[15px] font-extrabold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    {l.label}
                  </motion.button>
                ))}
              </nav>

              <div className="space-y-3 border-t border-slate-100 p-5">
                <a
                  href={`tel:+${SITE.phoneIntl}`}
                  className="flex items-center gap-2 text-sm font-black text-slate-700 transition hover:text-brand-600"
                >
                  <Phone className="h-4 w-4 text-brand-600" />
                  <span className="ltr-nums">{SITE.phoneDisplay}</span>
                </a>
                <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {SITE.workingHours}
                </p>
                <a
                  href={WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-600 text-base font-extrabold text-white shadow-xl shadow-brand-600/25 transition active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  استشارة مجانية عبر واتساب
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
