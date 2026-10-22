import Link from "next/link";
import Container from "@/components/ui/Container";
import { ExpertiseCards, expertiseDesigns } from "@/components/previews/ExpertiseDesign";

export default function CompareExpertiseDesigns() {
  return (
    <main className="py-10 lg:py-14">
      <Container size="wide">
        <p className="text-sm font-medium text-accent-text">Design comparison</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">Three directions for Expertise</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">The same content, with three different treatments. These samples show the first two areas. Open a full preview to compare the complete layout.</p>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-3">
          {expertiseDesigns.map(design => (
            <section key={design.id} aria-labelledby={`design-${design.id}`}>
              <h2 id={`design-${design.id}`} className="font-display text-2xl font-semibold text-text">{design.id}. {design.name}</h2>
              <p className="mt-3 min-h-20 text-base leading-relaxed text-text-secondary">{design.description}</p>
              <div className="mt-5"><ExpertiseCards variant={design.id} compact /></div>
              <Link href={`/services/design-preview/${design.id}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-semibold text-white hover:bg-accent-action">Open full preview <span aria-hidden="true">↗</span></Link>
            </section>
          ))}
        </div>
        <Link href="/services" className="mt-10 inline-block text-sm font-semibold text-text underline underline-offset-4">Back to the current Expertise page</Link>
      </Container>
    </main>
  );
}
