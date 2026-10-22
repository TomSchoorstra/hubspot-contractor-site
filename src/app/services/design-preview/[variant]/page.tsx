import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { ExpertiseCards, PreviewSwitcher, expertiseDesigns } from "@/components/previews/ExpertiseDesign";
import { servicesHeroIntro } from "@/content/services";

export const dynamicParams = false;
export function generateStaticParams() { return expertiseDesigns.map(design => ({ variant: design.id })); }

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  const design = expertiseDesigns.find(design => design.id === variant);
  return { title: `${design?.name ?? "Design preview"} | Expertise preview` };
}

export default async function ExpertisePreview({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const design = expertiseDesigns.find(design => design.id === variant);
  if (!design) notFound();
  return (
    <main>
      <PreviewSwitcher active={design.id} />
      <header className="relative overflow-hidden py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance text-text sm:text-5xl lg:text-6xl">HubSpot expertise</h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-text-secondary">{servicesHeroIntro}</p>
          <p className="mt-5 leading-relaxed text-text-secondary">For the work behind these areas, <Link href="/case-studies" className="font-semibold text-text underline underline-offset-4 hover:text-accent-text">explore the case studies</Link>.</p>
        </Container>
      </header>
      <section className="pb-12 lg:pb-16" aria-label="Expertise areas">
        <Container size={design.id === "2" ? "narrow" : "default"}>
          <ExpertiseCards variant={design.id} />
          <p className={`text-base leading-relaxed text-text-secondary ${design.id === "3" ? "mt-12" : "mt-8"}`}>Questions or ideas about HubSpot? <Link href="/contact" className="font-semibold text-text underline underline-offset-4 hover:text-accent-text">Get in touch</Link>.</p>
        </Container>
      </section>
    </main>
  );
}
