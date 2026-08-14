"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group relative flex h-8 w-14 items-center rounded-full border border-border-strong bg-surface-raised px-1 transition-colors duration-300 ease-out"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-surface transition-transform duration-300 ease-out"
        style={{ transform: isDark ? "translateX(24px)" : "translateX(0)" }}
      >
        <span className="text-[10px] font-mono">{isDark ? "D" : "L"}</span>
      </span>
    </button>
  );
}
