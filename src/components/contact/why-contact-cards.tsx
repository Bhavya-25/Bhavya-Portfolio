"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";

const REASONS = [
  {
    icon: (
      <path d="M13 2 3 14h7l-1 8 11-14h-7l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
    title: "Fast Response",
    description: "I read every message myself and reply personally — usually within 24 hours.",
  },
  {
    icon: (
      <path
        d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "NDA Protected",
    description: "Everything you share is treated as confidential. Happy to sign an NDA first.",
  },
  {
    icon: <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />,
    title: "4+ Years Experience",
    description: "Full-stack development, UI/UX design, and creative engineering, end to end.",
  },
  {
    icon: (
      <path
        d="M9 12.5 11 14.5 15 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "50+ Projects Delivered",
    description: "A real track record across web, mobile, Shopify, and product design work.",
  },
];

export function WhyContactCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".why-contact-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".why-contact-card", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root }
  );

  return (
    <Section ref={root} dataProgress="Why Contact Me" className="border-b border-border">
      <p className="why-contact-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        02 / Why Contact Me
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            className="why-contact-card group relative overflow-hidden rounded-2xl border border-border bg-surface-raised p-7 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20"
            />
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-accent transition-transform duration-300 ease-out group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              {reason.icon}
            </svg>
            <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{reason.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
