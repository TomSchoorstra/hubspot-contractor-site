export default function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const baseStyles = "rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-all duration-200";
  const interactiveStyles = interactive ? "hover:border-accent hover:shadow-md" : "shadow-sm";

  return (
    <div className={`${baseStyles} ${interactiveStyles} ${className ?? ""}`}>
      {children}
    </div>
  );
}
