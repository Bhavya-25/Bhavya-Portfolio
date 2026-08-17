"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { showcaseCategories, getShowcaseItems, type ShowcaseCategoryId } from "@/data/tech-showcase";
import { EASE, STAGGER } from "@/lib/motion";
import { TechShowcaseCard } from "@/components/about/tech-showcase-card";

export function TechShowcase() {
  const [active, setActive] = useState<ShowcaseCategoryId>(showcaseCategories[0].id);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".tech-showcase-card", {
        opacity: 0,
        y: 12,
        duration: 0.4,
        ease: EASE.out,
        stagger: STAGGER.tight,
      });
    },
    { scope: gridRef, dependencies: [active] }
  );

  const items = getShowcaseItems(active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Technology categories">
        {showcaseCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={active === category.id}
            onClick={() => setActive(category.id)}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-300 ease-out ${
              active === category.id
                ? "border-ink bg-ink text-surface"
                : "border-border-strong text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        key={active}
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <div key={item.id} className="tech-showcase-card">
            <TechShowcaseCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
