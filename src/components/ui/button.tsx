import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "inverse-outline";
export type ButtonShape = "pill" | "compact" | "block";
export type ButtonState = "idle" | "loading" | "success";

interface SharedProps {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  arrow?: boolean;
  state?: ButtonState;
  loadingLabel?: string;
  successLabel?: string;
  dataCursor?: string;
  className?: string;
  children: ReactNode;
}

type LinkProps = SharedProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonProps = SharedProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-surface hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.35)] disabled:opacity-60",
  secondary:
    "border border-border-strong bg-transparent text-ink hover:border-ink disabled:opacity-60",
  inverse:
    "bg-white text-[#0b0a09] hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.5)] disabled:opacity-60",
  "inverse-outline":
    "border border-white/15 bg-transparent text-white hover:border-white/35 disabled:opacity-60",
};

const SUCCESS_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-ink",
  secondary: "border-accent text-accent",
  inverse: "bg-[#ff7a42] text-[#17140f]",
  "inverse-outline": "border-[#ff7a42] text-[#ff7a42]",
};

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  pill: "gap-2 rounded-full px-6 py-3 text-[11px] tracking-[0.08em]",
  compact: "gap-1.5 rounded-full px-4 py-2 text-[10px] tracking-[0.08em]",
  block: "w-full justify-center gap-2 rounded-xl px-8 py-5 text-xs tracking-[0.1em]",
};

const BASE_CLASSES =
  "group inline-flex shrink-0 items-center font-mono uppercase transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none";

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ButtonContent({
  state,
  arrow,
  loadingLabel,
  successLabel,
  children,
}: Pick<SharedProps, "state" | "arrow" | "loadingLabel" | "successLabel" | "children">) {
  if (state === "success") {
    return (
      <>
        <CheckIcon />
        {successLabel ?? children}
      </>
    );
  }
  if (state === "loading") {
    return (
      <>
        <Spinner />
        {loadingLabel ?? "Loading…"}
      </>
    );
  }
  return (
    <>
      {children}
      {arrow && (
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );
}

export function Button({
  variant = "primary",
  shape = "pill",
  arrow = true,
  state = "idle",
  loadingLabel,
  successLabel,
  dataCursor,
  className,
  children,
  href,
  ...props
}: LinkProps | ButtonProps) {
  const classes = `${BASE_CLASSES} ${SHAPE_CLASSES[shape]} ${
    state === "success" ? SUCCESS_CLASSES[variant] : VARIANT_CLASSES[variant]
  } ${className ?? ""}`;

  const content = (
    <ButtonContent
      state={state}
      arrow={arrow}
      loadingLabel={loadingLabel}
      successLabel={successLabel}
    >
      {children}
    </ButtonContent>
  );

  if (href) {
    return (
      <a
        href={href}
        data-cursor={dataCursor}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      data-cursor={dataCursor}
      disabled={state === "loading" || state === "success"}
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
