import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

export default function FeatureGrid({
  title,
  description,
  items,
}: {
  title?: string;
  description?: string;
  items: Array<{ title: string; description: string }>;
}) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        {(title || description) && (
          <div className="mb-12 space-y-4">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">{description}</p>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {items.map((item, index) => (
            <Card key={index} interactive className="group">
              <h3 className="text-lg font-semibold text-text transition-colors group-hover:text-accent">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
