import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ── Deterministic RNG so the network is stable across renders ── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number };
type Route = { a: number; b: number };
type Pulse = { route: number; t: number; speed: number; color: string };

/**
 * Live cartographic network — routes, traveling light pulses and
 * gold pins, drawn on canvas. Pauses offscreen & under reduced motion.
 */
export function MapCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let visible = true;
    let nodes: Node[] = [];
    let routes: Route[] = [];
    let pulses: Pulse[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Regenerate network for the new aspect ratio
      const rand = mulberry32(42);
      const count = Math.round(Math.min(34, Math.max(16, (width * height) / 26000)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: rand() * width,
          y: rand() * height,
        });
      }
      // Connect each node to its 2 nearest neighbors
      routes = [];
      for (let i = 0; i < nodes.length; i++) {
        const dists = nodes
          .map((n, j) => ({ j, d: (n.x - nodes[i].x) ** 2 + (n.y - nodes[i].y) ** 2 }))
          .filter((n) => n.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        for (const { j } of dists) {
          if (i < j) routes.push({ a: i, b: j });
        }
      }
      pulses = [];
    };

    const spawnPulse = () => {
      if (routes.length === 0) return;
      const route = Math.floor(Math.random() * routes.length);
      const colors = ["#7FB0FF", "#67E8F9", "#A78BFA"];
      pulses.push({
        route,
        t: Math.random(),
        speed: 0.0022 + Math.random() * 0.0028,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      if (pulses.length > 26) pulses.shift();
    };

    let pulseTimer = 0;
    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Routes
      for (const r of routes) {
        const a = nodes[r.a];
        const b = nodes[r.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(90, 130, 230, 0.10)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140, 175, 255, 0.35)";
        ctx.fill();
      }

      // Pins (3 landmark nodes with gold rings)
      const pinIdx = nodes.length >= 3 ? [1, Math.floor(nodes.length / 2), nodes.length - 2] : [0];
      for (const pi of pinIdx) {
        const n = nodes[pi];
        const ring = (now / 1000) * 0.7 + pi;
        for (let k = 0; k < 2; k++) {
          const phase = ring + k * 0.5;
          const r = (phase % 1) * 30;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(237, 186, 94, ${0.28 * (1 - (phase % 1))})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        // Pin dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.4, 0, Math.PI * 2);
        ctx.fillStyle = "#EDBA5E";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(237, 186, 94, 0.12)";
        ctx.fill();
      }

      // Traveling pulses
      pulseTimer++;
      if (pulseTimer % 60 === 0 && !reduce) spawnPulse();
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t > 1) {
          pulses.splice(i, 1);
          continue;
        }
        const r = routes[p.route];
        if (!r) continue;
        const a = nodes[r.a];
        const b = nodes[r.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const glow = Math.sin(p.t * Math.PI);
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.25 + glow * 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    resize();

    if (reduce) {
      // Static render: one frame with pulses at mid-travel
      for (let i = 0; i < 14; i++) spawnPulse();
      for (const p of pulses) p.t = 0.5;
      running = false;
      draw(performance.now());
      return () => cancelAnimationFrame(raf);
    }

    // Visibility management
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          running = false;
          cancelAnimationFrame(raf);
        } else if (!running) {
          running = true;
          raf = requestAnimationFrame(draw);
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    const onVisibility = () => {
      const hidden = document.hidden;
      if (hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running && visible) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  );
}
