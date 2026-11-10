export default function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const baseStyles = "border-t-[10px] border-ink bg-paper-2 p-6 sm:p-10";
  const interactiveStyles = interactive ? "cursor-pointer transition-colors hover:bg-accent-light" : "";

  return (
    <div className={`${baseStyles} ${interactiveStyles} ${className ?? ""}`}>
      {children}
    </div>
  );
}
