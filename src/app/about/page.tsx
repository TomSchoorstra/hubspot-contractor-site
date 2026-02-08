import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me — Tom Schoorstra",
  description:
    "Independent HubSpot specialist helping SMBs and scale-ups build automation, RevOps, and scalable growth systems.",
};

export default function About() {
  return (
    <main>
      {/* Hero — confident personal intro, not a generic page header */}
      <section className="gradient-mesh pt-20 pb-8 lg:pt-32 lg:pb-12">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            About Me
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Tom Schoorstra
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-text-secondary lg:text-2xl">
            Independent HubSpot specialist helping SMBs and scale-ups build
            systems that actually work.
          </p>
        </Container>
      </section>

      {/* Editorial split — sticky photo + scrolling narrative */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Photo column — sticky on desktop */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <Image
                src="/about-photo.jpeg"
                alt="Tom Schoorstra"
                width={560}
                height={746}
                className="h-auto w-full rounded-[var(--radius-lg)] object-cover"
                priority
              />
              <div className="mt-4 h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
            </div>

            {/* Narrative content — scrolls alongside photo */}
            <div className="space-y-14 lg:space-y-16">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-text lg:text-3xl">
                  Background
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  I&apos;m Tom — an independent HubSpot contractor based in the
                  Netherlands, focused on automation, RevOps, and scalable
                  growth systems.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  I work with growing teams that know their HubSpot instance
                  could do more, but don&apos;t have the in-house expertise to
                  unlock it. Whether it&apos;s building workflows that eliminate
                  hours of manual work, designing custom data structures, or
                  connecting HubSpot to the rest of your stack — I help
                  companies turn their CRM into a system that actually drives
                  results.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  No agency overhead. No unnecessary complexity. Just focused
                  execution on the things that move the needle.
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="text-2xl font-bold text-text lg:text-3xl">
                  How I work
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  Every engagement starts with understanding what your team
                  actually needs — not what looks impressive on a slide deck.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  I work pragmatically: solutions that fit your team&apos;s
                  current maturity and scale when you&apos;re ready. I work
                  iteratively: ship, learn, refine. And I always tie the work
                  back to measurable outcomes — time saved, pipeline visibility,
                  conversion rates, or revenue impact.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  If we can&apos;t measure it, we rethink the approach.
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="text-2xl font-bold text-text lg:text-3xl">
                  Who I work with
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  Most of my clients are SMBs and scale-ups running HubSpot
                  Marketing, Sales, or Operations Hub. They&apos;re typically
                  led by RevOps, marketing, or sales leaders who need hands-on
                  execution — not just another strategy deck.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  Common situations I step into: messy pipelines that nobody
                  trusts, manual processes eating up hours every week,
                  disconnected tools that don&apos;t talk to each other, or a
                  HubSpot portal that was set up once and never properly
                  configured.
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="text-2xl font-bold text-text lg:text-3xl">
                  Areas of expertise
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      HubSpot automation
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-text-secondary">
                      Workflows that eliminate repetitive tasks — from lead
                      routing and follow-ups to deal stage automation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      HubSpot consultancy
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-text-secondary">
                      Strategic advice on portal setup, data architecture, and
                      process design.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      Integrations
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-text-secondary">
                      Connecting HubSpot to Exact, WooCommerce, and the rest of
                      your stack through Zapier and n8n.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      Custom objects
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-text-secondary">
                      Data structures that match your business model — with
                      proper associations and reporting.
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-base font-semibold text-text">
                      Pipeline optimization
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-text-secondary">
                      Cleaning up deal stages, standardizing fields, and
                      building dashboards sales leaders can actually trust.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="text-2xl font-bold text-text lg:text-3xl">
                  Tools & platforms
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] text-text-muted">
                      HubSpot
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Marketing Hub",
                        "Sales Hub",
                        "Operations Hub",
                        "Custom objects",
                        "Workflows",
                        "Data Studio",
                        "HubSpot API",
                      ].map((tool) => (
                        <span
                          key={tool}
                          className="rounded-[var(--radius-md)] border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] text-text-muted">
                      Automation
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Zapier", "n8n"].map((tool) => (
                        <span
                          key={tool}
                          className="rounded-[var(--radius-md)] border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] text-text-muted">
                      Sales & communication
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Gong", "Chili Piper", "Aircall", "Typeform"].map(
                        (tool) => (
                          <span
                            key={tool}
                            className="rounded-[var(--radius-md)] border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary"
                          >
                            {tool}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] text-text-muted">
                      Productivity & IT
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Google Workspace",
                        "Jira",
                        "Confluence",
                        "1Password",
                        "Trelica",
                      ].map((tool) => (
                        <span
                          key={tool}
                          className="rounded-[var(--radius-md)] border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Inline CTA within the narrative flow */}
              <ScrollReveal>
                <div className="flex flex-wrap gap-4 border-t border-border pt-10">
                  <Button href="/contact" variant="primary">
                    Plan a call
                  </Button>
                  <Button href="/services" variant="secondary">
                    View services
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Want to see if this is a fit?"
        description="I'm always happy to have a no-pressure conversation about your HubSpot setup. Let's figure out if working together makes sense."
        cta={{ label: "Book a call", href: "/contact" }}
        secondaryCta={{ label: "View case studies", href: "/case-studies" }}
      />
    </main>
  );
}
