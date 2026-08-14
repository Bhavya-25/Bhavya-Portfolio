import type { ReactNode, Ref } from "react";

/**
 * The site's single source of truth for section rhythm.
 *
 * Vertical:   40px mobile / 80px desktop  (py-10 md:py-20)
 * Horizontal: 24px mobile / 40px desktop  (px-6 md:px-10)
 * Container:  max-w-[1600px], centered
 *
 * Every top-level section goes through this so left/right edges and
 * section-to-section spacing stay identical across the whole page. Sections
 * with their own backdrop (dark panels, particle fields) pass extra classes
 * via `className`; the inner container can be extended via `containerClassName`.
 */

export const SECTION_PADDING = "px-6 py-10 md:px-10 md:py-20";
export const SECTION_CONTAINER = "mx-auto w-full max-w-[1600px]";

interface SectionProps {
  id?: string;
  dataProgress?: string;
  className?: string;
  containerClassName?: string;
  /**
   * Full-bleed layers (particle fields, gradients) rendered as direct children
   * of the <section> — outside the max-width container, so `absolute inset-0`
   * spans the entire section rather than the padded container box.
   */
  backdrop?: ReactNode;
  ref?: Ref<HTMLElement>;
  children: ReactNode;
}

export function Section({
  id,
  dataProgress,
  className,
  containerClassName,
  backdrop,
  ref,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      ref={ref}
      data-progress={dataProgress}
      className={`scroll-mt-24 ${SECTION_PADDING} ${className ?? ""}`}
    >
      {backdrop}
      <div className={`${SECTION_CONTAINER} ${containerClassName ?? ""}`}>
        {children}
      </div>
    </section>
  );
}
