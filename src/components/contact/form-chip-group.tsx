"use client";

interface FormChipGroupProps {
  label: string;
  name: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}

// Multi-select "services required" picker. Native <select multiple> is
// unusable on touch and ugly everywhere, so this renders as toggle chips
// and submits each pick as its own `name` entry via hidden checkboxes —
// keeps the group natively serializable in FormData without extra JS glue.
export function FormChipGroup({ label, name, options, selected, onChange }: FormChipGroupProps) {
  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  };

  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const isChecked = selected.includes(option);
          return (
            <label key={option} className="cursor-pointer">
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={isChecked}
                onChange={() => toggle(option)}
                className="peer sr-only"
              />
              <span className="inline-flex items-center rounded-full border border-border-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted transition-colors duration-300 ease-out peer-checked:border-ink peer-checked:bg-ink peer-checked:text-surface peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-2 hover:border-ink">
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
