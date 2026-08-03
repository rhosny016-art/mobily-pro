import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { POSTS } from "@/lib/constants";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/home/CtaSection";
import { cn } from "@/lib/utils";

const CATEGORIES = ["الكل", ...Array.from(new Set(POSTS.map((p) => p.category)))];

function PostCover({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <div
      className={cn(
        "relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br",
        post.cover,
      )}
    >
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <svg
        aria-hidden="true"
        viewBox="0 0 300 100"
        className="absolute inset-x-0 bottom-6 h-16 w-full text-white/25"
        fill="none"
      >
        <path
          d="M0 60 C 60 20, 110 90, 160 45 S 260 30, 300 55"
          stroke="currentColor"
          strokeWidth="1.5"
          className="route-dash"
        />
      </svg>
      <span className="relative grid h-20 w-20 place-items-center rounded-3xl border border-white/25 bg-white/12 text-white shadow-lg backdrop-blur-md">
        <Icon name={post.icon} className="h-9 w-9" />
      </span>
      <span
        className="absolute top-4 left-4 rounded-full bg-ink-950/45 px-3 py-1 text-[11px] font-bold text-white backdrop-blur"
      >
        {post.category}
      </span>
    </div>
  );
}

export default function Blog() {
  usePageMeta(
    "المدونة",
    "مقالات وأدلة عملية من فريق دلّني: تحسين خرائط Google، التقييمات، الحملات الإعلانية، ونصائح التسويق الرقمي بالعربية.",
  );
  const [cat, setCat] = useState("الكل");
  const posts = useMemo(
    () => (cat === "الكل" ? POSTS : POSTS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <>
      <PageHero
        eyebrow="المدونة"
        title={
          <>
            معرفة عملية… <span className="text-arc">تترجمها أرباحاً</span>
          </>
        }
        subtitle="أدلة ونصائح من قلب الميدان — نكتبها لأننا نعيشها يومياً مع عملائنا، لا لأننا قرأناها."
      />

      <section className="py-12 md:py-20" aria-label="قائمة المقالات">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Filters */}
          <Reveal className="mb-12 flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={cn(
                  "relative rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors duration-300",
                  cat === c ? "text-mist-100" : "text-mist-400 hover:text-mist-200",
                )}
              >
                {cat === c && (
                  <motion.span
                    layoutId="blog-pill"
                    className="absolute inset-0 rounded-full border border-brand-400/30 bg-gradient-to-l from-brand-500/25 to-aurora-500/15"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </Reveal>

          {/* Grid */}
          <motion.div layout className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {posts.map((post) => (
                <motion.article
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group h-full"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="glass flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-brand-400/30"
                  >
                    <div className="overflow-hidden">
                      <div className="transition-transform duration-500 group-hover:scale-[1.04]">
                        <PostCover post={post} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-4 text-[11px] text-mist-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                          {new Date(post.date).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-lg font-bold leading-snug text-mist-100 transition-colors group-hover:text-brand-300">
                        {post.title}
                      </h2>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mist-400">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300">
                        اقرأ المقال
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
