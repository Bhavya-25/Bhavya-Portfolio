"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usps } from "@/data/usps";
import { EASE } from "@/lib/motion";

// Same underlying convictions as usps.ts (already used on Home), reframed
// around what a client actually gets rather than how the work happens — so
// this reads as a distinct section, not a copy-pasted repeat.
const CLIENT_FRAMING: Record<string, string> = {
  "one-person": "Nothing gets lost between a designer's file and an engineer's build, because there's only one person to lose it.",
  "design-literate": "What you approve in Figma is what ships — no gap between the mockup and the production build.",
  range: "One point of contact for the whole build, instead of coordinating three different specialists yourself.",
  direct: "You get a straight answer about scope and timeline, not a filtered one from an account manager.",
};

export function ClientValueDeck() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".client-card", root.current);

      gsap.set(cards, { x: (i) => -i * 8, y: (i) => i * 6, rotate: (i) => -6 + i * 3, zIndex: (i) => cards.length - i });

      gsap.to(cards, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {usps.map((usp) => (
        <div
          key={usp.id}
          className="client-card rounded-[1.75rem] border border-border bg-surface-raised p-7"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {usp.title}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink md:text-base">
            {CLIENT_FRAMING[usp.id] ?? usp.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
