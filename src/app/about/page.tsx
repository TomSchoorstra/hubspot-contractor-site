import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About Me | Tom Schoorstra",
  description:
    "HubSpot & RevOps specialist based in the Netherlands. Explore my work in CRM architecture, integrations, data quality and custom HubSpot interfaces.",
  alternates: { canonical: "/about" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "About Tom Schoorstra | HubSpot & RevOps Specialist",
    description:
      "Explore my work in CRM architecture, integrations, data quality and custom HubSpot interfaces.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "About Tom Schoorstra | HubSpot & RevOps Specialist",
    description:
      "Explore my work in CRM architecture, integrations, data quality and custom HubSpot interfaces.",
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
              <p className="max-w-2xl text-xl leading-relaxed text-text-secondary">I&apos;m a HubSpot &amp; RevOps specialist based in the Netherlands. I connect CRM processes with the systems around them.</p>
              <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">My work includes customer models, workflows, integrations and record interfaces. I also build checks to investigate missing links and inconsistent data.</p>
            </div>
            <Image src="/about-photo.jpeg" alt="Tom Schoorstra" width={480} height={640} sizes="(max-width: 768px) 256px, 320px" priority className="mx-auto h-auto w-full max-w-64 rounded-2xl md:max-w-xs" />
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl space-y-10 text-lg leading-relaxed text-text-secondary">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">What I work on</h2>
              <p>I led AIHR&apos;s account-based CRM project: defining the customer model, connecting historical records and building workflows that link licenses, deals and professional services to the right Account. I added recurring reviews to investigate missing associations and potential duplicates.</p>
              <p>Other work includes the HubSpot, WooCommerce and Exact order flow, data quality dashboards and a read-only renewal status card on deals. The cases explain what I built and what remained open.</p>
              <Link href="/case-studies" className="inline-block font-semibold text-text underline underline-offset-4 hover:text-accent-text">Explore the case studies</Link>
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">How I work</h2>
              <p>I follow the process first: where data comes from, who owns each decision and what needs to happen in the next system. That helps distinguish a record problem from a gap in the workflow.</p>
              <p>From there, I design the model or automation, test the paths and exceptions, and document how the team can maintain it. Checks after launch help catch new issues.</p>
              <p>I use Codex and Claude Code for investigation, documentation and recurring reviews. In the <Link href="/case-studies/customer-lifecycle" className="font-semibold text-text underline underline-offset-4 hover:text-accent-text">weekly account review</Link>, they help assess candidate matches and prepare recommendations. I start the review and decide what to do with the findings. The review itself does not write to HubSpot.</p>
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-text">Background</h2>
              <p className="text-base">Past certifications and recognition, rather than current credentials:</p>
              <ul className="space-y-1 text-sm leading-relaxed">
                {certifications.map((cert) => <li key={cert.name}>{cert.name} · {cert.issuer}, {cert.year}</li>)}
              </ul>
              <p className="text-sm leading-relaxed"><span className="font-semibold text-text">Tools I work with: </span>{toolGroups.flatMap((group) => group.tools).join(", ")}.</p>
            </div>
            <p className="border-t border-border pt-6 text-base">I&apos;m not taking on client projects at the moment. Questions and conversations about HubSpot are welcome. <Link href="/contact" className="font-semibold text-text underline underline-offset-4 hover:text-accent-text">Get in touch</Link>.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
