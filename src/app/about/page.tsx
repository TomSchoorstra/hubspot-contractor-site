import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About Me — Tom Schoorstra",
  description:
    "Independent HubSpot specialist helping SMBs and scale-ups build automation, RevOps, and scalable growth systems.",
};

const credentials = [
  { value: "5+", label: "Years in HubSpot" },
  { value: "20+", label: "Projects delivered" },
  { value: "5", label: "HubSpot Hubs covered" },
];

const expertiseAreas = [
  {
    title: "HubSpot automation",
    description: "Workflows that eliminate repetitive tasks — from lead routing and follow-ups to deal stage automation.",
  },
  {
    title: "HubSpot consultancy",
    description: "Strategic advice on portal setup, data architecture, and process design.",
  },
  {
    title: "Integrations",
    description: "Connecting HubSpot to Exact, WooCommerce, and the rest of your stack through Zapier and n8n.",
  },
  {
    title: "Custom objects",
    description: "Data structures that match your business model — with proper associations and reporting.",
  },
  {
    title: "Pipeline optimization",
    description: "Cleaning up deal stages, standardizing fields, and building dashboards sales leaders can actually trust.",
  },
];

const toolGroups = [
  {
    label: "HubSpot",
    tools: ["Marketing Hub", "Sales Hub", "Operations Hub", "Custom objects", "Workflows", "Data Studio", "HubSpot API"],
  },
  {
    label: "Automation",
    tools: ["Zapier", "n8n"],
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
              <Badge variant="teal">Independent HubSpot Specialist</Badge>
              <h1 className="font-display text-5xl font-extrabold tracking-tight text-text lg:text-6xl xl:text-7xl">
                Tom<br />
                <span className="text-gradient-orange">Schoorstra.</span>
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-text-secondary">
                Independent HubSpot contractor based in the Netherlands, focused on automation, RevOps, and systems that actually drive results.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button href="/contact" variant="primary" size="lg" showArrow>
                  See if we&apos;re a fit
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
                  alt="Tom Schoorstra"
                  width={480}
                  height={640}
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

      {/* Credentials bar */}
      <div className="border-b border-border bg-surface-2 py-8">
        <Container>
          <div className="grid grid-cols-3 gap-6 divide-x divide-border">
            {credentials.map((cred) => (
              <div key={cred.label} className="px-4 text-center sm:text-left first:pl-0">
                <div className="font-display text-3xl font-bold text-accent lg:text-4xl">{cred.value}</div>
                <div className="mt-1 text-sm font-medium text-text-secondary">{cred.label}</div>
              </div>
            ))}
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
                      I&apos;m Tom — an independent HubSpot contractor based in the Netherlands, focused on automation, RevOps, and scalable growth systems.
                    </p>
                    <p>
                      I work with growing teams that know their HubSpot instance could do more, but don&apos;t have the in-house expertise to unlock it. Whether it&apos;s building workflows that eliminate hours of manual work, designing custom data structures, or connecting HubSpot to the rest of your stack — I help companies turn their CRM into a system that actually drives results.
                    </p>
                    <p>
                      No agency overhead. No unnecessary complexity. Just focused execution on the things that move the needle.
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
                      Every engagement starts with understanding what your team actually needs — not what looks impressive on a slide deck.
                    </p>
                    <p>
                      I work pragmatically: solutions that fit your team&apos;s current maturity and scale when you&apos;re ready. I work iteratively: ship, learn, refine. And I always tie the work back to measurable outcomes — time saved, pipeline visibility, conversion rates, or revenue impact.
                    </p>
                    <p>
                      If we can&apos;t measure it, we rethink the approach.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Clients</p>
                  <h2 className="font-display text-2xl font-bold text-text lg:text-3xl mb-4">
                    Who I work with
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-text-secondary">
                    <p>
                      Most of my clients are SMBs and scale-ups running HubSpot Marketing, Sales, or Operations Hub. They&apos;re typically led by RevOps, marketing, or sales leaders who need hands-on execution — not just another strategy deck.
                    </p>
                    <p>
                      Common situations I step into: messy pipelines that nobody trusts, manual processes eating up hours every week, disconnected tools that don&apos;t talk to each other, or a HubSpot portal that was set up once and never properly configured.
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
                        className={`rounded-2xl border border-border bg-surface p-5 ${area.title === "Pipeline optimization" ? "sm:col-span-2" : ""}`}
                      >
                        <h3 className="font-semibold text-text">{area.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {area.description}
                        </p>
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
