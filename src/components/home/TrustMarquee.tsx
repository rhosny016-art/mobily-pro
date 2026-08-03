import { MARQUEE_ITEMS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

/** Infinite service marquee — CSS driven, pauses on hover, RTL-aware. */
export function TrustMarquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="marquee-paused relative border-y border-white/6 bg-ink-900/60 py-5 backdrop-blur"
      aria-label="مجالات خدماتنا"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent"
        aria-hidden="true"
      />
      <div className="flex w-max" dir="rtl">
        <div className="marquee-track flex shrink-0 items-center gap-10 pe-10">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="font-display text-lg font-semibold text-mist-300">{item}</span>
              <Icon name={i % 3 === 0 ? "star" : i % 3 === 1 ? "map-pin" : "sparkles"} className="h-4 w-4 text-gold-400/70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
