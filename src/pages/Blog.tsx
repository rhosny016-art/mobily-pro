import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import LazyImage from "@/components/LazyImage";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/siteData";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [category, setCategory] = useState("الكل");
  const posts = category === "الكل" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        eyebrow="المدونة"
        title={
          <>
            رؤى ونصائح
            <span className="text-gradient-gold"> من خبرتنا العملية</span>
          </>
        }
        subtitle="نصائح وأفكار حول التسويق الرقمي والظهور المحلي — من خبرتنا العملية إليك مباشرة."
      />

      <section className="py-14 md:py-20 bg-fog min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  category === c
                    ? "bg-night-900 text-brass-300 shadow-card border border-night-700"
                    : "bg-white border border-line text-muted-foreground hover:text-night-900 hover:border-brass-500/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[24px] border border-line overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 hover:border-brass-500/30"
              >
                <Link to={`/blog/${post.slug}`} className="block h-full flex flex-col">
                  <div className="relative overflow-hidden h-52">
                    <LazyImage
                      src={post.cover}
                      alt={post.title}
                      wrapperClassName="w-full h-full bg-slate-100 transition-transform duration-500 group-hover:scale-105"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur text-night-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-white/60 z-10">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brass-500" aria-hidden="true" />
                        {formatDate(post.published_date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brass-500" aria-hidden="true" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-night-900 group-hover:text-night-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-5 text-brass-600 font-extrabold text-sm group-hover:gap-3 transition-all">
                      اقرأ المزيد
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-muted-foreground font-bold py-16">لا توجد مقالات في هذا التصنيف بعد.</p>
          )}
        </div>
      </section>
    </>
  );
}
