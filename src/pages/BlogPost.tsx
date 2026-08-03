import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3, Share2 } from "lucide-react";
import { POSTS, waLink } from "@/lib/constants";
import { usePageMeta } from "@/lib/usePageMeta";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/home/CtaSection";
import { cn } from "@/lib/utils";

function Block({
  h,
  p,
  ul,
  quote,
}: {
  h?: string;
  p?: string;
  ul?: string[];
  quote?: string;
}) {
  if (h) {
    return (
      <h2 className="mt-12 mb-4 font-display text-2xl font-extrabold text-mist-100">
        {h}
      </h2>
    );
  }
  if (p) {
    return <p className="my-5 text-[16.5px] leading-[1.95] text-mist-300">{p}</p>;
  }
  if (ul) {
    return (
      <ul className="my-6 space-y-3">
        {ul.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-mist-300">
            <span className="mt-[9px] h-2 w-2 shrink-0 rotate-45 rounded-[2px] bg-gradient-to-br from-brand-400 to-aurora-500" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (quote) {
    return (
      <blockquote className="border-arc relative my-10 overflow-hidden rounded-2xl bg-ink-900/70 p-7 md:p-9">
        <span className="absolute top-4 right-5 font-display text-6xl leading-none text-gold-400/30" aria-hidden="true">
          «
        </span>
        <p className="relative font-display text-lg font-bold leading-relaxed text-mist-100 md:text-xl">
          {quote}
        </p>
      </blockquote>
    );
  }
  return null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  usePageMeta(
    post?.title,
    post?.excerpt,
  );

  if (!post) return <Navigate to="/404" replace />;

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="relative pt-32 pb-20 md:pt-40">
        {/* Cover header */}
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-mist-400 transition-colors hover:text-brand-300"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              العودة إلى المدونة
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-xs font-bold text-brand-300">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-mist-500">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(post.date).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-mist-500">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime} قراءة
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.3] text-mist-100 md:text-5xl md:leading-[1.25]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-mist-400">{post.excerpt}</p>
          </motion.div>

          {/* Cover art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative mt-10 flex h-64 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br md:h-80",
              post.cover,
            )}
          >
            <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <svg
              aria-hidden="true"
              viewBox="0 0 400 120"
              className="absolute inset-x-0 bottom-8 h-24 w-full text-white/25"
              fill="none"
            >
              <path
                d="M0 70 C 80 25, 150 105, 220 55 S 340 40, 400 65"
                stroke="currentColor"
                strokeWidth="1.5"
                className="route-dash"
              />
              <circle cx="0" cy="70" r="4" fill="currentColor" />
              <circle cx="400" cy="65" r="4" fill="currentColor" />
            </svg>
            <span className="relative grid h-24 w-24 place-items-center rounded-[1.6rem] border border-white/25 bg-white/12 text-white shadow-xl backdrop-blur-md">
              <Icon name={post.icon} className="h-11 w-11" />
            </span>
          </motion.div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            {post.body.map((b, i) => (
              <Block key={i} {...b} />
            ))}
          </motion.div>

          {/* Share + CTA */}
          <div className="mt-14 flex flex-col items-center gap-6 rounded-3xl border border-white/8 bg-white/[0.03] p-8 text-center">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-mist-100">
              <Share2 className="h-5 w-5 text-gold-400" aria-hidden="true" />
              أفادك المقال؟ شاركه مع صاحب نشاط
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={waLink(`قرأت هذا المقال المفيد من دلّني 👇\n${post.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-l from-[#1DA851] to-[#25D366] px-6 py-3 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                مشاركة عبر واتساب
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/12 bg-white/[0.05] px-6 py-3 text-sm font-bold text-mist-100 transition-colors hover:border-brand-400/40"
              >
                مشاركة عبر فيسبوك
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="pb-20" aria-label="مقالات ذات صلة">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 className="mb-8 text-center font-display text-2xl font-extrabold text-mist-100">
              مقالات <span className="text-arc">ذات صلة</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group glass flex items-center gap-5 rounded-3xl p-5 transition-colors duration-300 hover:border-brand-400/25"
              >
                <span
                  className={cn(
                    "relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br text-white",
                    p.cover,
                  )}
                >
                  <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
                  <Icon name={p.icon} className="relative h-8 w-8" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold leading-snug text-mist-100 transition-colors group-hover:text-brand-300">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-mist-500">{p.readTime} قراءة</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
