import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <header className="relative overflow-hidden border-b border-border-subtle py-20 lg:py-28">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />

      <Container>
        <div className="relative space-y-7">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-text lg:text-5xl xl:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-xl leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary" showArrow>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
