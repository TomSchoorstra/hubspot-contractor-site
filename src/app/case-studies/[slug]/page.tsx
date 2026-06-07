import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Badge from "@/components/ui/Badge";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { caseStudies } from "@/content/caseStudies";
import { services } from "@/content/services";
import { SITE_URL } from "@/lib/site";

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
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: `${caseStudy.title} — Tom Schoorstra`,
      description: caseStudy.summary,
      url: `/case-studies/${slug}`,
    },
  };
}

function parseMetricValue(val: string): { number: number; suffix: string; prefix: string } | null {
  // Try to extract a leading number
  const match = val.match(/^(~?)(\d+)/);
  if (!match) return null;
  const prefix = match[1] || "";
  const number = parseInt(match[2]);
  const suffix = val.replace(match[0], "");
  return { number, suffix, prefix };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((cs) => cs.slug === slug);
  const caseStudy = caseStudies[index];

  if (!caseStudy) {
    notFound();
  }

  const prevStudy = index > 0 ? caseStudies[index - 1] : null;
  const nextStudy = index < caseStudies.length - 1 ? caseStudies[index + 1] : null;

  // Convert approach to timeline format
  const approachSteps = caseStudy.approach.map((item, i) => ({
    title: `Step ${i + 1}`,
    description: item,
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE_URL}/case-studies` },
      { "@type": "ListItem", position: 3, name: caseStudy.title, item: `${SITE_URL}/case-studies/${slug}` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border-subtle py-14 lg:py-28">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
        <Container>
          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-accent transition-colors"
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All case studies
              </Link>
              <span className="text-border">·</span>
              <Badge variant="neutral" size="sm">{caseStudy.industry}</Badge>
              <Badge variant="neutral" size="sm">{caseStudy.companySize}</Badge>
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-text lg:text-5xl xl:text-6xl max-w-4xl">
              {caseStudy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-secondary">
              {caseStudy.summary}
            </p>
          </div>
        </Container>
      </header>

      {/* Results metrics bar */}
      <div className="bg-accent-2 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {caseStudy.results.map((result, i) => {
              const parsed = parseMetricValue(result.value);
              return (
                <div key={i} className="min-w-0 text-center">
                  <div className="font-display text-xl font-bold text-white leading-tight break-words sm:text-2xl lg:text-3xl">
                    {parsed ? (
                      <AnimatedNumber
                        value={parsed.number}
                        prefix={parsed.prefix}
                        suffix={parsed.suffix}
                      />
                    ) : (
                      result.value
                    )}
                  </div>
                  <div className="mt-2 text-sm font-medium text-white/70">{result.label}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="space-y-20 lg:space-y-28">

            {/* Challenge */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  The problem
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-8 lg:text-4xl">
                  Challenge
                </h2>
                <div className="rounded-3xl border-l-4 border-accent bg-accent-light px-8 py-8 lg:px-10">
                  <div className="space-y-4">
                    {caseStudy.challenge.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <p className="text-lg leading-relaxed text-text-secondary">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Approach */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  How we solved it
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-10 lg:text-4xl">
                  Approach
                </h2>
                <ProcessTimeline steps={approachSteps} />
              </div>
            </ScrollReveal>

            {/* Solution */}
            <ScrollReveal>
              <div className="rounded-3xl bg-surface-2 border border-border p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-2 mb-3">
                  The build
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-8 lg:text-4xl">
                  Solution
                </h2>
                <div className="space-y-4">
                  {caseStudy.solution.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-accent-2/15">
                        <svg aria-hidden="true" className="h-3 w-3 text-accent-2" fill="none" viewBox="0 0 12 12">
                          <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-lg leading-relaxed text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Stack */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  Technologies used
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-6 lg:text-4xl">
                  Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.stack.map((tech) => (
                    <Badge key={tech} variant="teal">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Related services */}
            {caseStudy.relatedServices.length > 0 && (() => {
              const related = services.filter((s) => caseStudy.relatedServices.includes(s.slug));
              if (related.length === 0) return null;
              return (
                <ScrollReveal>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                      Related services
                    </p>
                    <h2 className="font-display text-3xl font-bold text-text mb-8 lg:text-4xl">
                      How I can help you with this
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {related.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className="group block">
                          <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)]">
                            <h3 className="font-display text-lg font-bold text-text transition-colors group-hover:text-accent">
                              {s.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                              {s.shortDescription}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                              Learn more
                              <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}

            {/* Prev / Next navigation */}
            {(prevStudy || nextStudy) && (
              <ScrollReveal>
                <div className="border-t border-border pt-10 flex flex-col sm:flex-row gap-4 justify-between">
                  {prevStudy ? (
                    <Link
                      href={`/case-studies/${prevStudy.slug}`}
                      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-md flex-1"
                    >
                      <svg aria-hidden="true" className="h-5 w-5 text-text-muted transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 20 20">
                        <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <div className="text-xs font-medium text-text-muted">Previous</div>
                        <div className="text-sm font-semibold text-text group-hover:text-accent transition-colors">{prevStudy.title}</div>
                      </div>
                    </Link>
                  ) : <div className="flex-1" />}
                  {nextStudy ? (
                    <Link
                      href={`/case-studies/${nextStudy.slug}`}
                      className="group flex items-center justify-end gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-md flex-1 text-right"
                    >
                      <div>
                        <div className="text-xs font-medium text-text-muted">Next</div>
                        <div className="text-sm font-semibold text-text group-hover:text-accent transition-colors">{nextStudy.title}</div>
                      </div>
                      <svg aria-hidden="true" className="h-5 w-5 text-text-muted transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 20 20">
                        <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  ) : <div className="flex-1" />}
                </div>
              </ScrollReveal>
            )}
          </div>
        </Container>
      </section>

      <CTASection
        title="Want similar results in HubSpot?"
        description="Whether it's automating manual processes, cleaning up your CRM, or building custom integrations — let's talk about what HubSpot can do for your team."
        cta={{ label: "Let's talk", href: "/contact" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />
    </main>
  );
}
