"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

/** Wraps any interactive child (typically a `Button`) with pointer-follow pull. */
export function Magnetic({
  children,
  strength = 18,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useMagnetic<HTMLDivElement>(strength);
  return (
    <div ref={ref} className={`inline-flex ${className ?? ""}`}>
      {children}
    </div>
  );
}
