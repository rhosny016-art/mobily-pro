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
        title="أفكار ورؤى من خبرتنا"
        subtitle="نصائح وأفكار حول التسويق الرقمي والظهور المحلي — من خبرتنا العملية إليك مباشرة."
      />

      <section className="relative py-12 md:py-16 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          {/* الفلاتر */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  category === c
                    ? "bg-gradient-to-r from-[#0066CC] to-[#1E40AF] text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-100"
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
                className="group relative bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative overflow-hidden h-52">
                    <LazyImage
                      src={post.cover}
                      alt={post.title}
                      wrapperClassName="w-full h-full bg-slate-100 transition-transform duration-500 group-hover:scale-105"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-4 right-4 bg-white/95 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm z-10">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {formatDate(post.published_date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{post.title}</h2>
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-blue-600 font-bold text-sm group-hover:gap-2.5 transition-all">
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
