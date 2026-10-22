import Link from "next/link";
import { services } from "@/content/services";
import ContentIcon from "@/components/ui/ContentIcon";
import SoftContentCard from "@/components/ui/SoftContentCard";

export const expertiseDesigns = [
  { id: "1", name: "Soft cards", description: "Quiet grey cards, small icons and a little depth. Closest to the credentials on About." },
  { id: "2", name: "Compact rows", description: "A compact list with soft backgrounds, numbered markers and more breathing room." },
  { id: "3", name: "Playful tiles", description: "Gentle colour, larger graphic details and a slightly staggered layout." },
] as const;

export type ExpertiseVariant = typeof expertiseDesigns[number]["id"];

export function PreviewSwitcher({ active }: { active?: ExpertiseVariant }) {
  return (
    <div className="bg-surface-2 px-6 py-4">
      <nav aria-label="Design previews" className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 text-sm">
        <Link href="/services/design-preview" className="mr-3 font-semibold text-text underline underline-offset-4">Compare all three</Link>
        {expertiseDesigns.map(design => <Link key={design.id} href={`/services/design-preview/${design.id}`} aria-current={active === design.id ? "page" : undefined} className={`rounded-full px-4 py-2 font-medium ${active === design.id ? "bg-text text-white" : "bg-white text-text-secondary hover:bg-border-subtle"}`}>{design.id}. {design.name}</Link>)}
        <Link href="/services" className="ml-auto px-2 py-2 text-text-secondary underline underline-offset-4">Current page</Link>
      </nav>
    </div>
  );
}

export function ExpertiseCards({ variant, compact = false }: { variant: ExpertiseVariant; compact?: boolean }) {
  const Heading = compact ? "h3" : "h2";
  const items = compact ? services.slice(0, 2) : services;
  const grid = variant === "2" || compact ? "space-y-4" : "grid gap-5 md:grid-cols-2";
  const tints = ["bg-[#fff5ef]", "bg-[#edf7f7]", "bg-[#f1effa]", "bg-[#f7f3e8]", "bg-[#edf5fa]", "bg-[#faf0f2]"];

  return (
    <ul className={grid} data-expertise-design={variant}>
      {items.map((service, index) => {
        const href = compact ? `/services/design-preview/${variant}` : `/services/${service.slug}`;
        const title = <Heading className={`font-display font-semibold leading-snug text-text ${compact ? "text-lg" : variant === "2" ? "text-xl sm:text-2xl" : "text-2xl"}`}>{service.title}</Heading>;
        const description = <p className={`leading-relaxed text-text-secondary ${compact ? "text-sm" : "text-lg"}`}>{service.indexDescription}</p>;

        if (variant === "1") return (
          <li key={service.slug}>
            <SoftContentCard href={href} title={service.title} description={service.indexDescription} icon={service.slug} compact={compact} />
          </li>
        );

        if (variant === "2") return (
          <li key={service.slug}>
            <Link href={href} className={`group flex items-start rounded-2xl bg-surface-2 transition-colors hover:bg-accent-2-light ${compact ? "gap-3 p-5" : "gap-3 p-5 sm:gap-5 sm:p-6"}`}>
              <span aria-hidden="true" className={`${compact ? "flex" : "hidden sm:flex"} h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-mono text-sm text-accent-2-text`}>{String(index + 1).padStart(2, "0")}</span>
              <div className={`grid flex-1 gap-2 ${compact ? "" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-start lg:gap-8"}`}>{title}{description}</div>
              <span aria-hidden="true" className="shrink-0 text-xl text-accent-2-text">↗</span>
            </Link>
          </li>
        );

        return (
          <li key={service.slug} className={!compact && index % 2 ? "md:translate-y-4" : ""}>
            <Link href={href} className={`group relative flex h-full flex-col overflow-hidden rounded-3xl transition-shadow hover:shadow-md ${tints[index]} ${compact ? "gap-3 p-5" : "gap-4 p-7"}`}>
              <span aria-hidden="true" className="absolute -right-3 -top-4 h-24 w-24 rounded-full border-[14px] border-white/50" />
              <div className="relative flex items-center justify-between">
                <span className={`text-text ${compact ? "h-8 w-8" : "h-10 w-10"}`}><ContentIcon name={service.slug} /></span>
                <span aria-hidden="true" className="font-mono text-xs text-text-secondary">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="relative">{title}</div>
              <div className="relative">{description}</div>
              <span aria-hidden="true" className="mt-auto pt-1 text-xl text-text">↗</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
