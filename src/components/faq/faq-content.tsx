"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { FaqItem } from "@/data/faq";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface FAQContentProps {
  items: FaqItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

// The active question sits expanded at the top; everything else stays
// collapsed below it, re-sorted so the active one always leads. Selecting a
// collapsed row promotes it the same way the left nav does.
export function FAQContent({ items, activeId, onSelect }: FAQContentProps) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const active = items.find((item) => item.id === activeId) ?? items[0];
  const rest = items.filter((item) => item.id !== activeId);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from(".faq-active-block > *", {
        opacity: 0,
        y: 14,
        duration: 0.45,
        ease: EASE.out,
        stagger: 0.06,
      });

      gsap.from(".faq-divider", {
        scaleX: 0,
        duration: 0.5,
        ease: EASE.out,
      });

      gsap.from(".faq-collapsed-row", {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: EASE.out,
        stagger: 0.04,
        delay: 0.15,
      });
    },
    { scope: root, dependencies: [activeId] }
  );

  return (
    <div ref={root} className="faq-content">
      <div className="faq-active-block" aria-live="polite">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">Q</p>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
          {active.question}
        </h3>
        <p className="mt-5 max-w-2xl text-base text-ink-muted md:text-lg">{active.answer}</p>
      </div>

      <div className="faq-divider mt-10 h-px w-full origin-left bg-border" />

      <div className="mt-2 flex flex-col">
        {rest.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className="faq-collapsed-row group flex items-center justify-between gap-6 border-b border-border py-5 text-left transition-colors duration-300 ease-out hover:text-accent"
          >
            <span className="font-display text-base font-medium tracking-tight text-ink md:text-lg">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-lg text-ink-faint transition-transform duration-300 ease-out group-hover:scale-110 group-hover:text-accent"
            >
              +
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
