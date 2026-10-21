import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompactCaseStudyContent from "@/components/sections/CompactCaseStudyContent";
import { caseStudies } from "@/content/caseStudies";
import { SITE_URL, SITE_SOCIAL_IMAGE } from "@/lib/site";

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return {
      title: "Case study not found — Tom Schoorstra",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: `${caseStudy.title} — Case study — Tom Schoorstra`,
    description: caseStudy.summary,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      images: [SITE_SOCIAL_IMAGE],
      title: `${caseStudy.title} — Tom Schoorstra`,
      description: caseStudy.summary,
      url: `/case-studies/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      images: [SITE_SOCIAL_IMAGE.url],
      title: `${caseStudy.title} — Tom Schoorstra`,
      description: caseStudy.summary,
    },
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex(study => study.slug === slug);
  const caseStudy = caseStudies[index];
  if (!caseStudy) notFound();

  const previous = index > 0 ? caseStudies[index - 1] : null;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE_URL}/case-studies` },
      { "@type": "ListItem", position: 3, name: caseStudy.title, item: `${SITE_URL}/case-studies/${slug}` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CompactCaseStudyContent caseStudy={caseStudy} previous={previous} next={next} />
    </main>
  );
}
