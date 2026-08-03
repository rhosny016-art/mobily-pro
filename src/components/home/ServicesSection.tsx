import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { SERVICES, SERVICE_ICON_ACCENTS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32" aria-labelledby="services-title">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_0%,rgba(46,107,255,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="خدماتنا"
          title={
            <span id="services-title">
              كل ما يحتاجه نشاطك <span className="text-arc">ليتصدّر</span> ويبيع
            </span>
          }
          subtitle="من أول ظهور على خرائط Google إلى حملات إعلانية تملأ هاتفك بالطلبات — منظومة تسويقية متكاملة تحت سقف واحد."
        />

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <TiltCard className="group h-full rounded-3xl">
                <Link
                  to="/services"
                  className="glass relative flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-white/15"
                >
                  <div
                    className={cn(
                      "mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105",
                      SERVICE_ICON_ACCENTS[service.accent],
                    )}
                  >
                    <Icon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-mist-100">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-mist-400">
                    {service.short}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-mist-300">
                        <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition-colors group-hover:text-brand-400">
                    اعرف المزيد
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
