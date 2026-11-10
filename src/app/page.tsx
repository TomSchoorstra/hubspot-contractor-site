import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import LineBullet from "@/components/ui/LineBullet";
import HeroMap from "@/components/sections/HeroMap";
import WorkTile from "@/components/sections/WorkTile";
import { caseStudies } from "@/content/caseStudies";
import { expertiseAreas } from "@/content/expertise";
import { caseLine } from "@/lib/lines";

export const metadata: Metadata = {
  title: "Tom Schoorstra — HubSpot & RevOps Specialist",
  description:
    "HubSpot & RevOps specialist working in-house at AIHR. I connect customer records, automate handovers and investigate data quality issues. Explore my projects and approach.",
  alternates: { canonical: "/" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "HubSpot & RevOps specialist working in-house at AIHR. I connect customer records, automate handovers and investigate data quality issues. Explore my projects and approach.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "HubSpot & RevOps specialist working in-house at AIHR. I connect customer records, automate handovers and investigate data quality issues. Explore my projects and approach.",
  },
};

const featuredCases = ["customer-lifecycle", "renewal-status-card"].flatMap((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  return study ? [study] : [];
});

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-night text-white">
        <Container>
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="hero-rise relative z-10 space-y-6 pt-12 pb-10 lg:col-span-7 lg:pt-16 lg:pb-24">
              <div style={{ "--i": 0 } as React.CSSProperties}><Badge variant="teal">HubSpot &amp; RevOps specialist</Badge></div>
              <h1 className="t-mega sm:whitespace-nowrap" style={{ "--i": 1 } as React.CSSProperties}>
                I work on the<br className="hidden sm:block" /> complicated bits<br className="hidden sm:block" />
                <span className="block">of HubSpot<span className="text-accent">.</span></span>
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-on-night-2" style={{ "--i": 2 } as React.CSSProperties}>I work on CRM structure, workflows, integrations and data quality. I design the setup, build it and check what happens afterwards.</p>
              <div style={{ "--i": 3 } as React.CSSProperties}>
                <Button href="/case-studies" size="lg" showArrow analyticsEvent="cta_click" analyticsParams={{ cta_label: "See the work", cta_location: "home_hero", destination: "/case-studies" }}>See the work</Button>
              </div>
              <p className="text-on-night-2" style={{ "--i": 4 } as React.CSSProperties}>I do this work in-house at AIHR in the Netherlands. I&apos;m not taking on client projects, but I&apos;m happy to compare notes. <Link href="/about" className="tlink text-white">More about me</Link></p>
            </div>
            <div className="lg:col-span-5 lg:self-end">
              <HeroMap />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-h2">Selected work</h2>
            <Link href="/case-studies" className="tlink">All case studies</Link>
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {featuredCases.map((study) => (
              <WorkTile key={study.slug} href={`/case-studies/${study.slug}`} line={caseLine[study.slug]} title={study.title} description={study.summary} detail={study.statusNote} eyebrow={study.narrative?.eyebrow ?? study.industry} />
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-x-clip bg-paper-2 py-16 lg:py-24">
        <Container>
          <h2 className="t-h2">Four parts of the work</h2>
          <div className="mt-10 border-t-2 border-ink">
            {expertiseAreas.map((area) => (
              <div key={area.title} data-line={area.icon} className="group grid gap-x-8 gap-y-4 border-b border-rule py-8 md:grid-cols-[3.75rem_minmax(0,5fr)_minmax(0,7fr)] md:items-start">
                <LineBullet icon={area.icon} tail size="lg" />
                <h3 className="t-h3 md:pt-2.5">{area.title}</h3>
                <div className="md:pt-3">
                  <p className="text-lg leading-relaxed text-ink-2">{area.description}</p>
                  <Link href={area.proofHref} className="tlink mt-3 inline-block" style={{ "--ul": "var(--line)" } as React.CSSProperties}>{area.proofLabel}</Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <h2 className="t-h2 lg:col-span-4">How I work</h2>
            <div className="max-w-3xl lg:col-span-8">
              <p className="text-2xl leading-snug text-ink lg:text-[1.75rem]">I follow the data across records and systems, then test the handovers and exceptions. Read <Link href="/about" className="tlink">more about my approach</Link>, including how I use AI-assisted reviews, or explore my <Link href="/services" className="tlink">HubSpot expertise</Link>.</p>
              <p className="mt-6 text-lg leading-relaxed text-ink-2">Want to compare notes on HubSpot? <Link href="/contact" className="tlink">Get in touch</Link>.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
