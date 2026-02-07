import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { caseStudies } from "@/content/caseStudies";

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return {
      title: "Case study not found — Tom Schoorstra",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: `${caseStudy.title} — Case study — Tom Schoorstra`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        title={caseStudy.title}
        subtitle={caseStudy.summary}
        primaryCta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "Back to case studies", href: "/case-studies" }}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <div className="space-y-16 lg:space-y-20">
            <div>
              <div className="mb-8 flex gap-4 text-sm font-medium text-text-muted">
                <span>{caseStudy.industry}</span>
                <span>·</span>
                <span>{caseStudy.companySize}</span>
              </div>

              <h2 className="mb-8 text-2xl font-bold tracking-tight text-text lg:text-3xl">
                Results
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudy.results.map((result, index) => (
                  <Card key={index}>
                    <div className="text-3xl font-bold text-accent lg:text-4xl">
                      {result.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-text-secondary">
                      {result.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Challenge
              </h2>
              <ul className="mt-8 space-y-4">
                {caseStudy.challenge.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className="text-lg leading-relaxed text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-xl)] bg-surface-2 p-8 lg:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Approach
              </h2>
              <ul className="mt-8 space-y-4">
                {caseStudy.approach.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className="text-lg leading-relaxed text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Solution
              </h2>
              <ul className="mt-8 space-y-4">
                {caseStudy.solution.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className="text-lg leading-relaxed text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-xl)] bg-surface-2 p-8 lg:p-12">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-text lg:text-4xl">
                Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Want similar results in HubSpot?"
        description="Whether it's automating manual processes, cleaning up your CRM, or building custom integrations — let's talk about what HubSpot can do for your team."
        cta={{ label: "Book a call", href: "/contact" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />
    </main>
  );
}
