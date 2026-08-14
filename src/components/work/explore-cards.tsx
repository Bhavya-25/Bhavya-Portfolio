"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";

const CARDS = [
  {
    href: "/services",
    title: "Services",
    description: "What I build, end to end — from scoping to launch.",
    icon: (
      <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
    ),
  },
  {
    href: "/about",
    title: "About",
    description: "My path, process, and how I actually work with clients.",
    icon: <circle cx="12" cy="8" r="3.5" />,
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Notes on building products — engineering and design both.",
    icon: <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" strokeLinecap="round" />,
  },
  {
    href: "/resources",
    title: "Resources",
    description: "Guides, checklists, and tools I use on real engagements.",
    icon: <path d="M12 3v14m0 0-5-5m5 5 5-5M4 21h16" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    href: "/resume",
    title: "Resume",
    description: "Experience, stack, and background in one document.",
    icon: <path d="M6 3h9l3 3v15H6zM15 3v3h3" strokeLinecap="round" strokeLinejoin="round" />,
  },
] as const;

export function ExploreCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".explore-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <Section ref={root} dataProgress="Explore More">
      <p className="explore-reveal font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        07 / Explore More
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-5">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            data-cursor="Open"
            className="explore-reveal group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface-raised p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20"
            />
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 text-ink transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              {card.icon}
            </svg>

            <div className="mt-8">
              <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {card.description}
              </p>
            </div>

            <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint transition-[color,transform] duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent">
              Explore
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
