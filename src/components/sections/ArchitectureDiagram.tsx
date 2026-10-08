import type { CaseStudy } from "@/content/caseStudies";

export default function ArchitectureDiagram({
  architecture,
}: {
  architecture: NonNullable<CaseStudy["architecture"]>;
}) {
  return (
    <figure className="rounded-3xl border border-border bg-surface-2 p-6 sm:p-8 lg:p-10">
      <h2 className="font-display text-2xl font-bold text-text lg:text-3xl">{architecture.title}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">{architecture.description}</p>
      <div className="mt-8">
        <div className="mx-auto max-w-sm rounded-2xl border-2 border-accent-2 bg-surface p-5 text-center">
          <p className="font-semibold text-text">{architecture.account.label}</p>
          <p className="mt-1 text-sm text-text-secondary">{architecture.account.detail}</p>
        </div>
        <div aria-hidden="true" className="mx-auto h-8 w-px bg-border" />
        <ul className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Records linked to the Account">
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
