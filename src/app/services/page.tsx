import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { services, servicesHeroIntro } from "@/content/services";

export default function Services() {
  return (
    <main>
      <PageHeader
        title="Services"
        subtitle={servicesHeroIntro}
        primaryCta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "See case studies", href: "/case-studies" }}
      />

      <section className="py-16 lg:py-20">
        <Container>
          {/* First row: 3 cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.slice(0, 3).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block"
              >
                <Card interactive className="h-full">
                  <h3 className="text-xl font-semibold text-text transition-colors group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {service.shortDescription}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
          {/* Second row: 2 cards, centered */}
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:justify-center lg:mt-8 lg:gap-8">
            {services.slice(3, 5).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <Card interactive className="h-full">
                  <h3 className="text-xl font-semibold text-text transition-colors group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {service.shortDescription}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
