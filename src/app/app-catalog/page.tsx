import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import { SITE_SOCIAL_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "App Catalog | Tom Schoorstra",
  description:
    "Small tools and integration projects for HubSpot teams, with their current availability.",
  alternates: { canonical: "/app-catalog" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "App Catalog — Tom Schoorstra",
    description:
      "Small tools and integration projects for HubSpot teams, with their current availability.",
    url: "/app-catalog",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "App Catalog | Tom Schoorstra",
    description: "Small tools and integration projects for HubSpot teams, with their current availability.",
  },
};

const apps = [
  {
    title: "HubSpot Tips for Slack",
    description:
      "A project for sharing weekly HubSpot tips in Slack. New installations are currently unavailable.",
    badge: "Slack",
    badgeVariant: "teal" as const,
    href: "/hubspot-enablement",
  },
];

export default function AppCatalogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Apps"
        title="App Catalog"
        subtitle="Small tools and integration projects for HubSpot teams."
      />

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, i) => (
              <ScrollReveal key={app.href} delay={i * 0.08}>
                <Link href={app.href} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)]">
                    <Badge variant={app.badgeVariant} size="sm">
                      {app.badge}
                    </Badge>
                    <h2 className="mt-4 font-display text-xl font-bold text-text group-hover:text-accent transition-colors">
                      {app.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {app.description}
                    </p>
                    <p className="mt-5 text-sm font-semibold text-accent flex items-center gap-1.5">
                      View project
                      <svg aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 14 14">
                        <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
