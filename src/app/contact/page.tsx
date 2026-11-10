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
      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h1 className="t-mega">Get in touch</h1>
              <p className="mt-6 max-w-xl text-2xl leading-snug text-ink">I&apos;m not taking on client projects at the moment, but you&apos;re welcome to ask a question or compare notes on HubSpot.</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">Good reasons to write: you&apos;re modelling accounts with custom objects, comparing HubSpot with another system&apos;s data, or planning an app card.</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">Send a message below or <TrackedAnchor href="https://www.linkedin.com/in/tom-schoorstra-807899113/" target="_blank" rel="noopener noreferrer" analyticsLabel="Tom Schoorstra on LinkedIn" analyticsLocation="contact_page" className="tlink text-ink">connect on LinkedIn</TrackedAnchor>. I usually reply within one business day.</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border-t-[10px] border-accent bg-paper-2 p-6 sm:p-10"><ContactForm /></div>
              <p className="mt-4 text-sm text-ink-2">Your message is sent through Formspree so I can reply.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
