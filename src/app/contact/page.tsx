import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Tom Schoorstra",
  description: "Let's talk about your HubSpot setup. I'll get back to you within one business day.",
  openGraph: {
    title: "Contact Tom Schoorstra — HubSpot Contractor",
    description: "Let's talk about your HubSpot setup. I'll get back to you within one business day.",
    url: "/contact",
  },
};

const expectations = [
  "A response within one business day",
  "An honest take on what HubSpot can do for your situation",
  "No hard sell — just a conversation about fit",
];

export default function Contact() {
  return (
    <main>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border-subtle py-16 lg:py-20">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
        <Container>
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Get in touch
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-text lg:text-5xl">
              Let&apos;s talk about your HubSpot setup
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary">
              Tell me about your project or challenge. I&apos;ll get back to you within one business day.
            </p>
          </div>
        </Container>
      </header>

      {/* Split layout */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">

            {/* Left: info panel */}
            <div className="space-y-8 lg:pt-2">
              {/* What to expect */}
              <div>
                <h2 className="font-display text-lg font-bold text-text mb-5">
                  What to expect
                </h2>
                <div className="space-y-4">
                  {expectations.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white">
                        <svg aria-hidden="true" className="h-3 w-3" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-base text-text-secondary">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Typical projects */}
              <div>
                <h2 className="font-display text-lg font-bold text-text mb-5">
                  Typical budget ranges
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Quick automation or audit", budget: "€1k – €3k" },
                    { label: "Integration or custom object", budget: "€3k – €8k" },
                    { label: "Full RevOps engagement", budget: "€8k+" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                      <span className="text-sm text-text-secondary">{item.label}</span>
                      <span className="text-sm font-semibold text-accent">{item.budget}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* LinkedIn */}
              <div>
                <h2 className="font-display text-lg font-bold text-text mb-4">
                  Connect directly
                </h2>
                <a
                  href="https://www.linkedin.com/in/tom-schoorstra-807899113/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-text transition-all hover:border-accent hover:shadow-md"
                >
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Tom Schoorstra on LinkedIn
                  <svg aria-hidden="true" className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm lg:p-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
