"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  /** Rendered inside a mega-menu trigger — suppresses its own Link wrapper. */
  asTrigger?: boolean;
  onClick?: () => void;
}

export function useIsActive(href: string): boolean {
  const pathname = usePathname();
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The site's single link interaction: an underline that wipes in from the left
 * and stays put while the route is active. Used by the header and mega menus so
 * every nav affordance behaves identically.
 */
export function NavLink({ href, children, asTrigger, onClick }: NavLinkProps) {
  const isActive = useIsActive(href);

  const inner = (
    <span className="relative inline-block py-1">
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-300 ease-out ${
          isActive ? "text-ink" : "text-ink-muted group-hover:text-ink"
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ease-out"
        style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </span>
  );

  if (asTrigger) return inner;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className="group inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
