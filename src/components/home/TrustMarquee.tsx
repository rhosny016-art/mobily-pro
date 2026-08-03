const ITEMS = [
  "خرائط Google",
  "Google Ads",
  "Local SEO",
  "إعلانات Instagram",
  "إعلانات TikTok",
  "إعلانات Snapchat",
  "إدارة التقييمات",
  "الظهور المحلي",
];

/**
 * Infinite marquee strip of service keywords — pure CSS transform animation.
 */
export default function TrustMarquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <section className="relative py-10 md:py-14 overflow-hidden" aria-label="مجالات خدماتنا">
      {/* Fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" aria-hidden="true" />

      <div className="relative flex items-center gap-8 border-y border-white/[0.05] py-4 bg-white/[0.015]">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap will-change-transform">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="text-base md:text-lg font-black text-slate-500 hover:text-blue-300 transition-colors duration-300 cursor-default select-none">
                {item}
              </span>
              <span className="text-cyan-400/60 text-xs" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
