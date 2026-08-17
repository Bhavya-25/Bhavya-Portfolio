"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { workshopImages, logLines } from "@/data/behind-the-scenes";
import { EASE } from "@/lib/motion";

const ROTATIONS = [-3, 2, -2];

/**
 * The personal, non-corporate section of the page — a terminal-style
 * marquee of short log lines, and a loosely-arranged (not grid-perfect)
 * photo strip. No Three.js, no pin, no cursor tracking — deliberately the
 * calmest section on the page after ten others full of motion.
 */
export function BehindTheScenes() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".workshop-photo", {
        opacity: 0,
        y: 20,
        rotate: 0,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div className="overflow-hidden rounded-full border border-border bg-ink py-4">
        <Marquee durationSeconds={26} gapClassName="gap-12">
          {logLines.map((line, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 font-mono text-xs text-surface/70">
              <span className="text-accent">$</span>
              {line}
              <span aria-hidden="true" className="blink-cursor ml-1 inline-block h-3 w-1.5 bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mt-16 flex flex-wrap items-start justify-center gap-8">
        {workshopImages.map((image, i) => (
          <figure
            key={image.id}
            className="workshop-photo w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-[0_20px_40px_-24px_rgba(0,0,0,0.2)]"
            style={{ transform: `rotate(${ROTATIONS[i]}deg)` }}
          >
            <Image src={image.src} alt={image.alt} width={800} height={600} className="h-auto w-full" />
            <figcaption className="border-t border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
