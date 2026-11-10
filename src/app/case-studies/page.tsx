import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ContentIcon from "@/components/ui/ContentIcon";
import RowArrow from "@/components/ui/RowArrow";
import { caseStudies } from "@/content/caseStudies";
import { caseLine } from "@/lib/lines";

export const metadata: Metadata = {
  title: "Case Studies — Tom Schoorstra",
  description:
    "Explore my HubSpot and RevOps work in CRM architecture, data quality monitoring, finance automation and custom record interfaces.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "Case Studies — Tom Schoorstra",
    description:
      "Explore CRM architecture, data quality monitoring, finance automation and custom record interfaces through practical projects.",
    url: "/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "Case Studies — Tom Schoorstra",
    description:
      "Explore CRM architecture, data quality monitoring, finance automation and custom record interfaces through practical projects.",
  },
};

export default function CaseStudies() {
  return (
    <main className="overflow-x-clip">
      <header className="pt-12 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 className="t-h1 lg:col-span-7">The work behind the expertise</h1>
            <p className="max-w-2xl text-xl leading-relaxed text-ink-2 lg:col-span-5">How I approach CRM architecture, data quality, integrations and record interfaces, with the decisions and limits that matter in practice.</p>
          </div>
        </Container>
      </header>

      <section className="pb-16 lg:pb-24">
        <Container>
          <ul className="border-t-2 border-ink" data-content-cards>
            {caseStudies.map(study => (
              <li key={study.slug} data-line={caseLine[study.slug]} className="border-b border-rule">
                <Link href={`/case-studies/${study.slug}`} className="group grid gap-x-8 gap-y-4 py-8 md:grid-cols-[3.75rem_minmax(0,5fr)_minmax(0,6fr)_3rem] lg:py-10">
                  {/* Each related expertise line runs into the station, so a case that crosses areas reads as an interchange. */}
                  <span aria-hidden="true" className="interchange">
                    <span className="interchange__lines">
                      {study.relatedServices.map(slug => <i key={slug} data-line={slug} />)}
                    </span>
                    <span className="interchange__node"><ContentIcon name={caseLine[study.slug]} /></span>
                  </span>
                  <h2 className="t-h3 row-title md:pt-2.5">{study.title}</h2>
                  <div className="md:pt-3">
                    <p className="text-lg leading-relaxed text-ink-2">{study.summary}</p>
                    {study.statusNote && <p className="mt-4 border-l-4 border-line pl-3 text-sm leading-relaxed text-ink-2">{study.statusNote}</p>}
                  </div>
                  <RowArrow className="hidden md:mt-1.5 md:grid" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-lg leading-relaxed text-ink-2">Questions about the work? <Link href="/contact" className="tlink text-ink">Get in touch</Link>.</p>
        </Container>
      </section>
    </main>
  );
}
