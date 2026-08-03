import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "glass overflow-hidden rounded-2xl transition-colors duration-300",
              isOpen && "border-brand-400/30 bg-white/[0.05]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start md:px-7 md:py-5"
            >
              <span className="flex items-center gap-3.5">
                <span
                  className={cn(
                    "font-mono text-xs font-semibold",
                    isOpen ? "text-gold-400" : "text-mist-500",
                  )}
                  dir="ltr"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-base font-semibold text-mist-100 md:text-lg",
                    isOpen && "text-arc",
                  )}
                >
                  {item.q}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors",
                  isOpen
                    ? "border-gold-400/40 bg-gold-400/10 text-gold-300"
                    : "border-white/10 bg-white/[0.04] text-mist-400",
                )}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-mist-400 md:px-7 md:pb-6 md:pr-[3.9rem]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
