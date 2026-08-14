"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Capability } from "@/data/capabilities";
import { CapabilityVisual } from "./capability-visual";
import { EASE } from "@/lib/motion";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function CapabilityPreview({ capability }: { capability: Capability }) {
  const root = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".cap-eyebrow", { opacity: 0, y: 8, duration: 0.2, ease: EASE.out })
        .fromTo(
          imageWrapRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", scale: 1.04, opacity: 0.6 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: EASE.out,
          },
          "-=0.1"
        )
        .from(
          ".cap-title-line",
          { yPercent: 110, duration: 0.35, ease: EASE.out },
          "-=0.35"
        )
        .from(".cap-desc", { opacity: 0, y: 10, duration: 0.28, ease: EASE.out }, "-=0.2")
        .from(
          ".cap-deliverable",
          { opacity: 0, y: 12, duration: 0.3, ease: EASE.out },
          "-=0.15"
        )
        .from(
          ".cap-tool",
          { opacity: 0, scale: 0.85, duration: 0.25, ease: EASE.out },
          "-=0.15"
        )
        .from(".cap-cta", { opacity: 0, y: 10, duration: 0.25, ease: EASE.out }, "-=0.1");
    },
    { scope: root, dependencies: [capability.id] }
  );

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;
    const wrap = imageWrapRef.current;
    if (!wrap) return;

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.6, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * 10);
      yTo(relY * 10);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    wrap.addEventListener("pointermove", handleMove);
    wrap.addEventListener("pointerleave", handleLeave);
    return () => {
      wrap.removeEventListener("pointermove", handleMove);
      wrap.removeEventListener("pointerleave", handleLeave);
    };
  }, [isTouch, prefersReducedMotion]);

  return (
    <div
      ref={root}
      className="max-h-[calc(100vh-200px)] overflow-y-auto rounded-2xl border border-border bg-surface-raised/50 p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.2)] md:p-6 lg:p-7"
    >
      <p className="cap-eyebrow font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
        {capability.index} / Capability
      </p>

      <h3 className="mt-2 overflow-hidden font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
        <span className="cap-title-line block">{capability.title}</span>
      </h3>

      <p className="cap-desc mt-3 max-w-xl text-sm text-ink-muted">{capability.description}</p>

      <div
        ref={imageWrapRef}
        className="relative mt-5 h-[190px] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface-raised via-surface to-surface-raised md:h-[220px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/5 blur-3xl"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-sm">
            <CapabilityVisual kind={capability.visual} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          What I Deliver
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {capability.deliverables.map((item) => (
            <div
              key={item}
              className="cap-deliverable group rounded-xl border border-border bg-surface p-3 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.25)]"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
              <p className="mt-2 font-display text-xs font-medium leading-snug text-ink md:text-sm">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          Tools I Use
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {capability.technologies.map((tech) => (
            <div
              key={tech}
              className="cap-tool group flex items-center gap-2 rounded-full border border-border-strong bg-surface py-1.5 pl-1.5 pr-3 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:-rotate-1 hover:border-accent hover:shadow-[0_0_24px_-8px_var(--color-accent)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-raised font-mono text-[10px] text-accent transition-transform duration-300 group-hover:scale-110">
                {tech.charAt(0)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-muted">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#contact"
        className="cap-cta group mt-6 flex items-center justify-between rounded-xl border border-border-strong bg-surface p-4 transition-colors duration-300 ease-out hover:border-accent md:p-5"
      >
        <div>
          <p className="font-display text-base font-medium tracking-tight text-ink md:text-lg">
            Need a custom solution?
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
            Let&apos;s build your product
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong text-ink transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent">
          →
        </span>
      </a>
    </div>
  );
}
