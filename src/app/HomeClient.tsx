"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import { services } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";
import { expertiseAreas } from "@/content/expertise";

const featuredCases = ["customer-lifecycle", "crm-data-quality"].flatMap((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  return study ? [study] : [];
});

export default function HomeClient() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-accent/8 blur-[100px] pointer-events-none" />
        <Container className="relative z-10 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
            <div className="space-y-6">
              <Badge variant="teal">HubSpot &amp; RevOps specialist</Badge>
              <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">
                A clearer customer picture.<br />
                <span className="text-gradient-orange">Processes that connect.</span>
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-text-secondary">I help B2B teams make complex HubSpot setups easier to work with, connecting customer records, automating handovers, and building checks that keep operational data reliable.</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/case-studies" variant="primary" size="lg" showArrow analyticsEvent="cta_click" analyticsParams={{ cta_label: "See the work", cta_location: "home_hero", destination: "/case-studies" }}>See the work</Button>
                <Button href="/contact" variant="secondary" size="lg" analyticsLocation="home_hero">Get in touch</Button>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">Based in the Netherlands. Working in Revenue Operations at AIHR. <Link href="/about" className="font-semibold text-text underline underline-offset-4">More about me</Link></p>
            </div>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute -top-3 -left-3 h-full w-full rounded-2xl border-2 border-accent/30" aria-hidden="true" />
              <Image src="/about-photo.jpeg" alt="Tom Schoorstra, HubSpot and RevOps specialist" width={480} height={640} sizes="(max-width: 1024px) 384px, 480px" priority className="relative h-auto w-full rounded-2xl object-cover shadow-lg" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-secondary">Selected work</p>
              <h2 className="font-display text-3xl font-bold text-text lg:text-4xl">The decisions behind the systems</h2>
            </div>
            <Link href="/case-studies" className="font-semibold text-text underline underline-offset-4">All case studies</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredCases.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group block rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">{study.narrative?.eyebrow ?? study.industry}</p>
                <h3 className="mt-4 font-display text-2xl font-bold text-text">{study.title}</h3>
                <p className="mt-4 leading-relaxed text-text-secondary">{study.summary}</p>
                {study.statusNote && <p className="mt-4 text-sm leading-relaxed text-text-secondary">{study.statusNote}</p>}
                <p className="mt-6 font-semibold text-text underline underline-offset-4">Read case study</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border-subtle bg-surface-2 py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-secondary">Areas of expertise</p>
            <h2 className="font-display text-3xl font-bold text-text lg:text-4xl">From the customer model to daily operations</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {expertiseAreas.map((area) => (
                <div key={area.title} className="rounded-2xl border border-border bg-surface p-7">
                  <h3 className="font-display text-xl font-bold text-text">{area.title}</h3>
                  <p className="mt-3 leading-relaxed text-text-secondary">{area.description}</p>
                  <Link href={area.proofHref} className="mt-5 inline-block text-sm font-semibold text-text underline underline-offset-4">{area.proofLabel}</Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-secondary">How I work</p>
            <h2 className="font-display text-3xl font-bold text-text lg:text-4xl">Understand, build, then keep checking</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {[
                { title: "Follow the process", description: "Map the records, sources and handovers. Agree on what each relationship represents and who owns the decisions." },
                { title: "Build the connections", description: "Implement the model, workflows or record interface. Test the expected paths and exceptions, then document how they work." },
                { title: "Review what changes", description: "Use recurring checks to surface missing links and inconsistent data. Investigate the source before deciding on a correction." },
              ].map((step) => (
                <div key={step.title} className="rounded-2xl border border-border bg-surface-2 p-7">
                  <h3 className="font-display text-xl font-bold text-text">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl leading-relaxed text-text-secondary">AI supports investigation, documentation and recurring reviews. In my weekly account review, it helps assess possible matches and prepare recommendations. I start the review and assess the findings; it does not change HubSpot records automatically.</p>
            <Link href="/case-studies/customer-lifecycle" className="mt-5 inline-block font-semibold text-text underline underline-offset-4">Explore the account review in practice</Link>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-border-subtle bg-surface-2 py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-secondary">Services</p>
            <h2 className="font-display text-3xl font-bold text-text lg:text-4xl">Ways I can help</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">{services.length} services covering the practical work behind a connected HubSpot setup.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
                  <h3 className="font-semibold text-text">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{service.shortDescription}</p>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="rounded-3xl border border-accent/20 bg-accent-light p-7 sm:p-10 lg:p-12">
            <h2 className="font-display text-3xl font-bold text-text lg:text-4xl">Want to talk through your HubSpot setup?</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">Tell me how your customer records and processes are connected, and where things get difficult to follow.</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="/contact" size="lg" showArrow analyticsLocation="home_bottom">Start the conversation</Button>
              <Button href="/about" variant="secondary" size="lg">More about me</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
