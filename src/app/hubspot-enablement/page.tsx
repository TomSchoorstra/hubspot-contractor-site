import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/sections/PageHeader";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Container from "@/components/ui/Container";
import StatusBanner from "./StatusBanner";

export const metadata: Metadata = {
  title: "HubSpot Tips for Slack | Tom Schoorstra",
  description:
    "Get a practical HubSpot tip delivered to your Slack workspace every Monday. Install once, no setup required.",
  alternates: { canonical: "/hubspot-enablement" },
};

const steps = [
  {
    title: "Install the bot via Slack",
    description:
      'Click "Add to Slack", choose your workspace and the channel where tips should be posted. The whole thing takes under a minute.',
  },
  {
    title: "Choose a channel",
    description:
      "During the OAuth flow you pick the Slack channel that receives the tips — a team channel, a dedicated #hubspot channel, or just yourself.",
  },
  {
    title: "Get a tip every Monday",
    description:
      "The bot sends a new HubSpot tip automatically every Monday morning. No further action needed — it just works.",
  },
];

export default function HubSpotEnablementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free Slack integration"
        title="Weekly HubSpot Tips for Slack"
        subtitle="Get a practical HubSpot tip delivered to your team every Monday. Install once and your team stays up to date on the best HubSpot features — automatically."
        primaryCta={{ label: "Add to Slack", href: "/api/slack/oauth" }}
      />

      <Container>
        <div className="py-8">
          <Suspense>
            <StatusBanner />
          </Suspense>
        </div>
      </Container>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                How it works
              </p>
              <h2 className="font-display text-3xl font-bold text-text lg:text-4xl mb-6">
                Live in three steps
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                No dashboards, no configuration. The bot pulls tips from a curated
                database and sends them sequentially — every workspace always
                receives a fresh tip.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <ProcessTimeline steps={steps} />
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
