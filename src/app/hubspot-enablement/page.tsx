import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import StatusBanner from "./StatusBanner";
import { SITE_SOCIAL_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "HubSpot Tips for Slack | Tom Schoorstra",
  description: "A small Slack integration for sharing weekly HubSpot tips. Read about the project and its current availability.",
  alternates: { canonical: "/hubspot-enablement" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "HubSpot Tips for Slack | Tom Schoorstra",
    description: "A small Slack integration for sharing weekly HubSpot tips. New installations are currently unavailable.",
    url: "/hubspot-enablement",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "HubSpot Tips for Slack | Tom Schoorstra",
    description: "A small Slack integration for sharing weekly HubSpot tips. New installations are currently unavailable.",
  },
};

export default function HubSpotEnablementPage() {
  return (
    <main>
      <PageHeader eyebrow="Slack project" title="Weekly HubSpot Tips for Slack" subtitle="A small integration for sharing practical HubSpot tips with a team in Slack." />
      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-text-secondary">
            <Suspense><StatusBanner /></Suspense>
            <h2 className="font-display text-2xl font-semibold text-text">Project status</h2>
            <p>New installations are currently unavailable.</p>
            <p>The integration is designed to send a tip from a curated collection to a chosen Slack channel each Monday. Installation will reopen once the setup and delivery have been verified.</p>
            <Link href="/app-catalog" className="inline-block font-semibold text-text underline underline-offset-4">Back to the app catalog</Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
