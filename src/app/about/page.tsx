import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import { expertiseAreas } from "@/content/expertise";

export const metadata: Metadata = {
  title: "About Me — Tom Schoorstra",
  description:
    "HubSpot & RevOps specialist based in the Netherlands. Explore my work in CRM architecture, integrations, data quality and custom HubSpot interfaces at AIHR.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "Explore my work in CRM architecture, integrations, data quality and custom HubSpot interfaces at AIHR.",
    url: "/about",
  },
};

const toolGroups = [
  {
    label: "HubSpot",
    tools: ["HubSpot CRM", "Custom objects", "Workflows", "Data Studio", "HubSpot API"],
  },
  {
    label: "Automation",
    tools: ["Zapier", "JavaScript", "WooCommerce", "Exact"],
  },
  {
    label: "AI-assisted work",
    tools: ["Codex", "Claude Code"],
  },
  {
    label: "Sales & communication",
    tools: ["Gong", "Chili Piper", "Aircall", "Typeform"],
  },
  {
    label: "Productivity & IT",
    tools: ["Google Workspace", "Jira", "Confluence", "1Password", "Trelica"],
  },
];

const certifications = [
  { name: "HubSpot Sales Hub Software", issuer: "HubSpot Academy", year: "2024", active: false },
  { name: "Form Concierge Admin Certificate", issuer: "Chili Piper", year: "2022", active: false },
  { name: "Inbound Marketing", issuer: "HubSpot Academy", year: "2022", active: false },
  { name: "HubSpot Sales Software", issuer: "HubSpot Academy", year: "2022", active: false },
  { name: "2020 HubSpot Champion User", issuer: "HubSpot Academy", year: "2020", active: false },
  { name: "Inbound Marketing Certified", issuer: "HubSpot Academy", year: "2020", active: false },
  { name: "Inbound Certified", issuer: "HubSpot", year: "2017", active: false },
];

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle py-20 lg:py-28">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
        <Container>
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
            <div className="space-y-6">
              <Badge variant="teal">HubSpot &amp; RevOps specialist</Badge>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl xl:text-7xl">
                Tom<br />
                <span className="text-gradient-orange">Schoorstra.</span>
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-text-secondary">
                I help B2B teams make complex HubSpot setups easier to work with, connecting customer records, automating handovers, and building checks that keep operational data reliable.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button href="/case-studies" variant="primary" size="lg" showArrow>
                  See the work
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  View services
                </Button>
              </div>
            </div>

            {/* Photo with geometric frame */}
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative">
                {/* Decorative border frame */}
                <div className="absolute -top-3 -left-3 h-full w-full rounded-2xl border-2 border-accent/30" aria-hidden="true" />
                <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-accent-2/30" aria-hidden="true" />
                <Image
                  src="/about-photo.jpeg"
                  alt="Tom Schoorstra, HubSpot and RevOps specialist based in the Netherlands"
                  width={480}
                  height={640}
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="relative z-10 h-auto w-full rounded-2xl object-cover shadow-lg"
                  priority
                />
                {/* Orange accent bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 rounded-b-2xl h-1 bg-accent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Practice context */}
      <div className="border-b border-border bg-surface-2 py-8">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">In practice at AIHR</p>
              <p className="mt-2 text-lg font-semibold text-text">System Operations Manager Senior, within Revenue Operations</p>
            </div>
            <Link href="/case-studies/customer-lifecycle" className="font-semibold text-text underline underline-offset-4 hover:text-accent">Explore the account-based CRM project</Link>
          </div>
        </Container>
      </div>

      {/* Narrative + photo sticky */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Photo sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Image
                src="/about-photo.jpeg"
                alt="Tom Schoorstra"
                width={560}
                height={746}
                sizes="(max-width: 1024px) 0px, 560px"
                loading="lazy"
                className="hidden lg:block h-auto w-full rounded-2xl object-cover shadow-md"
              />
              {/* Quick facts card */}
              <div className="mt-6 hidden lg:block rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                  Based in
                </h3>
                <p className="text-base font-semibold text-text">The Netherlands 🇳🇱</p>
                <div className="mt-4 pt-4 border-t border-border-subtle">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                    Available for
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm text-text-secondary">Project-based work</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent-2 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">Ongoing retainers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling narrative */}
            <div className="space-y-14 lg:space-y-16">
              <ScrollReveal>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Background</p>
                  <h2 className="font-display text-2xl font-bold text-text lg:text-3xl mb-4">
                    Who I am
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-text-secondary">
                    <p>
                      I&apos;m Tom, a HubSpot &amp; RevOps specialist based in the Netherlands. At AIHR, I work as System Operations Manager Senior within Revenue Operations, connecting CRM processes with the systems around them.
                    </p>
                    <p>
                      I led the account-based CRM project: defining the customer model, connecting historical records and building workflows that link licenses, deals and professional services to the right Account. I also developed recurring reviews to investigate missing links and potential duplicates.
                    </p>
                    <p>
                      My work also includes integrations between HubSpot, WooCommerce and Exact, data quality dashboards, and custom interfaces that show renewal information directly on a deal.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Approach</p>
                  <h2 className="font-display text-2xl font-bold text-text lg:text-3xl mb-4">
                    How I work
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-text-secondary">
                    <p>
                      I start by following the process: where the data comes from, who owns each decision and what needs to happen in the next system. That helps distinguish a record problem from a gap in the workflow.
                    </p>
                    <p>
                      From there, I design the data model or automation, test the paths and exceptions, and document how the team can maintain it. Checks after launch help catch new issues as records and processes change.
                    </p>
                    <p>
                      I use AI to support investigation, documentation and recurring quality reviews. In the weekly account review, Codex and Claude Code help assess candidate matches and prepare recommendations. I review the findings before making changes; the review itself does not write to HubSpot.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Where I can help</p>
                  <h2 className="font-display text-2xl font-bold text-text lg:text-3xl mb-4">
                    When your CRM needs a clearer structure
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-text-secondary">
                    <p>
                      My focus is B2B teams with an existing HubSpot setup, where customer records and operational processes have become difficult to follow. RevOps and CRM owners often need a complete customer view, dependable handovers and a way to investigate exceptions.
                    </p>
                    <p>
                      That could mean connecting several company records to one customer relationship, finding why two systems disagree, or showing associated data directly on the record a rep is reviewing.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Skills</p>
                  <h2 className="font-display text-2xl font-bold text-text lg:text-3xl mb-6">
                    Areas of expertise
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {expertiseAreas.map((area) => (
                      <div
                        key={area.title}
                        className="rounded-2xl border border-border bg-surface p-5"
                      >
                        <h3 className="font-semibold text-text">{area.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {area.description}
                        </p>
                        <Link href={area.proofHref} className="mt-4 inline-block text-sm font-semibold text-text underline underline-offset-4 hover:text-accent">{area.proofLabel}</Link>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Certifications</p>
                  <h2 className="font-display text-2xl font-bold text-text lg:text-3xl mb-6">
                    Learning &amp; past certifications
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-text-secondary">These are past certifications and recognition. They are not presented as current credentials.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className={`flex items-start gap-4 rounded-2xl border bg-surface p-4 ${
                          cert.active
                            ? "border-accent/30 bg-accent-light"
                            : "border-border"
                        }`}
                      >
                        <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                          cert.active ? "bg-accent text-white" : "bg-surface-2 text-text-muted"
                        }`}>
                          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-text">{cert.name}</p>
                            {cert.active && (
                              <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-text-muted">{cert.issuer} · {cert.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Stack</p>
                  <h2 className="font-display text-2xl font-bold text-text lg:text-3xl mb-6">
                    Tools & platforms
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {toolGroups.map((group) => (
                      <div key={group.label}>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                          {group.label}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {group.tools.map((tool) => (
                            <Badge key={tool} variant="neutral">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div className="flex flex-wrap gap-4 border-t border-border pt-10">
                  <Button href="/contact" variant="primary" showArrow>
                    Let&apos;s talk
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
        cta={{ label: "Let's talk", href: "/contact" }}
        secondaryCta={{ label: "View case studies", href: "/case-studies" }}
      />
    </main>
  );
}
