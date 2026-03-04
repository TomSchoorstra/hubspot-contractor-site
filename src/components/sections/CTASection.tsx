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
        <div className="relative overflow-hidden rounded-3xl bg-accent-light border-2 border-accent/15 px-8 py-14 lg:px-14">
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[60px] pointer-events-none" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-text lg:text-4xl">{title}</h2>
              {description && (
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">{description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 lg:flex-shrink-0">
              <Button href={cta.href} variant="primary" showArrow>
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
