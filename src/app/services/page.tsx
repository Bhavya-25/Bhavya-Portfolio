import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/contact/service-icon";
import { services, serviceGroups, getServicesByGroup } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Design, engineering, and creative technology services — full-stack development, UI/UX, mobile apps, Three.js, Shopify, CMS, performance and AI integration.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={`${services.length} Services`}
        title={
          <>
            Everything your product needs,
            <br />
            from one person.
          </>
        }
        description="Design and engineering aren't separate engagements here. Pick the piece you need, or hand over the whole build."
        breadcrumbs={[{ label: "Services", href: "/services" }]}
        actions={
          <>
            <Button href="/contact">Book a Call</Button>
            <Button href="/projects" variant="secondary">
              See the work
            </Button>
          </>
        }
      />

      {serviceGroups.map((group, groupIndex) => (
        <Section key={group} className={groupIndex === 0 ? "pt-0" : undefined}>
          <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              {group}
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
              {String(getServicesByGroup(group).length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getServicesByGroup(group).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-surface-raised/50 p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-surface text-ink-muted transition-colors duration-300 ease-out group-hover:border-accent group-hover:text-accent">
                  <span className="h-4 w-4">
                    <ServiceIcon kind={service.icon} />
                  </span>
                </span>

                <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.summary}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint transition-colors duration-300 ease-out group-hover:text-accent">
                  Explore
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
