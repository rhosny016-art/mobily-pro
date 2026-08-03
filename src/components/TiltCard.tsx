import { useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees */
  maxTilt?: number;
  /** Perspective used for the 3D effect */
  perspective?: number;
  /** Hover scale */
  scale?: number;
  glare?: boolean;
  disabled?: boolean;
}

/**
 * 3D tilt card with a moving glare highlight.
 * Uses only transforms (GPU) driven by spring-smoothed motion values.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 9,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.14), transparent 55%)`
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
  }, [mx, my]);

  const reset = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        reset();
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
        scale: hovering ? scale : 1,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30"
          style={{
            background: glareBg,
            opacity: hovering ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      )}
    </motion.div>
  );
}
