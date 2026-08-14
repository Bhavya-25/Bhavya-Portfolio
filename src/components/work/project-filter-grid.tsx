"use client";

import { useMemo, useState } from "react";
import { ProjectListFallback } from "./project-list-fallback";
import type { Project, ProjectCategory } from "@/data/projects";

export function ProjectFilterGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo<("All" | ProjectCategory)[]>(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState<"All" | ProjectCategory>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3 border-y border-border py-6">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-300 ease-out ${
              active === category
                ? "border-ink bg-ink text-surface"
                : "border-border-strong text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <ProjectListFallback projects={filtered} />
    </div>
  );
}
