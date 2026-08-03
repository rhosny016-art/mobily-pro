import { memo } from "react";

interface AuroraBackgroundProps {
  /** Array of orbs: { className, color via style } — each orb gets aurora drift + float. */
  orbs?: { className: string; color: string; drift?: boolean }[];
  grid?: boolean;
  noise?: boolean;
  children?: React.ReactNode;
}

/**
 * Reusable premium ambient background: drifting glow orbs + faint grid + noise.
 * Pure CSS transforms → GPU-friendly, no JS work after mount.
 */
export default memo(function AuroraBackground({
  orbs = [],
  grid = true,
  noise = true,
  children,
}: AuroraBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`orb animate-aurora ${orb.className}`}
          style={{
            background: orb.color,
            animationDelay: `${i * 2.4}s`,
            animationDuration: `${16 + i * 4}s`,
          }}
        />
      ))}
      {grid && <div className="grid-overlay" />}
      {noise && <div className="noise-overlay" />}
      {children}
    </div>
  );
});
