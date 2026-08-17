"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { tools } from "@/data/tools";
import { AiToolIcon } from "@/components/footer/ai-tool-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Generated once at module load, not during render — same convention as
// hero-scene.tsx's NODE_POSITIONS. Each tile gets a small resting tilt and
// a scattered starting offset/rotation for the entrance.
//
// The offset magnitude is deliberately modest (not a dramatic scatter):
// GSAP applies a tween's "from" state as an inline style the instant the
// tween is created, before ScrollTrigger ever fires — so an off-canvas
// starting position sits in the DOM (and counts toward the page's
// scrollable width) from first paint, not just while animating. A large
// offset was overflowing the viewport horizontally on narrow screens even
// though the section itself was still below the fold. Keeping the offset
// well under a mobile viewport's width avoids that regardless of tile
// position, while still reading clearly as a scatter-to-grid entrance.
const TILE_MOTION = tools.map((_, i) => ({
  restRotate: i % 2 === 0 ? -3 : 3,
  startX: (Math.random() - 0.5) * 70,
  startY: (Math.random() - 0.5) * 50,
  startRotate: (Math.random() - 0.5) * 70,
}));

export function ToolsWall() {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>(".tool-tile", root.current);

      tiles.forEach((tile, i) => {
        const motion = TILE_MOTION[i];
        gsap.fromTo(
          tile,
          { x: motion.startX, y: motion.startY, rotate: motion.startRotate, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotate: motion.restRotate,
            opacity: 1,
            duration: 0.8,
            ease: EASE.out,
            delay: i * 0.05,
            scrollTrigger: { trigger: root.current, start: "top 80%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="flex flex-wrap justify-center gap-5">
      {tools.map((tool, i) => (
        <div
          key={tool.name}
          className="tool-tile group relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface-raised transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:rotate-0 hover:border-accent/40 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)]"
          style={
            prefersReducedMotion
              ? { transform: `rotate(${TILE_MOTION[i].restRotate}deg)` }
              : undefined
          }
        >
          <Tooltip label={tool.name}>
            <span className="flex h-8 w-8 items-center justify-center text-ink-muted transition-colors duration-300 ease-out group-hover:text-accent">
              <AiToolIcon kind={tool.icon} />
            </span>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
