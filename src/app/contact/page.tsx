import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import TrackedAnchor from "@/components/analytics/TrackedAnchor";
import { SITE_SOCIAL_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Tom Schoorstra",
  description: "Questions or ideas about HubSpot? Get in touch with Tom Schoorstra. Personal portfolio; not currently taking on client projects.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Tom Schoorstra | HubSpot & RevOps Specialist",
    description: "Questions and conversations about HubSpot are welcome. I'm not taking on client projects at the moment.",
    url: "/contact",
    images: [SITE_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "Contact Tom Schoorstra | HubSpot & RevOps Specialist",
    description: "Questions and conversations about HubSpot are welcome. I'm not taking on client projects at the moment.",
  },
};

export default function Contact() {
  return (
    <main>
      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-text sm:text-5xl">Get in touch</h1>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">I&apos;m not taking on client projects at the moment, but you&apos;re welcome to ask a question or compare notes on HubSpot.</p>
            <p className="mt-3 leading-relaxed text-text-secondary">Send a message below or <TrackedAnchor href="https://www.linkedin.com/in/tom-schoorstra-807899113/" target="_blank" rel="noopener noreferrer" analyticsLabel="Tom Schoorstra on LinkedIn" analyticsLocation="contact_page" className="font-semibold text-text underline underline-offset-4 hover:text-accent-text">connect on LinkedIn</TrackedAnchor>. I usually reply within one business day.</p>
            <div className="mt-8 border-t border-border pt-8"><ContactForm /></div>
            <p className="mt-4 text-xs text-text-secondary">Your message is sent through Formspree so I can reply.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
