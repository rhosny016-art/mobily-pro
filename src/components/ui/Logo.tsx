import { cn } from "@/lib/utils";

/** Brand pin — the دلّني mark: a luminous map pin with a gold compass star. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
    >
      <defs>
        <linearGradient id="pin-body" x1="10" y1="4" x2="54" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4D8DFF" />
          <stop offset="0.55" stopColor="#2E6BFF" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="pin-glow" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7FB0FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#7FB0FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="star-gold" x1="20" y1="14" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8D68A" />
          <stop offset="1" stopColor="#DDA03C" />
        </linearGradient>
      </defs>
      <path d="M32 2C18.7 2 8 12.7 8 26c0 16 20.6 33.2 22.2 34.6a2 2 0 0 0 3.6 0C35.4 59.2 56 42 56 26 56 12.7 45.3 2 32 2z" fill="url(#pin-glow)" opacity="0.35" />
      <path
        d="M32 5C20.3 5 10.8 14.5 10.8 26.2c0 14.4 18.6 30.3 19.9 31.4a1.8 1.8 0 0 0 2.6 0c1.3-1.1 19.9-17 19.9-31.4C53.2 14.5 43.7 5 32 5z"
        fill="url(#pin-body)"
      />
      <circle cx="32" cy="26" r="9" fill="#04060D" />
      <circle cx="32" cy="26" r="9" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
      {/* Compass star */}
      <path
        d="M32 17.5l2.6 5.9 5.9 2.6-5.9 2.6-2.6 5.9-2.6-5.9-5.9-2.6 5.9-2.6z"
        fill="url(#star-gold)"
      />
      {/* Direction nub */}
      <circle cx="32" cy="56.5" r="2.4" fill="#EDBA5E" />
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-9 w-9", markClassName)} />
      <span className="font-display text-xl font-extrabold tracking-tight text-mist-100">
        دلّني
        <span className="text-gold-400">.</span>
      </span>
    </span>
  );
}
