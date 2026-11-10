import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ExperienceTimer from "@/components/ui/ExperienceTimer";
import ToolOrnaments from "@/components/sections/ToolOrnaments";

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
      <section className="bg-paper-2">
        <Container>
          <div className="grid gap-8 py-12 md:grid-cols-[2fr_1fr] md:items-center lg:gap-12 lg:py-16">
            <div className="space-y-6">
              <Badge variant="teal">HubSpot &amp; RevOps specialist</Badge>
              <h1 className="t-mega">Tom <span>Schoorstra<span className="text-accent">.</span></span></h1>
              <p className="max-w-2xl text-2xl leading-snug text-ink">I&apos;m a HubSpot &amp; RevOps specialist based in the Netherlands. I like getting a process working from start to finish.</p>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-2">I get a real kick out of turning a string of manual steps into a working automation. That&apos;s the part of the work I enjoy most.</p>
            </div>
            <div className="mx-auto w-full max-w-xs">
              <Image src="/about-photo.jpeg" alt="Tom Schoorstra" width={512} height={512} sizes="(max-width: 768px) 256px, 320px" priority className="mx-auto h-auto w-full max-w-64 border-b-[10px] border-ink md:max-w-xs" />
              <ToolOrnaments />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid items-start gap-12 text-lg leading-relaxed text-ink-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
            {/* First in the source so it leads on mobile; on desktop it sits at the top of the right column. */}
            <div className="lg:col-start-2 lg:row-start-1">
              <ExperienceTimer />
            </div>
            <div className="space-y-12 lg:col-start-1 lg:row-span-2 lg:row-start-1">
              <div className="space-y-4">
                <h2 className="t-h2">How I approach a fix</h2>
                <p>I want to understand where the work gets stuck before I start building. That means tracing the data and working out who needs to do what next.</p>
                <p>A change can affect the next team or system, so I test the handovers and exceptions too. Then I document how it works and add checks for what happens after launch.</p>
              </div>
              <div className="space-y-4">
                <h2 className="t-h2">My role at AIHR</h2>
                <p>At AIHR, I&apos;m responsible for our tech stack, including HubSpot, WooCommerce, Exact and the other tools our teams use. I look after how they work together and build the workflows and integrations between them.</p>
                <p>I build in HubSpot Workflow Builder and Zapier, and increasingly write code with help from Codex and Claude Code. The tool depends on what the process needs.</p>
                <p>I use them for the <Link href="/case-studies/customer-lifecycle" className="tlink text-ink">weekly account review</Link> too, checking the recommendations myself before making changes.</p>
                <Link href="/case-studies" className="tlink inline-block text-ink">See what I&apos;ve built</Link>
              </div>
              <div className="space-y-5">
                <h2 className="t-h2">My toolkit</h2>
                <dl className="border-t-2 border-ink text-base leading-relaxed">
                  {toolGroups.map(group => (
                    <div key={group.label} className="grid gap-1 border-b border-rule py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                      <dt className="font-bold text-ink">{group.label}</dt>
                      <dd>{group.tools.join(", ")}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <aside aria-labelledby="certifications-heading" className="lg:col-start-2 lg:row-start-2">
              <h2 id="certifications-heading" className="t-h3">Certifications &amp; recognition</h2>
              {/* Credentials sit on one line, newest first. */}
              <div className="journey journey--static mt-7" data-line="ink" style={{ "--rail-pad": "2.5rem" } as React.CSSProperties}>
                <div aria-hidden="true" className="journey__track" />
                <ul className="space-y-5">
                  {certifications.map(cert => (
                    <li key={cert.name}>
                      <span className="ring-stop block text-sm font-bold text-accent-text" style={{ "--ring-top": "-0.1em" } as React.CSSProperties}>{cert.year}</span>
                      <p className="mt-0.5 text-base font-bold leading-snug text-ink">{cert.name}</p>
                      <p className="text-sm leading-relaxed">{cert.issuer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
          <p className="mt-14 max-w-3xl border-t-2 border-ink pt-6 text-lg leading-relaxed text-ink-2">I&apos;m not taking on client projects at the moment. Questions and conversations about HubSpot are welcome. <Link href="/contact" className="tlink text-ink">Get in touch</Link>.</p>
        </Container>
      </section>
    </main>
  );
}
