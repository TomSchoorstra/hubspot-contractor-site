import Link from "next/link";
import ContentIcon from "@/components/ui/ContentIcon";

// Kept for the design-preview pages. The public pages use line rows instead.
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
    <Link href={href} data-line={icon} className={`group flex h-full flex-col border-t-[10px] border-line bg-surface-2 transition-colors hover:bg-accent-light ${compact ? "gap-3 p-5" : "gap-4 p-6 lg:p-7"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="bullet" style={{ "--size": "2.5rem" } as React.CSSProperties}><ContentIcon name={icon} /></span>
        {date && <time dateTime={date.value} className="text-sm text-text-secondary">{date.label}</time>}
      </div>
      {eyebrow && <p className="text-sm font-semibold text-text-secondary">{eyebrow}</p>}
      <Heading className={`font-display font-bold leading-none text-text ${compact ? "text-2xl" : "text-4xl"}`}>{title}</Heading>
      <p className={`leading-relaxed text-text-secondary ${compact ? "text-sm" : "text-lg"}`}>{description}</p>
      {detail && <p className="text-sm leading-relaxed text-text-secondary">{detail}</p>}
    </Link>
  );
}
