"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";

const POINTS = [
  { value: "4+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "15+", label: "Clients Worked With" },
  { value: "100%", label: "Modern Tech Stack" },
  { value: "1:1", label: "Direct Communication" },
  { value: "Typed", label: "Clean, Maintainable Code" },
  { value: "Custom", label: "Premium UI Craft" },
  { value: "0px", label: "Broken Responsive Layouts" },
];

export function WhyWorkGrid() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".why-work-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".why-work-item", {
        opacity: 0,
        scale: 0.92,
        duration: 0.5,
        ease: EASE.out,
        stagger: 0.05,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root }
  );

  return (
    <Section ref={root} dataProgress="Why Work With Me" className="border-y border-border">
      <p className="why-work-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        06 / Why Work With Me
      </p>

      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-14 lg:grid-cols-4">
        {POINTS.map((point) => (
          <div
            key={point.label}
            className="why-work-item group flex flex-col justify-center bg-surface-raised p-6 transition-colors duration-300 ease-out hover:bg-surface md:p-8"
          >
            <p className="font-display text-3xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-4xl">
              {point.value}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
              {point.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
