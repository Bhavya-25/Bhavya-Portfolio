import type { Usp } from "@/data/usps";
import { FeatureCard } from "./feature-card";
import { CenterMedallion } from "./center-medallion";

// Two cards / center medallion / two cards — the medallion is the visual
// anchor the four cards balance around, not just another grid item.
export function FeatureGrid({ usps }: { usps: Usp[] }) {
  return (
    <div className="feature-grid mt-12 md:mt-16">
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <FeatureCard usp={usps[0]} />
        <FeatureCard usp={usps[1]} />
      </div>

      <div className="medallion-wrap my-8 flex justify-center md:my-12">
        <CenterMedallion />
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <FeatureCard usp={usps[2]} />
        <FeatureCard usp={usps[3]} />
      </div>
    </div>
  );
}
