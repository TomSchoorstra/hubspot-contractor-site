import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
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
      <header className="relative overflow-hidden border-b border-border-subtle py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">HubSpot expertise</h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary">{servicesHeroIntro}</p>
            <p className="mt-5 leading-relaxed text-text-secondary">For the work behind these areas, <Link href="/case-studies" className={textLink}>explore the case studies</Link>.</p>
          </div>
        </Container>
      </header>

      <section className="py-12 lg:py-16">
        <Container size="narrow">
          <div className="max-w-3xl">
            <ul className="divide-y divide-border">
              {services.map(service => (
                <li key={service.slug} className="py-6 first:pt-0">
                  <h2 className="font-display text-2xl font-semibold text-text"><Link href={`/services/${service.slug}`} className="underline underline-offset-4 hover:text-accent-text">{service.title}<span aria-hidden="true"> →</span></Link></h2>
                  <p className="mt-3 text-lg leading-relaxed text-text-secondary">{service.indexDescription}</p>
                </li>
              ))}
            </ul>
            <p className="border-t border-border pt-6 text-base leading-relaxed text-text-secondary">Questions or ideas about HubSpot? <Link href="/contact" className={textLink}>Get in touch</Link>.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
