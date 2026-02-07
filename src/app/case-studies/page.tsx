import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { caseStudies, caseStudiesHeroIntro } from "@/content/caseStudies";

export default function CaseStudies() {
  return (
    <main>
      <PageHeader
        title="Case studies"
        subtitle={caseStudiesHeroIntro}
        primaryCta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group block"
              >
                <Card interactive className="h-full">
                  <div className="mb-3 flex gap-2 text-xs font-medium text-text-muted">
                    <span>{study.industry}</span>
                    <span>·</span>
                    <span>{study.companySize}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text transition-colors group-hover:text-accent">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {study.summary}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
