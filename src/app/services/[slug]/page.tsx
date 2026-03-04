import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Accordion from "@/components/ui/Accordion";
import { services } from "@/content/services";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service not found — Tom Schoorstra",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} — Tom Schoorstra`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const serviceIndex = services.findIndex((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border-subtle py-20 lg:py-28">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
        <Container>
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">
            {/* Left */}
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Service {String(serviceIndex + 1).padStart(2, "0")}
              </p>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-text lg:text-5xl xl:text-6xl">
                {service.title}
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-text-secondary">
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow-md hover:-translate-y-px group"
                >
                  Plan a call
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 14 14">
                    <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-border bg-surface px-6 py-3 text-base font-semibold text-text transition-all hover:border-accent hover:shadow-md hover:-translate-y-px"
                >
                  All services
                </Link>
              </div>
            </div>

            {/* Right: Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface-2 p-5">
                <div className="font-display text-3xl font-bold text-accent">
                  {service.deliverables.length}
                </div>
                <div className="mt-1 text-sm font-medium text-text-secondary">Deliverables</div>
              </div>
              <div className="rounded-2xl border border-border bg-surface-2 p-5">
                <div className="font-display text-3xl font-bold text-accent-2">
                  {service.process.length}
                </div>
                <div className="mt-1 text-sm font-medium text-text-secondary">Process steps</div>
              </div>
              <div className="col-span-2 rounded-2xl border border-border bg-surface-2 p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Outcomes</div>
                <div className="font-display text-3xl font-bold text-text">
                  {service.outcomes.length}
                </div>
                <div className="mt-1 text-sm font-medium text-text-secondary">Clear, measurable results</div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="space-y-20 lg:space-y-28">

            {/* Outcomes */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  What you get
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-10 lg:text-4xl">
                  Outcomes
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
                    >
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 14 14">
                          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed text-text-secondary">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Deliverables */}
            <ScrollReveal>
              <div className="rounded-3xl bg-surface-2 border border-border p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-2 mb-3">
                  What&apos;s included
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-8 lg:text-4xl">
                  Deliverables
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-accent-2/15">
                        <svg className="h-3 w-3 text-accent-2" fill="none" viewBox="0 0 12 12">
                          <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed text-text-secondary">
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Process */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  How it works
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-10 lg:text-4xl">
                  The process
                </h2>
                <ProcessTimeline steps={service.process} />
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  Common questions
                </p>
                <h2 className="font-display text-3xl font-bold text-text mb-10 lg:text-4xl">
                  FAQ
                </h2>
                <Accordion items={service.faq} />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to get started?"
        description="Tell me what you're working on and I'll let you know how I can help — no strings attached."
        cta={{ label: "Book a call", href: "/contact" }}
        secondaryCta={{ label: "See case studies", href: "/case-studies" }}
      />
    </main>
  );
}
