export default function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const sizeStyles = {
    default: "max-w-6xl",
    narrow: "max-w-4xl",
    wide: "max-w-7xl",
  };

  return (
    <div className={`mx-auto ${sizeStyles[size]} px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}
