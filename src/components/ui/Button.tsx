import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  showArrow?: boolean;
} & (
  | {
      href: string;
      onClick?: never;
      type?: never;
    }
  | {
      href?: never;
      onClick?: () => void;
      type?: "button" | "submit" | "reset";
    }
);

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
  showArrow = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 border-2 group";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl",
  };

  const variantStyles = {
    primary:
      "bg-accent border-accent text-white shadow-sm hover:bg-accent-hover hover:border-accent-hover hover:shadow-md hover:-translate-y-px",
    secondary:
      "border-border bg-surface text-text hover:border-accent hover:shadow-md hover:-translate-y-px",
    ghost:
      "border-transparent text-text hover:border-accent/30 hover:bg-surface-2",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const arrow = showArrow ? (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : null;

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {arrow}
    </button>
  );
}
