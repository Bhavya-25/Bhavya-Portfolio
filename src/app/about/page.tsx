import { Section } from "@/components/ui/section";
import { AboutHero } from "@/components/about/about-hero";
import { TechMarqueeStrip } from "@/components/work/tech-marquee-strip";
import { StoryScrollytelling } from "@/components/about/story-scrollytelling";
import { PhilosophyCards } from "@/components/about/philosophy-cards";
import { JourneyTimeline } from "@/components/about/journey-timeline";
import { TechShowcase } from "@/components/about/tech-showcase";
import { ProcessStoryline } from "@/components/about/process-storyline";
import { AchievementCounters } from "@/components/about/achievement-counters";
import { ToolsWall } from "@/components/about/tools-wall";
import { BehindTheScenes } from "@/components/about/behind-the-scenes";
import { ClientValueDeck } from "@/components/about/client-value-deck";
import { StoryFinalCta } from "@/components/about/story-final-cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Bhavya Chawla — full-stack developer and creative technologist. An interactive look at four years of design and engineering, the way it actually happened.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* 1. Cinematic hero */}
      <AboutHero />

      {/* Hero's closing beat, not a numbered section — same treatment as
          the /projects page's tech strip. */}
      <div className="border-b border-border bg-surface py-8">
        <TechMarqueeStrip />
      </div>

      {/* 2. My Story — vertical scrollytelling */}
      <div id="story">
        <StoryScrollytelling />
      </div>

      {/* 3. Design & development philosophy — asymmetric bento grid, each
          card independently revealed and cursor-tilted. */}
      <Section id="philosophy" dataProgress="Philosophy">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Philosophy
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          How I actually think about the work.
        </h2>
        <div className="mt-12">
          <PhilosophyCards />
        </div>
      </Section>

      {/* 4. Interactive timeline — career, education, and achievement
          milestones, connected by an animated progress rail. */}
      <Section id="timeline" dataProgress="Timeline" className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Timeline
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          Four years, one continuous thread.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-ink-muted md:text-base">
          Drag or scroll through the milestones that actually shaped how I
          work today.
        </p>
        <div className="mt-12">
          <JourneyTimeline />
        </div>
      </Section>

      {/* 5. Tech stack experience — category tabs, cursor-glow cards,
          tooltips, skill-level progress bars. */}
      <Section id="tech" dataProgress="Tech Stack" className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Tech Stack
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          What I actually reach for.
        </h2>
        <div className="mt-12">
          <TechShowcase />
        </div>
      </Section>

      {/* 6. Work process — vertical magazine spread with a scroll-scrubbed
          chapter backdrop. */}
      <Section id="process" dataProgress="Process">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Process
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          Idea to launch, six steps.
        </h2>
        <div className="mt-12">
          <ProcessStoryline />
        </div>
      </Section>

      {/* 7. Achievements — ring counters. */}
      <Section id="achievements" dataProgress="Achievements">
        <AchievementCounters />
      </Section>

      {/* 8. Tools I use — scattered-to-grid entrance. */}
      <Section id="tools" dataProgress="Tools" className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Tools
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          What&apos;s open on my screen, most days.
        </h2>
        <div className="mt-12">
          <ToolsWall />
        </div>
      </Section>

      {/* 9. Behind the scenes — personal, calm on purpose. */}
      <Section id="behind-the-scenes" dataProgress="Behind the Scenes" className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Behind the Scenes
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          What it actually looks like day to day.
        </h2>
        <div className="mt-12">
          <BehindTheScenes />
        </div>
      </Section>

      {/* 10. Why clients work with me — stacked card-deck fan. */}
      <Section id="clients" dataProgress="Why Clients Choose Me" className="pt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Why Clients Work With Me
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink">
          What you actually get.
        </h2>
        <div className="mt-12">
          <ClientValueDeck />
        </div>
      </Section>

      {/* 11. Final CTA — cinematic close. */}
      <Section id="contact" dataProgress="Contact" className="pt-0">
        <StoryFinalCta />
      </Section>
    </>
  );
}
