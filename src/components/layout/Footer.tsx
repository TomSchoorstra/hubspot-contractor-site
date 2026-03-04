import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-2 border-accent/20 bg-surface-2">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        {/* 3-column grid */}
        <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="font-display text-xl font-bold text-text hover:text-accent transition-colors">
              {site.name}<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary max-w-xs">
              Independent HubSpot contractor helping growing teams build automation, integrations, and scalable CRM systems.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/in/tom-schoorstra-807899113/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-all hover:border-accent hover:text-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">Navigation</h3>
            <nav className="space-y-3">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-medium text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: CTA */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">Let&apos;s work together</h3>
            <p className="text-sm leading-relaxed text-text-secondary mb-5">
              Ready to clean up your HubSpot or build something new? I&apos;ll get back to you within one business day.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow-md hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group"
            >
              Plan a call
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 14 14">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built for HubSpot operators.
          </p>
        </div>
      </div>
    </footer>
  );
}
