import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { BreadcrumbEntry } from "@/lib/seo";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: BreadcrumbEntry[];
  /** Per-page accent slot — SVG motif, 3D scene, stat row. */
  aside?: ReactNode;
  actions?: ReactNode;
}

/**
 * Shared hero shell. Every page gets the same rhythm (breadcrumbs → eyebrow →
 * headline → copy) while `aside` carries each page's own visual identity, so
 * pages read as siblings rather than clones.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  aside,
  actions,
}: PageHeroProps) {
  return (
    <Section className="pt-32 md:pt-40" containerClassName="page-hero">
      <Breadcrumbs entries={breadcrumbs} />

      <div
        className={
          aside
            ? "mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16"
            : "mt-8"
        }
      >
        <div>
          <p className="page-hero-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            {eyebrow}
          </p>

          <h1 className="page-hero-title mt-5 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.03] tracking-tight text-ink">
            {title}
          </h1>

          {description && (
            <div className="page-hero-copy mt-6 max-w-2xl text-base text-ink-muted md:text-lg">
              {description}
            </div>
          )}

          {actions && (
            <div className="page-hero-actions mt-9 flex flex-wrap items-center gap-4">
              {actions}
            </div>
          )}
        </div>

        {aside && <div className="page-hero-aside">{aside}</div>}
      </div>
    </Section>
  );
}
