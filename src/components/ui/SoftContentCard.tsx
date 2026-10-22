import Link from "next/link";
import ContentIcon from "@/components/ui/ContentIcon";

export default function SoftContentCard({
  href, title, description, icon, detail, date, eyebrow, headingLevel, compact = false,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  detail?: string;
  date?: { value: string; label: string };
  eyebrow?: string;
  headingLevel?: "h2" | "h3";
  compact?: boolean;
}) {
  const Heading = headingLevel ?? (compact ? "h3" : "h2");
  return (
    <Link href={href} className={`group flex h-full flex-col rounded-2xl border border-border bg-surface-2 transition-colors hover:border-accent/30 hover:bg-accent-light ${compact ? "gap-3 p-5" : "gap-4 p-6 lg:p-7"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-2 text-accent-text shadow-sm"><ContentIcon name={icon} /></span>
        <div className="flex items-center gap-3">
          {date && <time dateTime={date.value} className="text-sm text-text-secondary">{date.label}</time>}
          <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-text-secondary transition-colors group-hover:bg-accent-action group-hover:text-white">↗</span>
        </div>
      </div>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">{eyebrow}</p>}
      <Heading className={`font-display font-semibold leading-snug text-text ${compact ? "text-lg" : "text-2xl"}`}>{title}</Heading>
      <p className={`leading-relaxed text-text-secondary ${compact ? "text-sm" : "text-lg"}`}>{description}</p>
      {detail && <p className="text-sm leading-relaxed text-text-secondary">{detail}</p>}
    </Link>
  );
}
