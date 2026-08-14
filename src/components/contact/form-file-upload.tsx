"use client";

import { useId, useRef, useState } from "react";

export const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
export const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip";

interface FormFileUploadProps {
  name: string;
  label: string;
  error?: string;
  onError?: (message: string) => void;
}

function formatBytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FormFileUpload({ name, label, error, onError }: FormFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const id = useId();

  const handleChange = () => {
    const selected = inputRef.current?.files?.[0] ?? null;
    if (selected && selected.size > MAX_FILE_SIZE_BYTES) {
      onError?.(`"${selected.name}" is too large — max file size is 8MB.`);
      if (inputRef.current) inputRef.current.value = "";
      setFile(null);
      return;
    }
    onError?.("");
    setFile(selected);
  };

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    onError?.("");
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
      >
        {label}
      </label>

      <div className="mt-3">
        {file ? (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-border-strong bg-surface px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  d="M6 3h9l3 3v15H6zM15 3v3h3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate text-sm text-ink">{file.name}</span>
              <span className="shrink-0 font-mono text-[11px] text-ink-faint">
                {formatBytes(file.size)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove attached file"
              className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint transition-colors duration-300 ease-out hover:text-accent"
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-border-strong bg-surface px-5 py-6 text-center transition-colors duration-300 ease-out hover:border-accent"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-ink-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                d="M12 3v14m0 0-5-5m5 5 5-5M4 21h16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
              Attach a brief, deck, or reference file (optional, max 8MB)
            </span>
          </label>
        )}

        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleChange}
          className="sr-only"
        />
      </div>

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
