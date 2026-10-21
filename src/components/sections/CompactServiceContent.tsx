import Link from "next/link";
import Container from "@/components/ui/Container";
import type { Service } from "@/content/services";

const textLink = "font-semibold text-text underline underline-offset-4 hover:text-accent-text";

export default function CompactServiceContent({
  service,
  details,
}: {
  service: Service;
  details: Service["compact"];
}) {
  return (
    <>
      <header className="relative overflow-hidden border-b border-border-subtle py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <div className="max-w-3xl">
            <Link href="/services" className={`text-sm ${textLink}`}><span aria-hidden="true">← </span>All services</Link>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">{service.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary">{service.shortDescription}</p>
            {service.relatedCaseStudy && (
              <p className="mt-5 leading-relaxed text-text-secondary">
                {details.proofContext}{" "}
                <Link href={`/case-studies/${service.relatedCaseStudy}`} className={textLink}>{details.proofLabel}</Link>.
              </p>
            )}
          </div>
        </Container>
      </header>

      <section className="py-12 lg:py-16">
        <Container size="narrow">
          <div className="max-w-3xl space-y-9 text-lg leading-relaxed text-text-secondary">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">{details.headings.scope}</h2>
              <p>{details.scopeIntro}</p>
              <ul className="list-disc space-y-3 pl-5 marker:text-accent-text">
                {service.deliverables.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">{details.headings.approach}</h2>
              {details.approach.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">{details.headings.boundaries}</h2>
              {details.boundaries.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {service.references && (
                <ul className="space-y-2 text-sm">
                  {service.references.map(reference => (
                    <li key={reference.href}><a href={reference.href} className={textLink}>{reference.label}</a></li>
                  ))}
                </ul>
              )}
              <Link href="/about" className={`inline-block text-base ${textLink}`}>More about my approach</Link>
            </div>

            <p className="border-t border-border pt-6 text-base">I&apos;m not taking on client projects at the moment, but questions and conversations about HubSpot are welcome. <Link href="/contact" className={textLink}>Get in touch</Link>.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
