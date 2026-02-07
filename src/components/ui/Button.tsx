import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  disabled?: boolean;
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
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 border-2";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-[var(--radius-md)]",
    md: "px-6 py-3 text-base rounded-[var(--radius-md)]",
  };

  const variantStyles = {
    primary: "bg-accent border-accent text-white hover:bg-accent-hover hover:border-text shadow-sm hover:shadow-md",
    secondary: "border-border bg-surface text-text hover:border-accent hover:shadow-md",
    ghost: "border-transparent text-text hover:border-accent hover:shadow-md",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
