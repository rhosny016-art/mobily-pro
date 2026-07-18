import { Menu, Phone } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/Sheet";
import { Button } from "./ui/Button";
import { BrandMark } from "./BrandMark";

const navItems = [
  ["الرئيسية", "home"],
  ["لماذا نحن", "why-us"],
  ["خدماتنا", "services"],
  ["شبكتنا", "network"],
  ["آراء العملاء", "testimonials"],
  ["الأسئلة الشائعة", "faq"],
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-white/70 bg-white/75 px-4 shadow-[0_14px_40px_rgba(4,16,28,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:h-[68px] sm:px-6"
        aria-label="التنقل الرئيسي"
      >
        <BrandMark />
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map(([label, id], index) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={`text-sm font-bold transition-colors hover:text-[#c8912e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8912e] focus-visible:ring-offset-4 ${
                index === 0 ? "text-[#bf7d1c]" : "text-[#163553]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="hidden lg:block">
          <Button
            onClick={() => scrollToSection("contact")}
            className="h-10 rounded-full bg-[#c8912e] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(190,126,26,0.30)] transition hover:bg-[#ae761f] hover:shadow-[0_11px_24px_rgba(190,126,26,0.38)]"
          >
            <Phone className="ml-2 h-4 w-4" />
            استشارة مجانية
          </Button>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="فتح قائمة التنقل"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#0e2a47] transition hover:bg-[#f5eee0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8912e]"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" dir="rtl" className="w-[290px] border-l border-[#e7d6b4] bg-[#fbfcfd] p-5">
              <div className="mb-10">
                <BrandMark />
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map(([label, id]) => (
                  <SheetClose
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="rounded-xl px-4 py-3 text-right font-bold text-[#163553] transition hover:bg-[#f6efe2] hover:text-[#b8791d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8912e]"
                  >
                    {label}
                  </SheetClose>
                ))}
              </div>
              <SheetClose
                onClick={() => scrollToSection("contact")}
                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c8912e] font-bold text-white transition hover:bg-[#ae761f]"
              >
                <Phone className="ml-2 h-4 w-4" />
                احجز استشارتك المجانية
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
