import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTASection({
  title,
  description,
  cta,
  secondaryCta,
}: {
  title: string;
  description?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border-2 border-accent/20 bg-accent-light p-8 lg:p-12">
          <div className="absolute inset-0 gradient-blob-orange pointer-events-none" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-text lg:text-3xl">{title}</h2>
              {description && (
                <p className="mt-3 text-lg leading-relaxed text-text-secondary">{description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 md:flex-shrink-0">
              <Button href={cta.href} variant="primary">
                {cta.label}
              </Button>
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
