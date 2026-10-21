import Link from "next/link";
import Container from "@/components/ui/Container";
import type { CaseStudy } from "@/content/caseStudies";
import { services } from "@/content/services";

const textLink = "font-semibold text-text underline underline-offset-4 hover:text-accent-text";

export default function CompactCaseStudyContent({
  caseStudy,
  previous,
  next,
}: {
  caseStudy: CaseStudy;
  previous: CaseStudy | null;
  next: CaseStudy | null;
}) {
  const narrative = caseStudy.narrative;
  const related = services.filter(service => caseStudy.relatedServices.includes(service.slug));

  return (
    <>
      <header className="relative overflow-hidden border-b border-border-subtle py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <div className="max-w-3xl">
            <Link href="/case-studies" className={`text-sm ${textLink}`}>← All case studies</Link>
            <p className="mt-5 text-sm text-text-secondary">{caseStudy.industry} · {caseStudy.companySize}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">{caseStudy.title}</h1>
            <div className="mt-5 space-y-4 text-xl leading-relaxed text-text-secondary">
              {(narrative?.intro ?? [caseStudy.summary]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {caseStudy.statusNote && <p className="mt-5 text-base leading-relaxed text-text-secondary">{caseStudy.statusNote}</p>}
          </div>
        </Container>
      </header>

      <section className="py-12 lg:py-16">
        <Container size="narrow">
          <div className="max-w-3xl space-y-9 text-lg leading-relaxed text-text-secondary">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">{narrative?.headings.challenge ?? "The problem"}</h2>
              {caseStudy.challenge.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">{narrative?.headings.approach ?? "My approach"}</h2>
              {caseStudy.approach.map(item => {
                const paragraph = typeof item === "string" ? item : item.description;
                return <p key={paragraph}>{paragraph}</p>;
              })}
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">{narrative?.headings.solution ?? "What changed"}</h2>
              {caseStudy.solution.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>

            {related.length > 0 && (
              <p className="text-base">Related expertise: {related.map((service, index) => (
                <span key={service.slug}>{index > 0 && " · "}<Link href={`/services/${service.slug}`} className={textLink}>{service.title}</Link></span>
              ))}.</p>
            )}

            <nav aria-label="Other case studies" className="space-y-3 border-t border-border pt-6 text-base">
              {previous && <p>Previous: <Link href={`/case-studies/${previous.slug}`} className={textLink}>{previous.title}</Link></p>}
              {next && <p>Next: <Link href={`/case-studies/${next.slug}`} className={textLink}>{next.title}</Link></p>}
            </nav>

            <p className="border-t border-border pt-6 text-base">I&apos;m not taking on client projects at the moment, but questions and conversations about HubSpot are welcome. <Link href="/contact" className={textLink}>Get in touch</Link>.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
