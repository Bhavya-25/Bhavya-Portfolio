import type { Capability } from "@/data/capabilities";
import { CapabilityRow } from "./capability-row";

interface CapabilityListProps {
  capabilities: Capability[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function CapabilityList({ capabilities, activeIndex, onSelect }: CapabilityListProps) {
  return (
    <ol className="border-t border-border">
      {capabilities.map((capability, index) => (
        <CapabilityRow
          key={capability.id}
          capability={capability}
          isActive={index === activeIndex}
          onSelect={() => onSelect(index)}
        />
      ))}
    </ol>
  );
}
