"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { featuredProjects } from "@/data/projects";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ProjectStack } from "@/components/work/project-stack";
import { ProjectListFallback } from "@/components/work/project-list-fallback";
import { Section } from "@/components/ui/section";

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".work-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <Section id="work" ref={root} dataProgress="Selected Work">
        <div className="work-heading flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              02 / Selected Work
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium tracking-tight text-ink">
              A curated archive
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-muted">
            A working set of projects — the full archive is being assembled.
            Each entry below is a placeholder until it&apos;s replaced with a
            verified case study. Keep scrolling to move through the stack.
          </p>
        </div>

        {prefersReducedMotion ? (
          <ProjectListFallback projects={featuredProjects} />
        ) : (
          <ProjectStack projects={featuredProjects} />
        )}
    </Section>
  );
}
