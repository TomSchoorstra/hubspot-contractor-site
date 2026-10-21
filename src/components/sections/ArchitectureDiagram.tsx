import type { CaseStudy } from "@/content/caseStudies";

export default function ArchitectureDiagram({
  architecture,
  compact = false,
}: {
  architecture: NonNullable<CaseStudy["architecture"]>;
  compact?: boolean;
}) {
  const Heading = compact ? "h3" : "h2";
  return (
    <figure className={compact ? "pt-3" : "rounded-3xl border border-border bg-surface-2 p-6 sm:p-8 lg:p-10"}>
      <Heading className={compact ? "font-display text-xl font-semibold text-text" : "font-display text-2xl font-bold text-text lg:text-3xl"}>{architecture.title}</Heading>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">{architecture.description}</p>
      <div className="mt-8">
        <div className="mx-auto max-w-sm rounded-2xl border-2 border-accent-2 bg-surface p-5 text-center">
          <p className="font-semibold text-text">{architecture.account.label}</p>
          <p className="mt-1 text-sm text-text-secondary">{architecture.account.detail}</p>
        </div>
        <div aria-hidden="true" className="mx-auto h-8 w-px bg-border" />
        <ul className={`grid gap-4 border-t border-border pt-6 sm:grid-cols-2 ${compact ? "" : "lg:grid-cols-4"}`} aria-label="Records linked to the Account">
          {architecture.records.map((record) => (
            <li key={record.label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-semibold text-text">{record.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{record.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-6 text-sm leading-relaxed text-text-secondary">{architecture.caption}</figcaption>
    </figure>
  );
}
