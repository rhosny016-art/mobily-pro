import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, User, PenLine } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import AuroraBackground from "@/components/AuroraBackground";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/siteData";
import { EASE_OUT } from "@/lib/motion";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [category, setCategory] = useState("الكل");
  const posts = category === "الكل" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === category);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "top-[-10%] right-[15%] w-[480px] h-[480px]", color: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" },
            { className: "bottom-[-15%] left-[5%] w-[440px] h-[440px]", color: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)" },
          ]}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 glass border-blue-400/25 text-blue-200 text-sm font-bold px-5 py-2 rounded-full mb-7"
          >
            <PenLine className="w-4 h-4 text-cyan-300" aria-hidden="true" />
            المدونة
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            أفكار وأدوات <span className="text-gradient">تسويقية عملية</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: EASE_OUT }}
            className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            نصائح وأفكار حول التسويق الرقمي والظهور المحلي — من خبرتنا العملية إليك مباشرة.
          </motion.p>
        </div>
      </section>

      {/* ================= FILTERS + GRID ================= */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <AuroraBackground
          orbs={[
            { className: "bottom-[-15%] right-[20%] w-[500px] h-[500px]", color: "radial-gradient(circle, rgba(34,211,238,0.07), transparent 70%)" },
          ]}
          grid={false}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {BLOG_CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
                    active
                      ? "text-white"
                      : "text-slate-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-l from-blue-600 to-violet-600 border border-blue-400/40 shadow-[0_8px_25px_-8px_rgba(59,130,246,0.7)]"
                    />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: EASE_OUT }}
                  whileHover={{ y: -8 }}
                  className="group card-premium rounded-3xl overflow-hidden"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl">
                    <div className="relative overflow-hidden h-52">
                      <LazyImage
                        src={post.cover}
                        alt={post.title}
                        wrapperClassName="w-full h-full bg-slate-900 transition-transform duration-700 group-hover:scale-110"
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070c26] via-transparent to-transparent opacity-80" aria-hidden="true" />
                      {/* Glow sweep */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-blue-600/25 to-transparent transition-opacity duration-500" aria-hidden="true" />
                      <span className="absolute top-4 right-4 bg-[#070c26]/85 backdrop-blur-md text-blue-200 text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-400/25 shadow-lg z-10">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3.5">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-400/70" aria-hidden="true" />
                          {formatDate(post.published_date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-violet-400/70" aria-hidden="true" />
                          {post.author}
                        </span>
                      </div>
                      <h2 className="text-lg font-extrabold leading-snug text-white group-hover:text-blue-200 transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-2 font-medium">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-5 text-blue-300 font-black text-sm group-hover:gap-3.5 transition-all duration-300">
                        اقرأ المزيد
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
