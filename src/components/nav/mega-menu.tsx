"use client";

import Link from "next/link";
import { services, serviceGroups, getServicesByGroup } from "@/data/services";
import { resources } from "@/data/resources";
import { ServiceIcon } from "@/components/contact/service-icon";
import { Button } from "@/components/ui/button";

export type MegaMenuKind = "services" | "resources";

interface MegaMenuProps {
  kind: MegaMenuKind;
  isOpen: boolean;
  onNavigate: () => void;
}

const COPY: Record<MegaMenuKind, { eyebrow: string; heading: string; body: string; cta: string; href: string }> = {
  services: {
    eyebrow: "Services",
    heading: "Build modern digital products from idea to launch.",
    body: "Design, engineering, and creative technology handled by one person — from the first wireframe to the deployed build.",
    cta: "All services",
    href: "/services",
  },
  resources: {
    eyebrow: "Resources",
    heading: "How I work, and what I've learned doing it.",
    body: "Process notes, technical writing, and reference material from real product work.",
    cta: "All resources",
    href: "/resources",
  },
};

function Row({
  href,
  title,
  summary,
  icon,
  onNavigate,
}: {
  href: string;
  title: string;
  summary: string;
  icon: React.ComponentProps<typeof ServiceIcon>["kind"];
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group/row flex items-start gap-3 rounded-xl border border-transparent p-3 transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-border hover:bg-surface-raised"
    >
      <span className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-colors duration-300 ease-out group-hover/row:text-accent">
        <ServiceIcon kind={icon} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="font-display text-sm font-medium tracking-tight text-ink">
            {title}
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-xs text-accent opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/row:translate-x-0.5 group-hover/row:opacity-100"
          >
            →
          </span>
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
          {summary}
        </span>
      </span>
    </Link>
  );
}

export function MegaMenu({ kind, isOpen, onNavigate }: MegaMenuProps) {
  const copy = COPY[kind];

  return (
    <div
      // `inert` removes the whole subtree from the tab order and the
      // accessibility tree while closed — opacity/pointer-events alone would
      // leave 20+ invisible links reachable by keyboard.
      inert={!isOpen}
      className="absolute inset-x-6 top-full pt-3 md:inset-x-10"
    >
      <div
        className="mx-auto max-w-[1600px] origin-top overflow-hidden rounded-[1.75rem] border border-border bg-surface/95 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.99)",
        }}
      >
        <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:gap-12 lg:p-10">
          {/* Left — editorial intro */}
          <div className="flex flex-col justify-between gap-6 border-border lg:border-r lg:pr-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                {copy.eyebrow}
              </p>
              <p className="mt-4 font-display text-2xl font-medium leading-[1.15] tracking-tight text-ink">
                {copy.heading}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {copy.body}
              </p>
            </div>

            <Button href={copy.href} onClick={onNavigate} className="w-fit">
              {copy.cta}
            </Button>
          </div>

          {/* Right — grouped rows */}
          {kind === "services" ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
              {serviceGroups.map((group) => (
                <div key={group}>
                  <p className="px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {group}
                  </p>
                  <div className="mt-1.5 flex flex-col">
                    {getServicesByGroup(group).map((service) => (
                      <Row
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        title={service.title}
                        summary={service.summary}
                        icon={service.icon}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
              {resources.map((resource) => (
                <Row
                  key={resource.slug}
                  href={resource.href ?? `/resources/${resource.slug}`}
                  title={resource.title}
                  summary={resource.summary}
                  icon={resource.icon}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </div>

        {kind === "services" && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-raised/60 px-8 py-4 lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              {services.length} services · one person, start to finish
            </p>
            <Link
              href="/contact"
              onClick={onNavigate}
              className="group/cta inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:text-accent"
            >
              Book a call
              <span className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
