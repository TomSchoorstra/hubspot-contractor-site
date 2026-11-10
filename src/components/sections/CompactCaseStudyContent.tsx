import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import JourneyTrack from "@/components/ui/JourneyTrack";
import type { CaseStudy } from "@/content/caseStudies";
import { services } from "@/content/services";
import ArchitectureDiagram from "@/components/sections/ArchitectureDiagram";
import { caseLine } from "@/lib/lines";

const stop = "grid gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]";
const stopBody = "space-y-4 text-lg leading-relaxed text-ink-2";

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
    <div data-line={caseLine[caseStudy.slug]}>
      <header className="bg-night text-white">
        <Container className="pt-10 pb-12 lg:pt-14 lg:pb-16">
          <Link href="/case-studies" className="tlink text-sm">← All case studies</Link>
          <p className="mt-8 font-semibold text-on-night-2">{caseStudy.industry} · {caseStudy.companySize}</p>
          <h1 className="t-h1 mt-3 max-w-5xl">{caseStudy.title}</h1>
          <div className="mt-6 max-w-3xl space-y-4 text-xl leading-relaxed text-on-night-2 lg:text-2xl lg:leading-snug">
            {(narrative?.intro ?? [caseStudy.summary]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {caseStudy.statusNote && <p className="mt-6 max-w-3xl border-l-[6px] border-line pl-4 leading-relaxed text-white">{caseStudy.statusNote}</p>}
        </Container>
        {/* The lines of the related expertise areas all pass through this case. */}
        <div aria-hidden="true" className="bundle">
          {caseStudy.relatedServices.map(slug => <i key={slug} data-line={slug} />)}
        </div>
      </header>

      {caseStudy.screenshots && (
        <figure className="bg-paper-2 py-10 lg:py-14">
          <Container>
            <div className="grid items-start justify-items-center gap-5 lg:grid-cols-3 lg:gap-6">
              {caseStudy.screenshots.images.map(screenshot => (
                <Image
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  className="h-auto w-full"
                  style={{ maxWidth: screenshot.width }}
                  unoptimized
                />
              ))}
            </div>
            <figcaption className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-ink-2">{caseStudy.screenshots.caption}</figcaption>
          </Container>
        </figure>
      )}

      <section className="py-14 lg:py-20">
        <Container>
          <div className="journey">
            <JourneyTrack />
            <div className="space-y-14 lg:space-y-20">
              <div className={stop}>
                <h2 className="t-h2 ring-stop">{narrative?.headings.challenge ?? "The problem"}</h2>
                <div className={stopBody}>
                  {caseStudy.challenge.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              <div className={stop}>
                <h2 className="t-h2 ring-stop">{narrative?.headings.approach ?? "My approach"}</h2>
                <div className={stopBody}>
                  {caseStudy.approach.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              <div className={stop}>
                <h2 className="t-h2 ring-stop">{narrative?.headings.solution ?? "What changed"}</h2>
                <div className={stopBody}>
                  {caseStudy.solution.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {caseStudy.architecture && <ArchitectureDiagram architecture={caseStudy.architecture} compact />}
                </div>
              </div>

              {caseStudy.operatingModel && (
                <div className={stop}>
                  <h2 className="t-h2 ring-stop">{narrative.headings.operatingModel ?? "Checks and limits"}</h2>
                  <div className={stopBody}>
                    <p>{caseStudy.operatingModel.summary}</p>
                    {caseStudy.operatingModel.controls.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              )}

              {related.length > 0 && (
                <p className="ring-stop text-lg leading-loose text-ink-2" style={{ "--ring-top": "0.3em" } as React.CSSProperties}>Related expertise: {related.map((service, index) => (
                  <span key={service.slug} data-line={service.slug}>{index > 0 && " · "}<Link href={`/services/${service.slug}`} className="tlink text-ink" style={{ "--ul": "var(--line)" } as React.CSSProperties}>{service.title}</Link></span>
                ))}.</p>
              )}
            </div>
          </div>

          <nav aria-label="Other case studies" className="mt-14 grid gap-x-10 border-t-2 border-ink md:grid-cols-2 lg:mt-20">
            {previous && <p data-line={caseLine[previous.slug]} className="border-b border-rule py-6 text-ink-2 md:border-b-0">Previous: <Link href={`/case-studies/${previous.slug}`} className="t-h4 tlink mt-1 block text-ink" style={{ "--ul": "var(--line)" } as React.CSSProperties}>{previous.title}</Link></p>}
            {next && <p data-line={caseLine[next.slug]} className={`py-6 text-ink-2 ${previous ? "" : "md:col-start-2"}`}>Next: <Link href={`/case-studies/${next.slug}`} className="t-h4 tlink mt-1 block text-ink" style={{ "--ul": "var(--line)" } as React.CSSProperties}>{next.title}</Link></p>}
          </nav>

          <p className="border-t border-rule pt-6 text-lg text-ink-2">Want to compare notes on this project? <Link href="/contact" className="tlink text-ink">Get in touch</Link>.</p>
        </Container>
      </section>
    </div>
  );
}
