import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function StatsSection() {
  return (
    <section className="relative py-20 md:py-24" aria-label="أرقامنا">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealGroup className="glass-deep border-arc grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <RevealItem key={i} className="relative">
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <p
                  className="font-mono text-4xl font-bold text-mist-100 md:text-5xl"
                  dir="ltr"
                >
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-sm text-mist-400">{stat.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
