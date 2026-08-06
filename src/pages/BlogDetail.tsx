import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Calendar, User, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import LazyImage from "@/components/LazyImage";
import { BLOG_POSTS } from "@/lib/siteData";

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
            <h3 key={i} className="text-xl font-extrabold mt-8 text-night-900">
              {trimmed.replace(/^###\s*/, "")}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="text-2xl font-extrabold mt-10 pb-2 border-b border-line text-night-900">
              {trimmed.replace(/^##\s*/, "")}
            </h2>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^-\s*/, ""));
          return (
            <ul key={i} className="space-y-2.5 pr-2">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-foreground/85 leading-relaxed font-medium">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-l from-brass-400 to-brass-600 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-foreground/80 leading-loose font-medium">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={
          <span className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-brass-400" aria-hidden="true" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brass-400" aria-hidden="true" />
              {formatDate(post.published_date)}
            </span>
          </span>
        }
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-brass-600 transition-colors mb-8"
          >
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            العودة للمدونة
          </Link>

          <Reveal>
            <LazyImage
              src={post.cover}
              alt={post.title}
              wrapperClassName="w-full h-56 sm:h-80 rounded-[26px] mb-10 shadow-card-lg overflow-hidden bg-slate-100"
              className="w-full h-full object-cover"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <MarkdownContent content={post.content} />
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.1}>
            <div className="mt-14 rounded-[26px] bg-night-950 relative overflow-hidden p-8 sm:p-10 text-center">
              <div className="absolute inset-0 bg-night-grid opacity-40" aria-hidden="true" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-brass-500/15 blur-[110px] pointer-events-none" aria-hidden="true" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-brass-300 glass-dark px-4 py-1.5 rounded-full mb-5">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  هل أعجبك المقال؟
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  دعنا نطبق هذه الأفكار على نشاطك
                </h2>
                <p className="mt-3 text-slate-300/85 font-medium">استشارتك الأولى مجانية بالكامل.</p>
                <div className="mt-7">
                  <WhatsAppButton size="md" variant="green">
                    احصل على استشارة مجانية
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
