import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import PageHero from "@/components/PageHero";
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
            <h3 key={i} className="text-xl font-extrabold mt-8 text-slate-900">
              {trimmed.replace(/^###\s*/, "")}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="text-2xl font-extrabold mt-10 pb-2 border-b border-slate-100 text-slate-900">
              {trimmed.replace(/^##\s*/, "")}
            </h2>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^-\s*/, ""));
          return (
            <ul key={i} className="space-y-2.5 pr-2">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-slate-600 leading-relaxed" dir="rtl">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-slate-600 leading-loose">
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
      <PageHero
        eyebrow="المدونة"
        title={post.title}
        subtitle={`${post.author} — ${formatDate(post.published_date)}`}
      />

      <section className="relative py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <LazyImage
            src={post.cover}
            alt={post.title}
            wrapperClassName="w-full h-48 sm:h-72 rounded-[24px] mb-10 shadow-lg shadow-slate-200/50 overflow-hidden bg-slate-100"
            className="w-full h-full object-cover"
          />
          <MarkdownContent content={post.content} />

          {/* CTA */}
          <div className="mt-14 relative rounded-[24px] overflow-hidden">
            {/* Deep-cobalt CTA band matching the brand hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC] to-[#1E40AF]" aria-hidden="true" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} aria-hidden="true" />
            <div className="relative rounded-[24px] p-6 sm:p-9 text-center text-white">
              <h2 className="text-2xl font-extrabold">هل أعجبك المقال؟</h2>
              <p className="mt-3 text-white/70">دعنا نطبق هذه الأفكار على نشاطك — استشارتك الأولى مجانية.</p>
              <div className="mt-6 flex justify-center">
                <WhatsAppButton size="md">احصل على استشارة مجانية</WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
