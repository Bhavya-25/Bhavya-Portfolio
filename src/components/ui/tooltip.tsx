"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Hover + focus triggered (not hover-only, so it's reachable by keyboard —
 * no tooltip component existed anywhere in this codebase before this one).
 * `tabIndex={0}` lives on this wrapper, not the child, because both call
 * sites (tech showcase monogram, tools wall icon) wrap a plain non-interactive
 * span — without it, keyboard users could Tab straight past the trigger and
 * never see the tooltip at all (confirmed via a manual keyboard check: focus
 * landed nowhere and the tooltip never appeared). `aria-describedby` links
 * the trigger to the tooltip text for screen readers, not just sighted
 * hover/focus users.
 * Positioned with a plain CSS transform above the trigger; no portal, no
 * viewport-edge collision handling — the two call sites both sit in the
 * interior of their own grids, far enough from the viewport edge that a
 * fixed "above center" placement never clips.
 */
export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex cursor-default"
      tabIndex={0}
      aria-describedby={id}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-surface transition-[opacity,transform] duration-200 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translate(-50%, ${visible ? "0" : "4px"})`,
        }}
      >
        {label}
      </span>
    </span>
  );
}
