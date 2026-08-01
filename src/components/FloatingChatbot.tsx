import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  User,
  Send,
  X,
  Sparkles,
  MessageSquare,
  AlertCircle,
  ChevronDown,
  MapPin,
  Megaphone,
  CreditCard,
  PhoneCall,
  RefreshCw,
  ArrowUpRight
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

const CATEGORIES = [
  { id: "maps", label: "📍 خرائط جوجل", icon: MapPin, color: "text-[#0066CC] bg-[#0066CC]/5 border-[#0066CC]/15" },
  { id: "ads", label: "📣 حملات إعلانية", icon: Megaphone, color: "text-[#10B981] bg-[#10B981]/5 border-[#10B981]/15" },
  { id: "pricing", label: "💰 باقات وأسعار", icon: CreditCard, color: "text-[#F97316] bg-[#F97316]/5 border-[#F97316]/15" },
  { id: "contact", label: "📞 حجز واستشارة", icon: PhoneCall, color: "text-[#8B5CF6] bg-[#8B5CF6]/5 border-[#8B5CF6]/15" }
];

const CATEGORIZED_SUGGESTIONS: Record<string, string[]> = {
  maps: [
    "كيف أحسن ترتيب نشاطي على الخرائط؟ 📍",
    "كيف تعمل خدمة كتابة المراجعات لرفع التقييم؟ ⭐",
    "هل تضمنون تصدر الخريطة في نتائج البحث؟ 🔍",
  ],
  ads: [
    "ما هي منصات الإعلانات التي تديرونها؟ 📣",
    "كيف تضمنون حملات إعلانية مربحة للمشروع؟ 📈",
    "هل تقدمون تقارير دورية لأداء الإعلانات؟ 📊",
  ],
  pricing: [
    "ما هي أسعار باقات تحسين خرائط جوجل؟ 💰",
    "هل توجد باقة مخصصة للمشاريع الناشئة؟ 🏪",
    "ما هي شروط البدء وطرق الدفع المتاحة؟ 💳",
  ],
  contact: [
    "أريد تواصل مباشر مع مستشار تسويقي 📞",
    "كيف يمكنني حجز استشارة مجانية؟ 🤝",
    "أين يقع مقر وكالة دلّني وكيف نتواصل؟ 🏢",
  ]
};

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("maps");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "مرحباً بك! أنا **دَلّوب** 🤖 المساعد الذكي لوكالة **دلّني** للتسويق الرقمي.\n\nيسعدني جداً مساعدتك في تطوير عملك وزيادة مبيعاتك! كيف يمكنني خدمتك اليوم؟\n\nيمكنك الاستفسار عن باقاتنا، أو كيفية تحسين ظهورك على خرائط Google، أو كيفية إدارة حملاتك الإعلانية بشكل مربح. 🚀",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBadge, setShowBadge] = useState(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Hide invitation badge after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Map state messages to API expected history
      const historyPayload = messages.map((m) => ({
        role: m.role,
        message: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "فشل الاتصال بالخادم الذكي");
      }

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: "model",
        text: data.text || "عذراً، لم أتمكن من صياغة رد مناسب.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errMsg = err.message || "";
      if (errMsg.includes("denied access") || errMsg.includes("PERMISSION_DENIED") || errMsg.includes("403")) {
        setError("عذراً، مفتاح واجهة برمجة تطبيقات Gemini الحالي يواجه قيوداً من قِبل Google (تم رفض وصول المشروع). يرجى التحقق من المفتاح أو تغييره في الإعدادات (Settings > Secrets).");
      } else {
        setError(errMsg || "عذراً، حدث خطأ غير متوقع. يرجى التأكد من تكوين مفتاح API.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "مرحباً بك! أنا **دَلّوب** 🤖 المساعد الذكي لوكالة **دلّني** للتسويق الرقمي.\n\nيسعدني جداً مساعدتك في تطوير عملك وزيادة مبيعاتك! كيف يمكنني خدمتك اليوم؟\n\nيمكنك الاستفسار عن باقاتنا، أو كيفية تحسين ظهورك على خرائط Google، أو كيفية إدارة حملاتك الإعلانية بشكل مربح. 🚀",
        timestamp: new Date()
      }
    ]);
    setError(null);
    setShowConfirmReset(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Minimize chat to let user view the page
    }
  };

  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Basic formatting helpers
      const isBulletList = line.trim().startsWith("-") || line.trim().startsWith("*");
      const isNumberedList = /^\d+\.\s/.test(line.trim());

      let displayLine = line;
      if (isBulletList) {
        displayLine = line.trim().substring(1).trim();
      } else if (isNumberedList) {
        displayLine = line.trim().replace(/^\d+\.\s/, "").trim();
      }

      // Regex for bold text **text** -> <strong>text</strong>
      const parts = [];
      let currentText = displayLine;
      const boldRegex = /\*\*(.*?)\*\*/g;

      let match;
      let lastIndex = 0;

      while ((match = boldRegex.exec(currentText)) !== null) {
        if (match.index > lastIndex) {
          parts.push(currentText.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-bold text-slate-900">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < currentText.length) {
        parts.push(currentText.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : displayLine;

      if (isBulletList) {
        return (
          <li key={lineIdx} className="list-disc mr-4 mb-1 text-sm leading-relaxed text-slate-700">
            {content}
          </li>
        );
      }
      if (isNumberedList) {
        return (
          <li key={lineIdx} className="list-decimal mr-4 mb-1 text-sm leading-relaxed text-slate-700">
            {content}
          </li>
        );
      }
      return (
        <p key={lineIdx} className="mb-1 text-sm leading-relaxed text-slate-700 min-h-[0.5rem]">
          {content}
        </p>
      );
    });
  };

  return (
    <div id="floating-chatbot-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Conversation Drawer / Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="mb-4 w-[360px] sm:w-[410px] h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl shadow-slate-400/80 flex flex-col border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-l from-primary via-primary to-primary-hover px-4 py-4 text-white flex items-center justify-between shadow-md relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 animate-pulse-subtle">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base leading-tight flex items-center gap-1.5">
                    دَلّوب — المساعد الذكي
                    <Sparkles className="w-3.5 h-3.5 text-accent animate-spin-slow" />
                  </h3>
                  <span className="text-[11px] text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                    مستشار تسويق وكالة دلّني • متصل
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {/* Reset Chat Button */}
                <button
                  onClick={() => setShowConfirmReset(!showConfirmReset)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  title="إعادة بدء المحادثة"
                  aria-label="إعادة بدء المحادثة"
                >
                  <RefreshCw className="w-4 h-4 text-white/90 hover:text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="إغلاق المحادثة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Confirm Reset Overlap */}
              <AnimatePresence>
                {showConfirmReset && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-x-0 bottom-0 top-0 bg-slate-900/95 z-20 flex items-center justify-between px-5 text-white"
                  >
                    <span className="text-xs font-semibold">هل تود إعادة بدء المحادثة ومسح السجل؟</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleResetChat}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        نعم، مسح
                      </button>
                      <button
                        onClick={() => setShowConfirmReset(false)}
                        className="bg-white/20 hover:bg-white/30 text-white text-[11px] px-3 py-1.5 rounded-lg transition-all"
                      >
                        إلغاء
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
              {messages.map((msg) => {
                const isModel = msg.role === "model";
                
                // Smart CTA trigger analysis inside the message bubble
                const textLower = msg.text;
                const showWhatsAppBtn = isModel && (textLower.includes("واتساب") || textLower.includes("الواتساب") || textLower.includes("تواصل مباشر"));
                const showContactBtn = isModel && (textLower.includes("نموذج الاتصال") || textLower.includes("النموذج") || textLower.includes("تواصل معنا") || textLower.includes("بياناته"));
                const showServicesBtn = isModel && (textLower.includes("باقات") || textLower.includes("الباقة") || textLower.includes("الباقات") || textLower.includes("الخدمات"));

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex gap-2.5 max-w-[88%] ${
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8.5 h-8.5 rounded-full flex items-center justify-center flex-shrink-0 border shadow-sm ${
                          msg.role === "user"
                            ? "bg-secondary/15 border-secondary/25 text-secondary"
                            : "bg-primary/10 border-primary/20 text-primary"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-4.5 h-4.5" />
                        ) : (
                          <Bot className="w-4.5 h-4.5" />
                        )}
                      </div>

                      {/* Bubble Container */}
                      <div className="flex flex-col gap-1">
                        {/* Bubble */}
                        <div
                          className={`p-3.5 rounded-2xl text-slate-800 text-sm shadow-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-secondary text-white rounded-tr-none"
                              : "bg-white rounded-tl-none border border-slate-100"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <p className="whitespace-pre-line text-white font-medium">{msg.text}</p>
                          ) : (
                            <div>{renderMessageContent(msg.text)}</div>
                          )}
                          
                          <span
                            className={`text-[10px] mt-1.5 block text-left ${
                              msg.role === "user" ? "text-white/70" : "text-slate-400"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>

                        {/* Interactive In-Message CTA Buttons */}
                        {isModel && (showWhatsAppBtn || showContactBtn || showServicesBtn) && (
                          <div className="flex flex-col gap-1.5 mt-1.5">
                            {showWhatsAppBtn && (
                              <a
                                href={buildWhatsAppLink(`مرحباً دَلّوب، تواصلت معك على الموقع وأود استشارة مباشرة بخصوص خدماتكم 🙏`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-sm transition-all hover:scale-[1.01]"
                              >
                                تواصل معنا مباشرة عبر الواتساب 💬
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {showContactBtn && (
                              <button
                                onClick={() => scrollToSection("contact-section")}
                                className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-sm transition-all hover:scale-[1.01]"
                              >
                                انتقل إلى نموذج الاتصال ✉️
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {showServicesBtn && (
                              <button
                                onClick={() => scrollToSection("services-section")}
                                className="inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-sm transition-all hover:scale-[1.01]"
                              >
                                استعرض باقاتنا وخدماتنا 📂
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-end">
                  <div className="flex gap-2.5 max-w-[85%] items-center">
                    <div className="w-8.5 h-8.5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    <div className="bg-white border border-slate-100 py-3.5 px-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error indicator */}
              {error && (
                <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-xl flex items-start gap-2.5 text-rose-700 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
                  <div>
                    <p className="font-semibold mb-1 text-[13px]">تنبيه بخصوص مفتاح الـ API</p>
                    <p className="text-[11px] text-rose-600 leading-normal">{error}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Categorized Interactive Quick Suggestions Panel */}
            {!isLoading && (
              <div className="bg-slate-50 p-3 border-t border-slate-100 flex flex-col gap-2">
                {/* Categories Tabs */}
                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none" dir="rtl">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all shrink-0 select-none ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-sm"
                            : `${cat.color} text-slate-600 hover:bg-slate-100`
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Suggestions List for Active Category */}
                <div className="flex overflow-x-auto gap-1.5 py-1 scrollbar-none" dir="rtl">
                  {CATEGORIZED_SUGGESTIONS[activeCategory].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm transition-all shrink-0 hover:scale-[1.01] active:scale-95"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسأل دَلّوب عن خدمات دلّني..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-xl bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg shadow-primary/25 disabled:bg-slate-200 disabled:shadow-none disabled:text-slate-400 transition-all transform active:scale-95 flex-shrink-0"
                aria-label="إرسال الرسالة"
              >
                <Send className="w-5 h-5 rotate-180" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button & Badge Group */}
      <div className="flex items-center gap-3">
        {/* Invitation Badge */}
        <AnimatePresence>
          {showBadge && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="bg-white/95 backdrop-blur shadow-2xl border border-slate-100 rounded-2xl py-2.5 px-4 text-right select-none flex items-center gap-2.5 pointer-events-auto cursor-pointer hover:border-slate-200 transition-all"
              onClick={() => {
                setIsOpen(true);
                setShowBadge(false);
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
              <div className="text-xs">
                <p className="font-bold text-slate-800">هل تحتاج لمساعدة؟</p>
                <p className="text-slate-500 mt-0.5">تحدث مع دَلّوب، مستشارنا الذكي! 🤖✨</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBadge(false);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-100"
                aria-label="إغلاق التنبيه"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating trigger button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowBadge(false);
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all relative ${
            isOpen
              ? "bg-slate-800 hover:bg-slate-900 shadow-slate-800/30 rotate-90"
              : "bg-primary hover:bg-primary/95 shadow-primary/30"
          }`}
          aria-label="افتح المساعد الذكي"
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-[9px] font-bold text-white flex items-center justify-center rounded-full animate-bounce">
                1
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
