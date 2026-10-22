import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompactServiceContent from "@/components/sections/CompactServiceContent";
import { services } from "@/content/services";
import { SITE_URL, SITE_SOCIAL_IMAGE } from "@/lib/site";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service not found — Tom Schoorstra",
      description: "The requested service could not be found.",
    };
  }

  const description = service.metaDescription ?? service.shortDescription;

  return {
    title: `${service.title} — Tom Schoorstra`,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      images: [SITE_SOCIAL_IMAGE],
      title: `${service.title} — Tom Schoorstra`,
      description,
      url: `/services/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      images: [SITE_SOCIAL_IMAGE.url],
      title: `${service.title} — Tom Schoorstra`,
      description,
    },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        provider: {
          "@type": "Person",
          name: "Tom Schoorstra",
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Netherlands",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Expertise", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/services/${slug}` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CompactServiceContent service={service} details={service.compact} />
    </main>
  );
}
