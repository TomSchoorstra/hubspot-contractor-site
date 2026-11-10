import Link from "next/link";

// A featured case study: a stretch of its line, with a train that travels it on hover.
export default function WorkTile({
  href, line, eyebrow, title, description, detail,
}: {
  href: string;
  line: string;
  eyebrow: string;
  title: string;
  description: string;
  detail?: string;
}) {
  return (
    <Link href={href} data-line={line} className="group block">
      <span aria-hidden="true" className="track" />
      <p className="mt-8 text-sm font-semibold text-ink-3">{eyebrow}</p>
      <h3 className="t-h3 mt-2">{title}</h3>
      <p className="mt-4 text-lg leading-relaxed text-ink-2">{description}</p>
      {detail && <p className="mt-4 border-l-4 border-line pl-3 text-sm leading-relaxed text-ink-2">{detail}</p>}
    </Link>
  );
}
