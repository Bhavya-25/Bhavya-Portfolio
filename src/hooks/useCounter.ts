import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Factors out the count-up-via-proxy-object tween already proven in Home's
 * Stats/StatsBand (gsap.to({value:0}, {onUpdate: () => el.textContent = ...}))
 * — those two stay as-is (not worth risking a regression to refactor them
 * mid-unrelated-task); this hook is for new call sites only, starting with
 * About's achievement counters.
 */
export function useCounter<T extends HTMLElement>(target: number, formatter: (n: number) => string) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = formatter(Math.round(proxy.value));
        },
      });
    },
    { dependencies: [target] }
  );

  return ref as RefObject<T>;
}
