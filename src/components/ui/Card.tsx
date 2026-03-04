export default function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const baseStyles =
    "rounded-2xl border border-border bg-surface p-6 transition-all duration-300";
  const interactiveStyles = interactive
    ? "hover:border-accent/40 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)] hover:-translate-y-1 cursor-pointer"
    : "shadow-sm";

  return (
    <div className={`${baseStyles} ${interactiveStyles} ${className ?? ""}`}>
      {children}
    </div>
  );
}
