"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";

const DETAILS = [
  {
    label: "Email",
    value: "bhavvyawork@gmail.com",
    href: "mailto:bhavvyawork@gmail.com",
    external: false,
    icon: (
      <path
        d="M4 6h16v12H4zM4 7l8 6 8-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Location",
    value: "India — working with teams worldwide",
    href: null,
    icon: (
      <path
        d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Response Time",
    value: "Within 24 hours, personally",
    href: null,
    icon: <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: "Availability",
    value: "Open for selected new projects",
    href: null,
    icon: (
      <path
        d="M9 12.5 11 14.5 15 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/bhavya-chawla-4396661a5/",
    external: true,
    icon: (
      <path
        d="M4 4h16v16H4zM8 10v6M8 7.5v.01M12 16v-3.5c0-1.4 1-2.5 2.5-2.5S17 11.1 17 12.5V16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Upwork",
    value: "Top Rated freelancer profile",
    href: "https://www.upwork.com/freelancers/~01148682312bc485f3?mp_source=share",
    external: true,
    icon: (
      <path
        d="M7 13c0 2.2 1.8 4 4 4s4-1.8 4-4V8m-8 5V8m8 5c1.7 3.3 5 3.7 6-1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function ContactInfoGrid() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".info-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".info-card", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root }
  );

  return (
    <Section ref={root} dataProgress="Contact Information">
      <p className="info-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        03 / Contact Information
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
        {DETAILS.map((detail) => {
          const content = (
            <>
              <div className="flex items-start justify-between">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-ink-faint transition-colors duration-300 ease-out group-hover:text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  {detail.icon}
                </svg>
                {detail.href && (
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-ink-faint opacity-0 transition-[opacity,transform] duration-300 ease-out -translate-x-1 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                  >
                    →
                  </span>
                )}
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                {detail.label}
              </p>
              <p className="mt-1.5 text-sm text-ink md:text-base">{detail.value}</p>
            </>
          );

          const className =
            "info-card group relative block rounded-2xl border border-border bg-surface-raised p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.3)]";

          return detail.href ? (
            <a
              key={detail.label}
              href={detail.href}
              target={detail.external ? "_blank" : undefined}
              rel={detail.external ? "noreferrer" : undefined}
              data-cursor="Open"
              className={className}
            >
              {content}
            </a>
          ) : (
            <div key={detail.label} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
