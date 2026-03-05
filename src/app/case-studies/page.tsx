import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Case Studies — Tom Schoorstra",
  description:
    "Real HubSpot projects, real results — from finance automation to full CRM architecture.",
  openGraph: {
    title: "Case Studies — Tom Schoorstra",
    description:
      "Real HubSpot projects, real results — from finance automation to full CRM architecture.",
    url: "/case-studies",
  },
};
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import CTASection from "@/components/sections/CTASection";
import { caseStudies } from "@/content/caseStudies";

export default function CaseStudies() {
  return (
    <main>
      <PageHeader
        eyebrow="Case studies"
        title="Real projects, real results"
        subtitle="Here's how I've helped teams get more out of HubSpot — from finance automation to full CRM architecture."
        primaryCta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 0.08}>
                <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                  <div className="h-full rounded-3xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)]">
                    {/* Top accent stripe */}
                    <div className="h-1 w-full bg-gradient-to-r from-accent to-accent/40" />

                    <div className="p-8 flex flex-col h-full">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-5">
                        <Badge variant="neutral" size="sm">{study.industry}</Badge>
                        <Badge variant="neutral" size="sm">{study.companySize}</Badge>
                      </div>

                      {/* Result highlight */}
                      <div className="mb-4">
                        <Badge variant="orange">{study.results[0].value}</Badge>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-text transition-colors group-hover:text-accent">
                        {study.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-text-secondary flex-1">
                        {study.summary}
                      </p>

                      {/* All results */}
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {study.results.slice(0, 2).map((result, ri) => (
                          <div
                            key={ri}
                            className="rounded-xl bg-surface-2 border border-border-subtle px-4 py-3"
                          >
                            <div className="font-display text-xl font-bold text-accent">
                              {result.value}
                            </div>
                            <div className="mt-0.5 text-xs font-medium text-text-muted">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {study.stack.map((tech) => (
                          <Badge key={tech} variant="teal" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                        Read case study
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Want similar results for your team?"
        description="Whether it's automation, integrations, or a full CRM cleanup — let's figure out what HubSpot can do for your business."
        cta={{ label: "Let's talk", href: "/contact" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />
    </main>
  );
}
