import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import { BLOG_POSTS } from "@/lib/siteData";
import type { JSX } from "react";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

/** عارض Markdown مبسّط: يدعم ## و ### والقوائم والفقرات */
function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={i} className="text-xl font-extrabold mt-8">
              {trimmed.replace(/^###\s*/, "")}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="text-2xl font-extrabold mt-10 pb-2 border-b border-border">
              {trimmed.replace(/^##\s*/, "")}
            </h2>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^-\s*/, ""));
          return (
            <ul key={i} className="space-y-2.5 pr-2">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                  <span className="w-2 h-2 rounded-full gradient-primary mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-foreground/80 leading-loose">
            {trimmed}
          </p>
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
      <section className="relative gradient-hero pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition">
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            العودة للمدونة
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block glass-card text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{post.title}</h1>
            <div className="flex items-center gap-5 mt-5 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {formatDate(post.published_date)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <LazyImage
            src={post.cover}
            alt={post.title}
            wrapperClassName="w-full h-48 sm:h-72 rounded-[24px] mb-10 shadow-lg overflow-hidden bg-slate-100"
            className="w-full h-full object-cover"
          />
          <MarkdownContent content={post.content} />

          {/* CTA */}
          <div className="mt-14 gradient-hero rounded-[24px] p-6 sm:p-9 text-center">
            <h2 className="text-2xl font-extrabold text-white">هل أعجبك المقال؟</h2>
            <p className="mt-3 text-white/70">دعنا نطبق هذه الأفكار على نشاطك — استشارتك الأولى مجانية.</p>
            <div className="mt-6">
              <WhatsAppButton size="md">احصل على استشارة مجانية</WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
