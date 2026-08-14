import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ServiceIcon } from "@/components/contact/service-icon";
import { resources } from "@/data/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources",
  description:
    "Process notes, technical writing, open source work, and reference material from real product engagements.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            How I work, and
            <br />
            what I&apos;ve learned doing it.
          </>
        }
        description="Process notes, technical writing, and reference material — the thinking behind the work rather than a highlight reel."
        breadcrumbs={[{ label: "Resources", href: "/resources" }]}
      />

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={resource.href ?? `/resources/${resource.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface-raised/50 p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-soft)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-surface text-ink-muted transition-colors duration-300 ease-out group-hover:border-accent group-hover:text-accent">
                <span className="h-4 w-4">
                  <ServiceIcon kind={resource.icon} />
                </span>
              </span>

              <h2 className="mt-5 font-display text-lg font-medium tracking-tight text-ink">
                {resource.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {resource.summary}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint transition-colors duration-300 ease-out group-hover:text-accent">
                Open
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
