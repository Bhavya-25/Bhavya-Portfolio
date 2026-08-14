"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Section } from "@/components/ui/section";
import { FeaturedProject } from "@/components/work/featured-project";
import { EASE } from "@/lib/motion";
import { featuredProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function FeaturedShowcase() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".featured-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".featured-project").forEach((article) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: article, start: "top 78%" },
        });

        if (!prefersReducedMotion) {
          tl.from(article.querySelector(".featured-image"), {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
            ease: EASE.out,
          }).from(
            article.querySelectorAll(".featured-copy > *"),
            { opacity: 0, y: 20, duration: 0.5, ease: EASE.out, stagger: 0.06 },
            "-=0.5"
          );
        } else {
          tl.from(article, { opacity: 0, duration: 0.4 });
        }
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section ref={root} id="featured" dataProgress="Featured Work">
      <p className="featured-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        02 / Featured Work
      </p>

      <div className="mt-10 flex flex-col gap-16 md:mt-14 md:gap-24">
        {featuredProjects.map((project, index) => (
          <FeaturedProject
            key={project.id}
            project={project}
            index={index}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </Section>
  );
}
