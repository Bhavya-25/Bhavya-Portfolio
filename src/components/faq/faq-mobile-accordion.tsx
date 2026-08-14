"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";

// Mobile: the split layout doesn't have room to breathe, so it collapses
// into a straightforward accordion — same typography, same premium feel.
export function FAQMobileAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="mt-10 border-t border-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full touch-manipulation items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={`font-display tracking-tight transition-colors duration-300 ${
                  isOpen ? "text-lg font-semibold text-ink" : "text-base font-medium text-ink-muted"
                }`}
              >
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-lg text-ink-faint transition-transform duration-300 ease-out"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="max-w-xl pb-6 text-sm text-ink-muted md:text-base">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
