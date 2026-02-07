import Container from "@/components/ui/Container";

export default function Section({
  title,
  eyebrow,
  description,
  children,
  className,
  background = "transparent",
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  background?: "transparent" | "subtle" | "gradient";
}) {
  const bgStyles = {
    transparent: "",
    subtle: "bg-surface-2",
    gradient: "gradient-mesh",
  };

  return (
    <section className={`py-16 lg:py-20 ${bgStyles[background]} ${className ?? ""}`}>
      {(eyebrow || title || description) && (
        <Container>
          <div className="mb-12 space-y-4">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">{description}</p>
            )}
          </div>
        </Container>
      )}
      {children}
    </section>
  );
}
