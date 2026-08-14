import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/contact/service-icon";
import { StructuredData } from "@/components/seo/structured-data";
import { ProcessLayout } from "@/components/why/process-layout";
import { services, getService, getRelatedServices } from "@/data/services";
import { pageMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.title,
    description: service.intro,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(slug);

  return (
    <>
      <StructuredData
        data={serviceSchema(service.title, service.intro, `/services/${service.slug}`)}
      />

      <PageHero
        eyebrow={service.group}
        title={service.title}
        description={service.intro}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        actions={
          <>
            <Button href="/contact">Start a project</Button>
            <Button href="/services" variant="secondary" arrow={false}>
              All services
            </Button>
          </>
        }
        aside={
          <div className="relative flex aspect-square items-center justify-center rounded-[1.75rem] border border-border bg-surface-raised/60">
            <span className="h-20 w-20 text-accent/80">
              <ServiceIcon kind={service.icon} />
            </span>
            <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              {service.group}
            </span>
          </div>
        }
      />

      {/* Stack */}
      <Section className="pt-0">
        <div className="flex flex-col gap-6 border-y border-border py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Technology
          </p>
          <div className="flex flex-wrap gap-3">
            {service.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Process — shared component, so the method reads identically sitewide */}
      <Section className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          How it runs
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          The same six stages, scaled to the size of the engagement.
        </h2>
        <ProcessLayout />
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section className="pt-0">
          <div className="border-t border-border pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              Related services
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group rounded-2xl border border-border p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent"
                >
                  <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{item.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint transition-colors duration-300 ease-out group-hover:text-accent">
                    View
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="pt-0">
        <div className="flex flex-col items-start gap-6 rounded-[1.75rem] border border-border bg-surface-raised p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Need {service.title.toLowerCase()}?
            </h2>
            <p className="mt-3 max-w-md text-sm text-ink-muted md:text-base">
              Tell me what you&apos;re building and I&apos;ll reply personally
              with a realistic scope.
            </p>
          </div>
          <Button href="/contact">Book a Call</Button>
        </div>
      </Section>
    </>
  );
}
