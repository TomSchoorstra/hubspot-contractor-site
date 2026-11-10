import type { CaseStudy } from "@/content/caseStudies";
import Reveal from "@/components/ui/Reveal";

// One Account at the top, a line down to a shared bus, and a drop to each linked record.
export default function ArchitectureDiagram({
  architecture,
  compact = false,
}: {
  architecture: NonNullable<CaseStudy["architecture"]>;
  compact?: boolean;
}) {
  const Heading = compact ? "h3" : "h2";
  return (
    <figure className="mt-8 border-t-[10px] border-line bg-paper-2 p-5 sm:p-8">
      <Heading className={compact ? "t-h4" : "t-h2"}>{architecture.title}</Heading>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-2">{architecture.description}</p>
      <Reveal className="mt-8">
        <div className="diagram-node rounded-full border-[5px] border-ink bg-paper px-6 py-3 text-center md:mx-auto md:max-w-xs">
          <p className="t-h4">{architecture.account.label}</p>
          <p className="text-sm text-ink-2">{architecture.account.detail}</p>
        </div>
        {/* Wide screens: a trunk, a bus and four drops. Narrow screens: one vertical bus with a stub to each record. */}
        <div aria-hidden="true" className="diagram-line mx-auto hidden h-8 w-2 bg-line md:block" />
        <div aria-hidden="true" className="diagram-bus mx-auto hidden h-2 w-3/4 bg-line md:block" />
        <ul className="ml-8 md:ml-0 md:grid md:grid-cols-4 md:gap-x-3" aria-label="Records linked to the Account">
          {architecture.records.map((record, index) => (
            <li key={record.label} className="relative py-2 pl-8 first:pt-6 md:flex md:flex-col md:items-center md:p-0 md:first:pt-0">
              <span aria-hidden="true" className={`diagram-line absolute top-0 left-0 w-2 bg-line md:static md:h-6 ${index === architecture.records.length - 1 ? "h-[calc(50%+4px)]" : "h-full"} ${index === 0 ? "max-md:h-full" : ""}`} />
              <span aria-hidden="true" className={`diagram-line absolute left-0 h-2 w-8 bg-line md:hidden ${index === 0 ? "top-[calc(50%+4px)]" : "top-[calc(50%-4px)]"}`} />
              <div className="diagram-node w-full border-2 border-ink bg-paper p-4 md:flex-1 md:px-2 md:text-center" style={{ "--i": index + 1 } as React.CSSProperties}>
                <p className="font-bold text-ink">{record.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{record.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
      <figcaption className="mt-6 text-sm leading-relaxed text-ink-2">{architecture.caption}</figcaption>
    </figure>
  );
}
