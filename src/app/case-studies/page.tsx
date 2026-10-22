import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SoftContentCard from "@/components/ui/SoftContentCard";
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
const caseIcons: Record<string, string> = {
  "customer-lifecycle": "custom-objects",
  "crm-data-quality": "consultancy",
  "finance-automation": "integrations",
  "renewal-status-card": "custom-app-cards",
  "pipeline-consolidation": "pipeline-optimization",
};

export default function CaseStudies() {
  return (
    <main>
      <header className="relative overflow-hidden py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">The work behind the expertise</h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary">How I approach CRM architecture, data quality, integrations and record interfaces, with the decisions and limits that matter in practice.</p>
          </div>
        </Container>
      </header>

      <section className="pb-12 lg:pb-16">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2" data-content-cards>
            {caseStudies.map(study => (
              <li key={study.slug}>
                <SoftContentCard href={`/case-studies/${study.slug}`} title={study.title} description={study.summary} icon={caseIcons[study.slug]} detail={study.statusNote} />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base leading-relaxed text-text-secondary">Questions about the work? <Link href="/contact" className={textLink}>Get in touch</Link>.</p>
        </Container>
      </section>
    </main>
  );
}
