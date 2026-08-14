"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { techCategories, getCategoryItems } from "@/data/technologies";
import { EASE } from "@/lib/motion";

/**
 * Deliberately not a repeat of Home's tech globe (TechStack) — a plain
 * editorial grid, each category revealed with a clip-path wipe instead of a
 * fade, so the animation vocabulary stays distinct per page.
 */
export function SkillsSection() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-category", {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {techCategories.map((category) => (
        <div key={category.id} className="skill-category">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {category.label}
          </p>
          <ul className="mt-4 flex flex-col gap-3 border-l border-border pl-4">
            {getCategoryItems(category.id).map((item) => (
              <li
                key={item.id}
                className="font-display text-lg font-medium tracking-tight text-ink"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
