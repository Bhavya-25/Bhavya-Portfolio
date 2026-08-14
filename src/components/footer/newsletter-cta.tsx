"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterCta() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: data.get("website"),
          startedAt: startedAt.current,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setStatus("error");
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Please try again.");
    }
  };

  return (
    <div className="footer-newsletter rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur-md md:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
            Bhavya Chawla · Creative Technologist
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-tight text-white">
            Let&apos;s build something worth remembering.
          </h2>
          <p className="mt-3 text-sm text-white/55 md:text-base">
            Occasional notes on new work and things I&apos;m building with —
            no spam, just what&apos;s worth your time.
          </p>
        </div>

        {status === "success" ? (
          <p className="font-mono text-sm text-[#ff7a42] md:max-w-xs md:text-right">
            Thanks — I&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-start"
            noValidate
          >
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="newsletter-website">Website</label>
              <input type="text" id="newsletter-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex-1">
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white outline-none transition-[border-color,box-shadow] duration-300 ease-out placeholder:text-white/35 hover:border-white/25 focus:border-[#ff7a42] focus:shadow-[0_0_0_4px_rgba(255,122,66,0.16)]"
              />
              {status === "error" && (
                <p className="mt-2 pl-2 font-mono text-[11px] text-[#ff7a42]">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="inverse"
              state={status === "loading" ? "loading" : "idle"}
              loadingLabel="Sending…"
              dataCursor="Subscribe"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
