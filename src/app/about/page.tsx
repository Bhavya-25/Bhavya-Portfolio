import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { JourneyTimeline } from "@/components/about/journey-timeline";
import { SkillsSection } from "@/components/about/skills-section";
import { PhilosophySection } from "@/components/about/philosophy-section";
import { AchievementsSection } from "@/components/about/achievements-section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Bhavya Chawla — full-stack developer and creative technologist. Four years building products where design and engineering are the same discipline.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow="About"
        title={
          <>
            I design and engineer
            <br />
            the same product.
          </>
        }
        description="Most teams split design and development across people who never share a file. I don't — which means fewer translation errors between what's designed and what actually ships."
        breadcrumbs={[{ label: "About", href: "/about" }]}
        actions={
          <>
            <Button href="/contact">Work with me</Button>
            <Button href="/resume" variant="secondary">
              View résumé
            </Button>
          </>
        }
        aside={
          <div className="rounded-[1.75rem] border border-border bg-surface-raised/60 p-8">
            <StatusBadge label="Available for selected projects" />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              Right now
            </p>
            <p className="mt-3 font-display text-xl font-medium leading-snug tracking-tight text-ink">
              Splitting time between full-stack builds and Three.js / GSAP–driven
              interactive experiences.
            </p>
          </div>
        }
      />

      {/* 2–3. Journey + Timeline */}
      <Section className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Journey
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          Four phases, one continuous thread.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-ink-muted md:text-base">
          Not a resume timeline — the actual shape of how the range I work in
          today came together, one phase at a time.
        </p>
        <div className="mt-12">
          <JourneyTimeline />
        </div>
      </Section>

      {/* 4. Skills */}
      <Section className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Skills
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          What I actually reach for.
        </h2>
        <div className="mt-12">
          <SkillsSection />
        </div>
      </Section>

      {/* 5. Working philosophy */}
      <Section className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Working Philosophy
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          A few things I don&apos;t compromise on.
        </h2>
        <div className="mt-12">
          <PhilosophySection />
        </div>
      </Section>

      {/* 6. Achievements */}
      <Section className="pt-0">
        <AchievementsSection />
      </Section>

      {/* 7. CTA */}
      <Section className="pt-0">
        <div className="flex flex-col items-start gap-6 rounded-[1.75rem] border border-border bg-surface-raised p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Want to see if we&apos;re a fit?
            </h2>
            <p className="mt-3 max-w-md text-sm text-ink-muted md:text-base">
              15 minutes is usually enough to know. No deck, no sales script —
              just a conversation about what you&apos;re building.
            </p>
          </div>
          <Button href="/contact">Book a Call</Button>
        </div>
      </Section>
    </>
  );
}
