"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import type { FaqItem } from "@/data/faq";
import { FAQNavigationItem } from "./faq-navigation-item";

interface FAQNavigationProps {
  items: FaqItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function FAQNavigation({ items, activeId, onSelect }: FAQNavigationProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyNav = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + direction + items.length) % items.length;
    onSelect(items[nextIndex].id);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <nav className="faq-nav flex flex-col" aria-label="Frequently asked questions">
      {items.map((item, index) => (
        <FAQNavigationItem
          key={item.id}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          item={item}
          isActive={item.id === activeId}
          onSelect={() => onSelect(item.id)}
          onKeyNav={(event) => handleKeyNav(event, index)}
        />
      ))}
    </nav>
  );
}
