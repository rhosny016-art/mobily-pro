import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`تقييم ${rating} من 5`}
      dir="ltr"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-gold-400 text-gold-400"
              : "fill-white/10 text-white/10",
          )}
        />
      ))}
    </div>
  );
}
