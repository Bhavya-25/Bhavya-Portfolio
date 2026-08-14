import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, id, className, ...props }: FormInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        placeholder={label}
        className={`peer w-full rounded-xl border bg-surface px-5 pb-2.5 pt-6 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-300 ease-out placeholder:text-transparent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_14%,transparent)] ${
          error ? "border-accent" : "border-border-strong focus:border-accent"
        } ${className ?? ""}`}
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-4 font-mono text-sm text-ink-faint transition-all duration-300 ease-out peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.08em] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.08em] peer-[:not(:placeholder-shown)]:text-ink-muted"
      >
        {label}
      </label>
      <p
        className={`mt-1.5 overflow-hidden font-mono text-[11px] text-accent transition-all duration-300 ease-out ${
          error ? "max-h-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {error}
      </p>
    </div>
  );
}
