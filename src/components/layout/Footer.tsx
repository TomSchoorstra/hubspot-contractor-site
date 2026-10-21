import Link from "next/link";
import { site } from "@/content/site";
import TrackedAnchor from "@/components/analytics/TrackedAnchor";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-6xl space-y-5 px-6 py-8 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <Link href="/" className="font-display text-lg font-semibold text-text hover:text-accent-text">{site.name}<span className="text-accent">.</span></Link>
            <p className="mt-1 text-sm text-text-secondary">HubSpot &amp; RevOps specialist.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-text-secondary">
            {site.nav.map((item) => <Link key={item.href} href={item.href} className="hover:text-accent-text">{item.label}</Link>)}
            <Link href="/app-catalog" className="hover:text-accent-text">App Catalog</Link>
            <TrackedAnchor href="https://www.linkedin.com/in/tom-schoorstra-807899113/" target="_blank" rel="noopener noreferrer" analyticsLabel="LinkedIn" analyticsLocation="footer" className="hover:text-accent-text">LinkedIn</TrackedAnchor>
          </nav>
        </div>
        <p className="text-xs text-text-secondary">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
