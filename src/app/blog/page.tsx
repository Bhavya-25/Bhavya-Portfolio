import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Writing on Next.js, React, motion design, creative development, and shipping products as a solo engineer.",
  path: "/blog",
});

// Phase 5 replaces this with an MDX pipeline (contentlayer-style frontmatter →
// generateStaticParams). The listing UI is built against this shape so the
// swap is a data-source change, not a rewrite.
const CATEGORIES = [
  "Next.js", "React", "UI/UX", "Mobile", "Three.js", "GSAP",
  "Node.js", "Performance", "SEO", "AI", "Freelancing", "Case Studies",
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes from
            <br />
            building things.
          </>
        }
        description="Engineering, motion, and product writing drawn from real client work — published as I go rather than in batches."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <Section className="pt-0">
        <div className="flex flex-wrap gap-3 border-y border-border py-6">
          {CATEGORIES.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-6 rounded-[1.75rem] border border-border bg-surface-raised p-8 md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            In progress
          </p>
          <h2 className="max-w-2xl font-display text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
            The first articles are being written now.
          </h2>
          <p className="max-w-xl text-sm text-ink-muted md:text-base">
            Rather than filling this page with generic filler, it stays empty
            until there&apos;s something genuinely worth reading. Subscribe in
            the footer and the first post will reach you directly.
          </p>
          <Button href="/contact">Get in touch instead</Button>
        </div>
      </Section>
    </>
  );
}
