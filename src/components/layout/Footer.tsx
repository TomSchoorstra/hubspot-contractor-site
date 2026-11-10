import Link from "next/link";
import { site } from "@/content/site";
import TrackedAnchor from "@/components/analytics/TrackedAnchor";
import { allLines } from "@/lib/lines";

const footerLink = "border-b-2 border-transparent py-2 font-semibold transition-colors hover:border-accent";

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      {/* Every line on the site ends here. */}
      <div aria-hidden="true" className="bundle">
        {allLines.map(line => <i key={line} data-line={line} />)}
      </div>
      <div className="mx-auto max-w-[78rem] px-6 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Link href="/" className="t-h1 group inline-block">{site.name}<span className="text-accent transition-colors group-hover:text-accent-3">.</span></Link>
            <p className="mt-3 text-lg text-on-night-2">HubSpot &amp; RevOps specialist.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
            {site.nav.map((item) => <Link key={item.href} href={item.href} className={footerLink}>{item.label}</Link>)}
            <TrackedAnchor href="https://www.linkedin.com/in/tom-schoorstra-807899113/" target="_blank" rel="noopener noreferrer" analyticsLabel="LinkedIn" analyticsLocation="footer" className={footerLink}>LinkedIn</TrackedAnchor>
          </nav>
        </div>
        <p className="mt-10 border-t border-white/20 pt-6 text-sm text-on-night-2">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
