import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] items-center pt-32">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          404
        </p>
        <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.03] tracking-tight text-ink">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-md text-base text-ink-muted md:text-lg">
          The link may be outdated, or the page hasn&apos;t been built yet.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/">Back home</Button>
          <Button href="/contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </div>
    </Section>
  );
}
