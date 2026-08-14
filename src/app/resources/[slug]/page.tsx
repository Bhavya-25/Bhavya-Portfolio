import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { resourcePages, getResource } from "@/data/resources";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return resourcePages.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};

  return pageMetadata({
    title: resource.title,
    description: resource.summary,
    path: `/resources/${resource.slug}`,
  });
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource || resource.href) notFound();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={resource.title}
        description={resource.summary}
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: resource.title, href: `/resources/${resource.slug}` },
        ]}
      />

      <Section className="pt-0">
        <div className="flex flex-col items-start gap-6 rounded-[1.75rem] border border-border bg-surface-raised p-8 md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            In progress
          </p>
          <h2 className="max-w-2xl font-display text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
            This resource is being written.
          </h2>
          <p className="max-w-xl text-sm text-ink-muted md:text-base">
            It&apos;ll be published once there&apos;s something substantial
            here. In the meantime, the work itself is the best reference.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/projects">See the work</Button>
            <Button href="/contact" variant="secondary">
              Ask directly
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
