import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function PageHeader({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <header className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 gradient-blob-orange pointer-events-none" />
      <Container size="narrow">
        <div className="relative space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-text lg:text-5xl xl:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-xl leading-relaxed text-text-secondary">{subtitle}</p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary">
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
