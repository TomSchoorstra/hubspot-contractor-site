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
  // The badge reads as a small station sign: outlined in the current text colour, with a line-coloured dot.
  const dotStyles = {
    orange: "bg-accent",
    "orange-solid": "bg-accent",
    teal: "bg-accent",
    neutral: "bg-current",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3.5 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-current font-semibold ${sizeStyles[size]} ${className ?? ""}`}
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dotStyles[variant]}`} />
      {children}
    </span>
  );
}
