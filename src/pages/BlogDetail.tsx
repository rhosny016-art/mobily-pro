import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, BookOpenText } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import AuroraBackground from "@/components/AuroraBackground";
import { BLOG_POSTS } from "@/lib/siteData";
import { EASE_OUT } from "@/lib/motion";
import type { JSX } from "react";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

/** عارض Markdown مبسّط: يدعم ## و ### والقوائم والفقرات */
function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return (
            <motion.h3
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="text-xl font-extrabold mt-9 text-white flex items-center gap-3"
            >
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-400 to-violet-500 inline-block" aria-hidden="true" />
              {trimmed.replace(/^###\s*/, "")}
            </motion.h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="text-2xl font-extrabold mt-11 pb-3 text-white border-b border-white/[0.08]"
            >
              {trimmed.replace(/^##\s*/, "")}
            </motion.h2>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^-\s*/, ""));
          return (
            <ul key={i} className="space-y-3.5 pr-1">
              {items.map((item, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: j * 0.06, duration: 0.5, ease: EASE_OUT }}
                  className="flex items-start gap-3.5 text-slate-300 leading-relaxed font-medium"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-400/30 flex items-center justify-center mt-1 shrink-0" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-violet-500" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          );
        }
        return (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-slate-300 leading-[2] font-medium"
          >
            {trimmed}
          </motion.p>
        );
      })}
    </div>
  ) as JSX.Element;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "top-[-10%] left-[10%] w-[460px] h-[460px]", color: "radial-gradient(circle, rgba(37,99,235,0.2), transparent 70%)" },
            { className: "bottom-[-20%] right-[5%] w-[420px] h-[420px]", color: "radial-gradient(circle, rgba(139,92,246,0.13), transparent 70%)" },
          ]}
        />
        <div className="relative max-w-3xl mx-auto px-4 z-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold mb-7 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              العودة للمدونة
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65, ease: EASE_OUT }}>
            <span className="inline-flex items-center gap-1.5 glass border-blue-400/25 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              <BookOpenText className="w-3.5 h-3.5" aria-hidden="true" />
              {post.category}
            </span>
            <h1 className="text-3xl md:text-[2.7rem] font-black text-white leading-[1.3] [text-wrap:balance]">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 mt-6 text-sm text-slate-400 font-semibold">
              <span className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-black shadow-lg">
                  {post.author.replace("فريق ", "").slice(0, 2)}
                </span>
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400/80" aria-hidden="true" />
                {formatDate(post.published_date)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ARTICLE ================= */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "bottom-[-10%] right-[20%] w-[520px] h-[520px]", color: "radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)" },
          ]}
          grid={false}
        />
        <div className="relative max-w-3xl mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT }}
            className="relative"
          >
            {/* Glow frame */}
            <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-br from-blue-500/30 via-transparent to-violet-500/30 opacity-40 blur-sm" aria-hidden="true" />
            <LazyImage
              src={post.cover}
              alt={post.title}
              wrapperClassName="relative w-full h-56 sm:h-80 rounded-[28px] mb-12 overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="glass rounded-[28px] p-6 sm:p-10 relative">
            <div className="absolute top-0 right-10 left-10 h-px bg-gradient-to-l from-transparent via-blue-500/50 to-transparent" aria-hidden="true" />
            <MarkdownContent content={post.content} />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mt-14 border-gradient-animated rounded-[28px] p-8 sm:p-10 text-center relative overflow-hidden shadow-[0_25px_80px_-30px_rgba(37,99,235,0.5)]"
          >
            <div className="absolute -top-16 right-1/2 translate-x-1/2 w-56 h-56 rounded-full bg-blue-500/20 blur-[70px] pointer-events-none" aria-hidden="true" />
            <h2 className="relative text-2xl font-extrabold text-white">هل أعجبك المقال؟</h2>
            <p className="relative mt-3 text-slate-300 font-medium">
              دعنا نطبق هذه الأفكار على نشاطك — استشارتك الأولى مجانية.
            </p>
            <div className="relative mt-7 flex justify-center">
              <WhatsAppButton size="md">احصل على استشارة مجانية</WhatsAppButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
