import Link from "next/link";
import Container from "@/components/ui/Container";
import ContentIcon from "@/components/ui/ContentIcon";
import JourneyTrack from "@/components/ui/JourneyTrack";
import type { Service } from "@/content/services";

const stop = "grid gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]";
const stopBody = "space-y-4 text-lg leading-relaxed text-ink-2";

// "Label: explanation" items get their label set in bold. The text itself is unchanged.
function Deliverable({ text }: { text: string }) {
  const split = text.indexOf(": ");
  if (split === -1) return <>{text}</>;
  return <><strong className="font-bold text-ink">{text.slice(0, split + 1)}</strong>{text.slice(split + 1)}</>;
}

export default function CompactServiceContent({
  service,
  details,
}: {
  service: Service;
  details: Service["compact"];
}) {
  return (
    <div data-line={service.slug}>
      {/* The header is flooded in the colour of this area's line. */}
      <header className="on-flood relative overflow-hidden bg-line text-ink">
        <span aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-20 hidden h-[30rem] w-[30rem] opacity-25 lg:block">
          <ContentIcon name={service.slug} />
        </span>
        <Container className="relative pt-10 pb-14 lg:pt-14 lg:pb-20">
          <Link href="/services" className="tlink text-sm"><span aria-hidden="true">← </span>All expertise</Link>
          <h1 className="t-h1 mt-8 max-w-4xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-xl font-medium leading-snug lg:text-2xl">{service.shortDescription}</p>
          {service.relatedCaseStudy && (
            <p className="mt-8 max-w-2xl border-l-[6px] border-ink pl-5 text-lg leading-relaxed">
              {details.proofContext}{" "}
              <Link href={`/case-studies/${service.relatedCaseStudy}`} className="tlink">{details.proofLabel}</Link>.
            </p>
          )}
        </Container>
      </header>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="journey">
            <JourneyTrack />
            <div className="space-y-14 lg:space-y-20">
              <div className={stop}>
                <h2 className="t-h2 ring-stop">{details.headings.scope}</h2>
                <div className={stopBody}>
                  <p>{details.scopeIntro}</p>
                  <ul className="border-t-2 border-ink">
                    {service.deliverables.map(item => <li key={item} className="border-b border-rule py-4"><Deliverable text={item} /></li>)}
                  </ul>
                </div>
              </div>

              <div className={stop}>
                <h2 className="t-h2 ring-stop">{details.headings.approach}</h2>
                <div className={stopBody}>
                  {details.approach.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>

              <div className={stop}>
                <h2 className="t-h2 ring-stop">{details.headings.boundaries}</h2>
                <div className={stopBody}>
                  {details.boundaries.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {service.references && (
                    <ul className="space-y-2 text-base">
                      {service.references.map(reference => (
                        <li key={reference.href}><a href={reference.href} className="tlink text-ink">{reference.label}</a></li>
                      ))}
                    </ul>
                  )}
                  <Link href="/about" className="tlink inline-block text-base text-ink">More about my approach</Link>
                </div>
              </div>

              <p className="ring-stop text-xl leading-relaxed text-ink-2" style={{ "--ring-top": "0.15em" } as React.CSSProperties}>Questions about this area of HubSpot? <Link href="/contact" className="tlink text-ink">Get in touch</Link>.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
