import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import LineBullet from "@/components/ui/LineBullet";
import RowArrow from "@/components/ui/RowArrow";
import { services, servicesHeroIntro } from "@/content/services";

const servicesDescription = "Explore my HubSpot work in automation, consultancy, integrations, custom objects, pipeline reviews and app cards, with practical examples and scope.";

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
    <main className="overflow-x-clip">
      <header className="pt-12 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 className="t-h1 lg:col-span-6">HubSpot expertise</h1>
            <div className="max-w-2xl lg:col-span-6">
              <p className="text-xl leading-relaxed text-ink-2">{servicesHeroIntro}</p>
              <p className="mt-4 leading-relaxed text-ink-2">For the work behind these areas, <Link href="/case-studies" className="tlink text-ink">explore the case studies</Link>.</p>
            </div>
          </div>
        </Container>
      </header>

      <section className="pb-16 lg:pb-24">
        <Container>
          <ul className="border-t-2 border-ink" data-content-cards>
            {services.map(service => (
              <li key={service.slug} data-line={service.slug} className="border-b border-rule">
                <Link href={`/services/${service.slug}`} className="group grid items-center gap-x-8 gap-y-4 py-7 md:grid-cols-[3.75rem_minmax(0,5fr)_minmax(0,6fr)_3rem] lg:py-9">
                  <LineBullet icon={service.slug} tail size="lg" />
                  <h2 className="t-h3 row-title">{service.title}</h2>
                  <p className="text-lg leading-relaxed text-ink-2">{service.indexDescription}</p>
                  <RowArrow className="hidden md:grid" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-lg leading-relaxed text-ink-2">Questions or ideas about HubSpot? <Link href="/contact" className="tlink text-ink">Get in touch</Link>.</p>
        </Container>
      </section>
    </main>
  );
}
