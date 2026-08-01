import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
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
      <section className="relative gradient-hero pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            مدونتنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg text-white/70"
          >
            نصائح وأفكار حول التسويق الرقمي والظهور المحلي — من خبرتنا العملية إليك مباشرة.
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* الفلاتر */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${
                  category === c ? "gradient-primary text-white shadow-lg shadow-primary/25" : "bg-muted text-foreground/70 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* الشبكة */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative overflow-hidden h-52">
                    <LazyImage
                      src={post.cover}
                      alt={post.title}
                      wrapperClassName="w-full h-full bg-slate-100 transition-transform duration-500 group-hover:scale-105"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-white/95 text-primary text-xs font-bold px-3 py-1.5 rounded-full z-10">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {formatDate(post.published_date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug group-hover:text-primary transition">{post.title}</h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-primary font-bold text-sm group-hover:gap-2.5 transition-all">
                      اقرأ المزيد
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
