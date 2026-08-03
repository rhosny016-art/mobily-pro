import { useCallback, useRef, useState } from "react";
import type { ReactNode, PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** 3D tilt card with a moving glare — GPU-light, disabled for touch & reduced-motion. */
export function TiltCard({
  children,
  className,
  glare = true,
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  glare?: boolean;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const [hovering, setHovering] = useState(false);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || reduce) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      ry.set((px - 0.5) * max * 2);
      rx.set(-(py - 0.5) * max * 2);
      gx.set(px * 100);
      gy.set(py * 100);
    },
    [max, reduce, rx, ry, gx, gy],
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    setHovering(false);
  }, [rx, ry]);

  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 55%)`;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={onLeave}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: hovering ? 1 : 0, transition: "opacity .3s" }}
        />
      )}
    </motion.div>
  );
}
