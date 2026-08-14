import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { techCategories, getCategoryItems } from "@/data/technologies";
import { serviceGroups, getServicesByGroup } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Résumé",
  description:
    "Experience, skills, and technical background for Bhavya Chawla — full-stack developer and creative technologist.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <PageHero
        eyebrow="Résumé"
        title="Experience & capabilities"
        description="Four years building full-stack products, mobile apps, and interactive experiences for founders and teams."
        breadcrumbs={[{ label: "Résumé", href: "/resume" }]}
        actions={
          <>
            <Button href="/contact">Get in touch</Button>
            <Button href="/projects" variant="secondary">
              See the work
            </Button>
          </>
        }
      />

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              Technical skills
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {techCategories.map((category) => (
              <div key={category.id} className="border-b border-border pb-6">
                <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                  {category.label}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {getCategoryItems(category.id).map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-ink-muted"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              Services offered
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {serviceGroups.map((group) => (
              <div key={group}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                  {group}
                </h3>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {getServicesByGroup(group).map((service) => (
                    <li key={service.slug} className="text-sm text-ink-muted">
                      {service.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
