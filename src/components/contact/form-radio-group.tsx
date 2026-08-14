interface FormRadioGroupProps {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}

export function FormRadioGroup({ label, name, options, defaultValue }: FormRadioGroupProps) {
  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-5">
        {options.map((option, i) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted"
          >
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={defaultValue ? option === defaultValue : i === 0}
              className="h-4 w-4 shrink-0 border-border-strong accent-accent"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
