"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { processSteps } from "@/data/process";
import { EASE } from "@/lib/motion";

/**
 * A vertical "magazine spread" — alternating text/numeral rows, not Home's
 * ProcessLayout wraparound (cards / hero-image-card / cards). The
 * distinguishing mechanism: one ScrollTrigger spans the whole row-stack and
 * scrubs a CSS custom property that moves a soft radial backdrop glow down
 * the section as the reader passes each step, so the backdrop itself
 * reads as shifting per "chapter" rather than being static behind a plain
 * scroll-reveal.
 */
export function ProcessStoryline() {
  const root = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
            onUpdate: (self) => {
              backdropRef.current?.style.setProperty("--chapter-y", `${self.progress * 100}%`);
            },
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".process-row", root.current).forEach((row) => {
        gsap.from(row.querySelector(".process-row-copy"), {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: EASE.out,
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={
          {
            "--chapter-y": "0%",
            background:
              "radial-gradient(60% 40% at 50% var(--chapter-y), rgba(255,122,66,0.1), transparent 70%)",
          } as React.CSSProperties
        }
      />

      <div className="flex flex-col">
        {processSteps.map((step, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={step.id}
              className={`process-row relative flex flex-col items-center gap-4 overflow-hidden border-b border-border py-14 first:border-t md:flex-row md:gap-10 md:py-20 ${
                reversed ? "md:flex-row-reverse md:text-right" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none select-none font-display text-[7rem] font-medium leading-none text-ink/[0.05] md:absolute md:top-1/2 md:-translate-y-1/2 md:text-[11rem] ${
                  reversed ? "md:right-0" : "md:left-0"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="process-row-copy relative z-10 mx-auto max-w-xl md:mx-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
