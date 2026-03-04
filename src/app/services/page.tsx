import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import { services } from "@/content/services";

export default function Services() {
  return (
    <main>
      <PageHeader
        eyebrow="Services"
        title="Building HubSpot that works for your team"
        subtitle={`Five focused services across automation, strategy, integrations, and data architecture — no agency overhead, just hands-on execution.`}
        primaryCta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "See case studies", href: "/case-studies" }}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="space-y-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.07}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block"
                >
                  <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.09)] lg:flex-row lg:items-center lg:gap-10 lg:p-10">
                    {/* Number */}
                    <div className="flex-shrink-0">
                      <span className="font-display text-5xl font-extrabold text-border transition-colors group-hover:text-accent/30 lg:text-6xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-2xl font-bold text-text transition-colors group-hover:text-accent lg:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-text-secondary lg:text-lg">
                        {service.shortDescription}
                      </p>
                      {/* Key outcomes preview */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.outcomes.slice(0, 2).map((outcome, oi) => (
                          <span
                            key={oi}
                            className="inline-flex items-center gap-1.5 text-sm text-text-muted"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                            {outcome.split("—")[0].trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl border border-border bg-surface-2 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white text-text-muted">
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 20 20">
                        <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Not sure which service fits?"
        description="Tell me what you're dealing with and I'll let you know how I can help — no strings attached."
        cta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "See case studies", href: "/case-studies" }}
      />
    </main>
  );
}
