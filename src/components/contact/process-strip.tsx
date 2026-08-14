"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";
import { processSteps } from "@/data/process";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function ProcessStrip() {
  const root = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".process-strip-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.from(".process-strip-step", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 68%" },
      });

      if (!prefersReducedMotion && lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, scaleY: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            transformOrigin: "top left",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 65%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section ref={root} dataProgress="Process" className="border-t border-border">
      <p className="process-strip-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        05 / How We&apos;ll Work Together
      </p>

      <div className="relative mt-14 md:mt-20">
        <div
          aria-hidden="true"
          className="absolute left-[15px] top-0 h-full w-px bg-border md:left-0 md:top-[15px] md:h-px md:w-full"
        />
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute left-[15px] top-0 h-full w-px bg-accent md:left-0 md:top-[15px] md:h-px md:w-full"
        />

        <ol className="relative flex flex-col gap-10 md:flex-row md:justify-between md:gap-6">
          {processSteps.map((step, i) => (
            <li
              key={step.id}
              className="process-strip-step relative flex gap-5 pl-11 md:flex-1 md:flex-col md:gap-0 md:pl-0"
            >
              <span className="absolute left-0 top-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-xs text-ink md:relative md:mb-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[200px] text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
