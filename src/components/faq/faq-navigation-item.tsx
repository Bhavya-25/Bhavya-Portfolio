import { forwardRef } from "react";
import type { KeyboardEvent } from "react";
import type { FaqItem } from "@/data/faq";

interface FAQNavigationItemProps {
  item: FaqItem;
  isActive: boolean;
  onSelect: () => void;
  onKeyNav: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export const FAQNavigationItem = forwardRef<HTMLButtonElement, FAQNavigationItemProps>(
  function FAQNavigationItem({ item, isActive, onSelect, onKeyNav }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onSelect}
        onKeyDown={onKeyNav}
        aria-current={isActive}
        className="faq-nav-item border-l-2 py-5 pl-6 pr-4 text-left transition-[border-color,transform] duration-300 ease-out"
        style={{
          borderColor: isActive ? "var(--color-accent)" : "var(--color-border)",
          transform: isActive ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <span
          className={`block font-display tracking-tight transition-colors duration-300 ${
            isActive
              ? "text-lg font-semibold text-ink md:text-xl"
              : "text-base font-medium text-ink-muted"
          }`}
        >
          {item.question}
        </span>
      </button>
    );
  }
);
