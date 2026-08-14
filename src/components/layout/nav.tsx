"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { StatusBadge } from "@/components/ui/status-badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { NavLink, useIsActive } from "@/components/nav/nav-link";
import { MegaMenu, type MegaMenuKind } from "@/components/nav/mega-menu";
import { MobileNav } from "./mobile-nav";
import { mainNavigation } from "@/data/navigation";

/** Hover-intent delay so the panel doesn't flicker when crossing the trigger. */
const CLOSE_DELAY_MS = 120;

function MegaTrigger({
  label,
  href,
  isMenuOpen,
  onOpen,
  onClose,
  onNavigate,
  kind,
}: {
  label: string;
  href: string;
  isMenuOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
  kind: MegaMenuKind;
}) {
  const isActive = useIsActive(href);

  return (
    <div
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className="static"
    >
      <Link
        href={href}
        onClick={onNavigate}
        onFocus={onOpen}
        aria-expanded={isMenuOpen}
        aria-current={isActive ? "page" : undefined}
        className="group inline-flex items-center gap-1.5"
      >
        <NavLink href={href} asTrigger>
          {label}
        </NavLink>
        <span
          aria-hidden="true"
          className="font-mono text-[9px] text-ink-faint transition-transform duration-300 ease-out"
          style={{ transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </Link>
      <span className="sr-only">{kind} menu</span>
    </div>
  );
}

export function Nav() {
  const [openMenu, setOpenMenu] = useState<MegaMenuKind | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Shrink the header once the page has moved past the hero's first fold.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any route change closes whatever was open. Adjusted during render (the
  // React-recommended pattern) rather than in an effect, which would cause a
  // cascading second render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
  }

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const open = (kind: MegaMenuKind) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(kind);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  };

  const closeNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };

  // Keyboard users open the menu via focus; close it once focus leaves the
  // header entirely (relatedTarget is the element gaining focus).
  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !event.currentTarget.contains(next)) closeNow();
  };

  return (
    <header
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
      className={`fixed inset-x-0 top-0 z-50 px-6 transition-[padding] duration-300 ease-out md:px-10 ${
        isScrolled ? "py-2.5" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between gap-4 rounded-full border border-border/70 bg-surface/70 backdrop-blur-md transition-[padding,box-shadow] duration-300 ease-out ${
          isScrolled
            ? "px-5 py-2 shadow-[var(--shadow-soft)]"
            : "px-5 py-2.5"
        }`}
      >
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-ink"
        >
          Bhavya Chawla
        </Link>

        {/* Desktop (≥1024px) */}
        <nav className="hidden items-center gap-7 lg:flex">
          {mainNavigation.map((item) =>
            item.megaMenu ? (
              <MegaTrigger
                key={item.href}
                kind={item.megaMenu}
                label={item.label}
                href={item.href}
                isMenuOpen={openMenu === item.megaMenu}
                onOpen={() => open(item.megaMenu as MegaMenuKind)}
                onClose={scheduleClose}
                onNavigate={closeNow}
              />
            ) : (
              <div key={item.href} onMouseEnter={scheduleClose}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </div>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="hidden xl:block">
            <StatusBadge label="Available for selected projects" />
          </div>
          <ThemeToggle />
          <Button href="/contact" shape="compact" arrow={false}>
            Book a Call
          </Button>
        </div>

        {/* Tablet / mobile (<1024px) */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>

      {/* Mega menus — desktop only */}
      <div
        className="hidden lg:block"
        onMouseEnter={() => openMenu && open(openMenu)}
        onMouseLeave={scheduleClose}
      >
        <MegaMenu kind="services" isOpen={openMenu === "services"} onNavigate={closeNow} />
        <MegaMenu kind="resources" isOpen={openMenu === "resources"} onNavigate={closeNow} />
      </div>
    </header>
  );
}
