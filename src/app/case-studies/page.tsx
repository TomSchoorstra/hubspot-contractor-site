import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { caseStudies } from "@/content/caseStudies";

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
const textLink = "font-semibold text-text underline underline-offset-4 hover:text-accent-text";

export default function CaseStudies() {
  return (
    <main>
      <header className="relative overflow-hidden border-b border-border-subtle py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">The work behind the expertise</h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary">How I approach CRM architecture, data quality, integrations and record interfaces, with the decisions and limits that matter in practice.</p>
          </div>
        </Container>
      </header>

      <section className="py-12 lg:py-16">
        <Container size="narrow">
          <div className="max-w-3xl">
            <ul className="divide-y divide-border">
              {caseStudies.map(study => (
                <li key={study.slug} className="py-6 first:pt-0">
                  <h2 className="font-display text-2xl font-semibold text-text"><Link href={`/case-studies/${study.slug}`} className="underline underline-offset-4 hover:text-accent-text">{study.title}</Link></h2>
                  <p className="mt-3 text-lg leading-relaxed text-text-secondary">{study.summary}</p>
                  {study.statusNote && <p className="mt-3 text-sm leading-relaxed text-text-secondary">{study.statusNote}</p>}
                </li>
              ))}
            </ul>
            <p className="border-t border-border pt-6 text-base leading-relaxed text-text-secondary">Questions about the work? <Link href="/contact" className={textLink}>Get in touch</Link>.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
