import type { SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  placeholder: string;
}

export function FormSelect({ label, options, placeholder, id, className, ...props }: FormSelectProps) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted"
      >
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        className={`w-full appearance-none rounded-xl border border-border-strong bg-surface px-5 pb-2.5 pt-6 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-300 ease-out focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_14%,transparent)] ${
          className ?? ""
        }`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
