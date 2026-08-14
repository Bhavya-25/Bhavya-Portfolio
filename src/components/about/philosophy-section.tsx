"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";

const PRINCIPLES = [
  "I don't hand off between designing and building — the same person does both, so nothing gets lost in translation.",
  "A fast, ugly build isn't done. A beautiful build that breaks under real use isn't done either. Both halves matter, every time.",
  "Scope creep is a planning failure, not a client problem. I'd rather spend an extra day scoping than three extra weeks rebuilding.",
  "You should never need a status meeting to know where a project stands. If you're wondering, I haven't communicated enough.",
];

/**
 * Large editorial statements, not the icon-card grid used elsewhere — same
 * underlying convictions as the USP cards on Home, deliberately presented
 * in a completely different register (quote-like, no icons, no cards) so
 * this page doesn't read as a re-skin of Home.
 */
export function PhilosophySection() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".principle-line", {
        opacity: 0,
        x: -16,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="flex flex-col divide-y divide-border border-y border-border">
      {PRINCIPLES.map((line, i) => (
        <div key={i} className="principle-line flex gap-6 py-8 md:gap-10 md:py-10">
          <span className="shrink-0 font-mono text-sm text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="max-w-3xl font-display text-xl font-medium leading-[1.3] tracking-tight text-ink md:text-2xl">
            {line}
          </p>
        </div>
      ))}
    </div>
  );
}
