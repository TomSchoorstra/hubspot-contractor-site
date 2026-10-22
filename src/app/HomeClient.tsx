"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import SoftContentCard from "@/components/ui/SoftContentCard";
import ContentIcon from "@/components/ui/ContentIcon";
import { caseStudies } from "@/content/caseStudies";
import { expertiseAreas } from "@/content/expertise";

const featuredCases = ["customer-lifecycle", "crm-data-quality"].flatMap((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  return study ? [study] : [];
});

const textLink = "font-semibold text-text underline underline-offset-4 hover:text-accent-text";

export default function HomeClient() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />
        <Container className="relative py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
            <div className="space-y-5">
              <Badge variant="teal">HubSpot &amp; RevOps specialist</Badge>
              <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">
                I work on the<br className="hidden sm:block" /> complicated bits<br className="hidden sm:block" />
                <span className="block text-accent-text">of HubSpot.</span>
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-text-secondary">I work on CRM structure, workflows, integrations and data quality. I design the setup, build it and check what happens afterwards.</p>
              <Button href="/case-studies" size="lg" showArrow analyticsEvent="cta_click" analyticsParams={{ cta_label: "See the work", cta_location: "home_hero", destination: "/case-studies" }}>See the work</Button>
              <p className="text-sm text-text-secondary">Based in the Netherlands. <Link href="/about" className={textLink}>More about me</Link></p>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -top-2 -left-2 h-full w-full rounded-2xl border border-accent/30" aria-hidden="true" />
              <Image src="/about-photo.jpeg" alt="Tom Schoorstra, HubSpot and RevOps specialist" width={512} height={512} sizes="(max-width: 640px) calc(100vw - 48px), 384px" priority className="relative h-auto w-full rounded-2xl object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold text-text">Selected work</h2>
            <Link href="/case-studies" className={textLink}>All case studies</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredCases.map((study) => (
              <SoftContentCard key={study.slug} href={`/case-studies/${study.slug}`} title={study.title} description={study.summary} icon={expertiseAreas.find(area => area.proofHref === `/case-studies/${study.slug}`)?.icon ?? "article"} detail={study.statusNote} eyebrow={study.narrative?.eyebrow ?? study.industry} headingLevel="h3" />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border-subtle bg-surface-2 py-12 lg:py-16">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-text">Four parts of the work</h2>
          <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {expertiseAreas.map((area) => (
              <div key={area.title}>
                <h3 className="flex items-start gap-3 font-display text-xl font-semibold text-text"><span className="mt-0.5 h-6 w-6 shrink-0 text-accent-text"><ContentIcon name={area.icon} /></span><span>{area.title}</span></h3>
                <p className="mt-2 leading-relaxed text-text-secondary">{area.description}</p>
                <Link href={area.proofHref} className={`mt-2 inline-block text-sm ${textLink}`}>{area.proofLabel}</Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-text">How I work</h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">I follow the data across records and systems, then test the handovers and exceptions. Read <Link href="/about" className={textLink}>more about my approach</Link>, including how I use AI-assisted reviews, or explore my <Link href="/services" className={textLink}>HubSpot expertise</Link>.</p>
            <p className="mt-5 leading-relaxed text-text-secondary">Want to compare notes on HubSpot? <Link href="/contact" className={textLink}>Get in touch</Link>.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
