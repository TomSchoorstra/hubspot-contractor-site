export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  variant?: "orange" | "teal" | "neutral" | "orange-solid";
  size?: "sm" | "md";
  className?: string;
}) {
  const variantStyles = {
    orange: "bg-accent-light text-accent border border-accent/20",
    "orange-solid": "bg-accent text-white",
    teal: "bg-accent-2-light text-accent-2 border border-accent-2/20",
    neutral: "bg-surface-2 text-text-muted border border-border",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3.5 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${variantStyles[variant]} ${sizeStyles[size]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
