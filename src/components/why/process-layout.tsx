import { processSteps } from "@/data/process";
import { ProcessCard } from "./process-card";
import { ProcessHeroCard } from "./process-hero-card";

// Three process cards / large hero image card / three process cards — an
// art-directed wraparound composition, not a vertical timeline or a flat
// six-card grid.
export function ProcessLayout() {
  const topThree = processSteps.slice(0, 3);
  const bottomThree = processSteps.slice(3, 6);

  return (
    <div className="process-layout mt-10 md:mt-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {topThree.map((step, index) => (
          <ProcessCard key={step.id} step={step} index={index} />
        ))}
      </div>

      <div className="my-4 md:my-6">
        <ProcessHeroCard />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {bottomThree.map((step, index) => (
          <ProcessCard key={step.id} step={step} index={index + 3} />
        ))}
      </div>
    </div>
  );
}
