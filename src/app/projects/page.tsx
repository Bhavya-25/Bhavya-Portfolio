import { Section } from "@/components/ui/section";
import { PortfolioHero } from "@/components/work/portfolio-hero";
import { FeaturedShowcase } from "@/components/work/featured-showcase";
import { TechMarqueeStrip } from "@/components/work/tech-marquee-strip";
import { ClientTestimonials } from "@/components/work/client-testimonials";
import { StatsBand } from "@/components/work/stats-band";
import { PortfolioCta } from "@/components/work/portfolio-cta";
import { ExploreCards } from "@/components/work/explore-cards";
import { ProjectFilterGrid } from "@/components/work/project-filter-grid";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected work by Bhavya Chawla — full-stack products, Shopify storefronts, mobile apps, design systems, and content platforms.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      {/* 01. Hero */}
      <PortfolioHero />

      {/* 02. Featured Work — immersive showcase */}
      <FeaturedShowcase />

      {/* Interstitial — infinite tech strip */}
      <div className="border-y border-border py-8">
        <TechMarqueeStrip />
      </div>

      {/* 03. Full Archive — filterable */}
      <Section dataProgress="Full Archive">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          03 / Full Archive
        </p>
        <div className="mt-10 md:mt-14">
          <ProjectFilterGrid projects={projects} />
        </div>
      </Section>

      {/* 04. What Clients Say — testimonials + review platforms */}
      <ClientTestimonials />

      {/* 05. Credibility — real stats, cinematic band */}
      <StatsBand />

      {/* 06. Start a Project — gradient CTA */}
      <PortfolioCta />

      {/* 07. Explore More — real internal pages */}
      <ExploreCards />
    </>
  );
}
