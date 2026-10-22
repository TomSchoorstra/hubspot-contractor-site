import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SoftContentCard from "@/components/ui/SoftContentCard";
import { services, servicesHeroIntro } from "@/content/services";

const servicesDescription = "Explore my HubSpot work in automation, consultancy, integrations, custom objects, pipeline reviews and app cards, with practical examples and scope.";
const textLink = "font-semibold text-text underline underline-offset-4 hover:text-accent-text";

export const metadata: Metadata = {
  title: "HubSpot expertise | Tom Schoorstra",
  description: servicesDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "HubSpot expertise | Tom Schoorstra",
    description: servicesDescription,
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "HubSpot expertise | Tom Schoorstra",
    description: servicesDescription,
  },
};

export default function Services() {
  return (
    <main>
      <header className="relative overflow-hidden py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">HubSpot expertise</h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary">{servicesHeroIntro}</p>
            <p className="mt-5 leading-relaxed text-text-secondary">For the work behind these areas, <Link href="/case-studies" className={textLink}>explore the case studies</Link>.</p>
          </div>
        </Container>
      </header>

      <section className="pb-12 lg:pb-16">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2" data-content-cards>
            {services.map(service => (
              <li key={service.slug}>
                <SoftContentCard href={`/services/${service.slug}`} title={service.title} description={service.indexDescription} icon={service.slug} />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base leading-relaxed text-text-secondary">Questions or ideas about HubSpot? <Link href="/contact" className={textLink}>Get in touch</Link>.</p>
        </Container>
      </section>
    </main>
  );
}
