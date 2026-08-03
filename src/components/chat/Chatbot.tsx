import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "bot"; text: string };

const QUICK_REPLIES = [
  "باقات خرائط Google 📍",
  "كم يستغرق الظهور؟ ⏱️",
  "إدارة التقييمات ⭐",
  "حملات إعلانية 📣",
  "احجز استشارة مجانية 🤝",
];

const INTRO: Msg = {
  role: "bot",
  text: "أهلاً بك في **دلّني** 👋 أنا **دَلّوب**، مستشارك التسويقي الذكي.\n\nاسألني عن باقات الخرائط، التقييمات، الحملات الإعلانية — أو احجز استشارتك المجانية فوراً 🚀",
};

/** Minimal safe markdown-lite renderer: **bold**, • bullets, numbered lists, line breaks. */
function renderText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let listBuf: { kind: "ul" | "ol"; items: ReactNode[] } | null = null;
  let key = 0;

  const flushList = () => {
    if (listBuf) {
      nodes.push(
        <ul key={key++} className={listBuf.kind === "ul" ? "my-2 space-y-1" : "my-2 space-y-1"}>
          {listBuf.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>,
      );
      listBuf = null;
    }
  };

  const inline = (s: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    const re = /\*\*(.+?)\*\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let k = 0;
    while ((m = re.exec(s)) !== null) {
      if (m.index > last) parts.push(s.slice(last, m.index));
      parts.push(
        <strong key={k++} className="font-bold text-mist-100">
          {m[1]}
        </strong>,
      );
      last = m.index + m[0].length;
    }
    if (last < s.length) parts.push(s.slice(last));
    return parts;
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    const ul = line.match(/^[-•]\s+(.*)/);
    const ol = line.match(/^\d+[.)]\s+(.*)/);
    if (ul || ol) {
      if (!listBuf) listBuf = { kind: ul ? "ul" : "ol", items: [] };
      listBuf.items.push(<span>{inline((ul ?? ol)![1] ?? "")}</span>);
      continue;
    }
    flushList();
    nodes.push(
      <p key={key++} className="leading-relaxed">
        {inline(line)}
      </p>,
    );
  }
  flushList();
  return nodes;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    try {
      const history = messages
        .filter((m) => m !== INTRO)
        .map((m) => ({ role: m.role === "user" ? "user" : "model", message: m.text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حدث خطأ");
      setMessages((m) => [...m, { role: "bot", text: data.text }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "عذراً، حدث خطأ مؤقت في الاتصال بالمساعد 😅\n\nجرّب مرة أخرى، أو تواصل معنا مباشرة عبر واتساب.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "إغلاق مساعد دلّوب" : "افتح مساعد دلّوب"}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-aurora-600 text-white shadow-glow-brand"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Bot className="h-6 w-6" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full border-2 border-ink-950 bg-gold-400 text-[10px] font-black text-ink-950" aria-hidden="true">
            1
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="محادثة مساعد دلّوب"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-deep fixed bottom-24 right-4 z-40 flex h-[min(560px,calc(100svh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl shadow-card sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/8 bg-ink-900/60 px-5 py-4">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-aurora-600 text-white">
                <Bot className="h-5.5 w-5.5" aria-hidden="true" />
                <span className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-bold text-mist-100">دَلّوب — المساعد الذكي</p>
                <p className="text-[11px] text-emerald-300">متصل الآن · يرد خلال ثوانٍ</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق المحادثة"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-mist-400 transition-colors hover:text-mist-100"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-start" : "justify-end")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed",
                      m.role === "user"
                        ? "rounded-bl-md bg-gradient-to-l from-brand-500 to-brand-600 text-white"
                        : "rounded-br-md border border-white/8 bg-white/[0.05] text-mist-200",
                    )}
                  >
                    {renderText(m.text)}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-end">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-br-md border border-white/8 bg-white/[0.05] px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                        className="h-2 w-2 rounded-full bg-brand-300"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="sr-only">دلّوب يكتب…</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]" aria-hidden="true">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void send(q)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-mist-300 transition-colors hover:border-brand-400/40 hover:text-brand-300"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/8 p-3">
              <label htmlFor="chat-input" className="sr-only">
                اكتب رسالتك
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب سؤالك هنا…"
                autoComplete="off"
                className="flex-1 rounded-full border border-white/10 bg-ink-900/70 px-4 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 focus:border-brand-400/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="إرسال الرسالة"
                disabled={!input.trim() || typing}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-brand transition-all duration-300 enabled:hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-4.5 w-4.5 -scale-x-100" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
