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
    default: "max-w-[78rem]",
    narrow: "max-w-4xl",
    wide: "max-w-[88rem]",
  };

  return (
    <div className={`mx-auto ${sizeStyles[size]} px-6 lg:px-10 ${className ?? ""}`}>
      {children}
    </div>
  );
}
