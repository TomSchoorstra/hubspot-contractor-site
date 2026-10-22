import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About Me | Tom Schoorstra",
  description:
    "I'm Tom, a HubSpot & RevOps specialist in the Netherlands. I enjoy fixing processes from start to finish and turning manual steps into automation.",
  alternates: { canonical: "/about" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "About Tom Schoorstra | HubSpot & RevOps Specialist",
    description:
      "I enjoy fixing processes from start to finish and turning manual steps into automation. Here's how I approach the work.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "About Tom Schoorstra | HubSpot & RevOps Specialist",
    description:
      "I enjoy fixing processes from start to finish and turning manual steps into automation. Here's how I approach the work.",
  },
};

const toolGroups = [
  {
    label: "HubSpot",
    tools: ["HubSpot CRM", "Custom objects", "Workflows", "Data Studio", "HubSpot API"],
  },
  {
    label: "Automation",
    tools: ["Zapier", "JavaScript", "React", "WooCommerce", "Exact"],
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
      <section className="relative overflow-hidden border-b border-border-subtle py-12 lg:py-16">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />
        <Container>
          <div className="relative grid gap-8 md:grid-cols-[2fr_1fr] md:items-center">
            <div className="space-y-5">
              <Badge variant="teal">HubSpot &amp; RevOps specialist</Badge>
              <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-text sm:text-5xl lg:text-6xl">Tom <span className="text-gradient-orange">Schoorstra.</span></h1>
              <p className="max-w-2xl text-xl leading-relaxed text-text-secondary">I&apos;m a HubSpot &amp; RevOps specialist based in the Netherlands. I like getting a process working from start to finish.</p>
              <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">I get a real kick out of turning a string of manual steps into a working automation. That&apos;s the part of the work I enjoy most.</p>
            </div>
            <Image src="/about-photo.jpeg" alt="Tom Schoorstra" width={480} height={640} sizes="(max-width: 768px) 256px, 320px" priority className="mx-auto h-auto w-full max-w-64 rounded-2xl md:max-w-xs" />
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl space-y-10 text-lg leading-relaxed text-text-secondary">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">How I approach a fix</h2>
              <p>I want to understand where the work gets stuck before I start building. That means tracing the data and working out who needs to do what next.</p>
              <p>A change can affect the next team or system, so I test the handovers and exceptions too. Then I document how it works and add checks for what happens after launch.</p>
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">What I build with</h2>
              <p>I build in HubSpot Workflow Builder and Zapier, and increasingly write code with help from Codex and Claude Code. The tool depends on what the process needs.</p>
              <p>At AIHR, I led the account-based CRM project and built the HubSpot, WooCommerce and Exact order flow. The renewal status card is a smaller example: it puts the answer directly on the deal.</p>
              <p>I also use Codex and Claude Code to prepare recommendations for the <Link href="/case-studies/customer-lifecycle" className="font-semibold text-text underline underline-offset-4 hover:text-accent-text">weekly account review</Link>. I start the review and decide what to do with the findings. The review itself does not write to HubSpot.</p>
              <Link href="/case-studies" className="inline-block font-semibold text-text underline underline-offset-4 hover:text-accent-text">See what I&apos;ve built</Link>
            </div>
            <details className="border-t border-border pt-5 text-base">
              <summary className="cursor-pointer font-semibold text-text">Tools and past certifications</summary>
              <div className="mt-4 space-y-4">
                <p className="text-sm leading-relaxed"><span className="font-semibold text-text">Tools I work with: </span>{toolGroups.flatMap((group) => group.tools).join(", ")}.</p>
                <p className="text-sm">These certifications and recognition are historical, not current credentials:</p>
                <ul className="space-y-1 text-sm leading-relaxed">
                  {certifications.map((cert) => <li key={cert.name}>{cert.name} · {cert.issuer}, {cert.year}</li>)}
                </ul>
              </div>
            </details>
            <p className="border-t border-border pt-6 text-base">I&apos;m not taking on client projects at the moment. Questions and conversations about HubSpot are welcome. <Link href="/contact" className="font-semibold text-text underline underline-offset-4 hover:text-accent-text">Get in touch</Link>.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
