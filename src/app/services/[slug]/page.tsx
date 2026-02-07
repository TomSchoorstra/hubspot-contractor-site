import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { services } from "@/content/services";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service not found — Tom Schoorstra",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} — Tom Schoorstra`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        title={service.title}
        subtitle={service.shortDescription}
        primaryCta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "View all services", href: "/services" }}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <div className="space-y-16 lg:space-y-20">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Outcomes
              </h2>
              <ul className="mt-8 space-y-4">
                {service.outcomes.map((outcome, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className="text-lg leading-relaxed text-text-secondary">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-xl)] bg-surface-2 p-8 lg:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Deliverables
              </h2>
              <ul className="mt-8 space-y-4">
                {service.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className="text-lg leading-relaxed text-text-secondary">
                      {deliverable}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-12 text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Process
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {service.process.map((step, index) => (
                  <Card key={index}>
                    <div className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-text">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius-xl)] bg-surface-2 p-8 lg:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Frequently asked questions
              </h2>
              <div className="mt-10 space-y-8">
                {service.faq.map((item, index) => (
                  <div key={index} className="border-b border-border-subtle pb-8 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-text">
                      {item.q}
                    </h3>
                    <p className="mt-3 leading-relaxed text-text-secondary">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to get started?"
        description="Tell me what you're working on and I'll let you know how I can help — no strings attached."
        cta={{ label: "Book a call", href: "/contact" }}
        secondaryCta={{ label: "See case studies", href: "/case-studies" }}
      />
    </main>
  );
}
