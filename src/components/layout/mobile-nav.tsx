"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { StatusBadge } from "@/components/ui/status-badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { mainNavigation } from "@/data/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const mounted = useMounted();
  const pathname = usePathname();

  // Close on navigation — covers back/forward as well as link taps. Adjusted
  // during render rather than in an effect to avoid a cascading re-render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // Close on ESC, and lock body scroll while the panel is open. The scrollbar
  // width is compensated so the page behind doesn't shift as it locks.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    window.addEventListener("keydown", handleKey);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  useGSAP(
    () => {
      if (!isOpen || prefersReducedMotion) return;

      gsap.from(".mobile-nav-item", {
        opacity: 0,
        y: 24,
        duration: 0.45,
        ease: EASE.out,
        stagger: 0.06,
        delay: 0.12,
      });

      gsap.from(".mobile-nav-footer", {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: EASE.out,
        delay: 0.3,
      });
    },
    { scope: panelRef, dependencies: [isOpen] }
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        className="relative z-[70] flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-surface-raised"
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span
            className="absolute left-0 block h-px w-full bg-ink transition-transform duration-300 ease-out"
            style={{
              transform: isOpen
                ? "translateY(6px) rotate(45deg)"
                : "translateY(0) rotate(0deg)",
            }}
          />
          <span
            className="absolute left-0 top-[6px] block h-px w-full bg-ink transition-opacity duration-200 ease-out"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="absolute bottom-0 left-0 block h-px w-full bg-ink transition-transform duration-300 ease-out"
            style={{
              transform: isOpen
                ? "translateY(-6px) rotate(-45deg)"
                : "translateY(0) rotate(0deg)",
            }}
          />
        </span>
      </button>

      {/* Portalled to <body>: the header pill uses backdrop-blur, which
          creates a containing block and would otherwise trap these
          position:fixed layers inside the nav bar. */}
      {mounted &&
        createPortal(
          <>
            {/* Scrim — click-outside closes the panel */}
            <div
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[55] bg-ink/25 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden"
              style={{
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
              }}
            />

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        aria-hidden={!isOpen}
        className="fixed inset-y-0 right-0 z-[60] flex w-[min(88vw,380px)] flex-col justify-between overflow-y-auto border-l border-border bg-surface px-6 pb-8 pt-24 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(101%)" }}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {mainNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              className="mobile-nav-item border-b border-border py-5 font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 ease-out hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-nav-footer mt-10 flex flex-col gap-6">
          <StatusBadge label="Available for selected projects" />

          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
              Theme
            </span>
            <ThemeToggle />
          </div>

          <Button
            href="/contact"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
            className="w-full justify-center"
          >
            Book a Call
          </Button>
        </div>
      </div>
          </>,
          document.body
        )}
    </div>
  );
}
