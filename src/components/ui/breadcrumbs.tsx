import Link from "next/link";
import type { BreadcrumbEntry } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/seo";
import { StructuredData } from "@/components/seo/structured-data";

/**
 * Visible breadcrumb trail plus its matching BreadcrumbList JSON-LD, so the
 * two can never drift apart. `entries` excludes Home — it's prepended here.
 */
export function Breadcrumbs({ entries }: { entries: BreadcrumbEntry[] }) {
  const trail = [{ label: "Home", href: "/" }, ...entries];

  return (
    <>
      <StructuredData data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          {trail.map((entry, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={entry.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-ink-muted">
                    {entry.label}
                  </span>
                ) : (
                  <Link
                    href={entry.href}
                    className="transition-colors duration-300 ease-out hover:text-ink"
                  >
                    {entry.label}
                  </Link>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
