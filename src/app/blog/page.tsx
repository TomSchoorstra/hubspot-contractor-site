import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SoftContentCard from "@/components/ui/SoftContentCard";
import { getAllPosts } from "@/lib/blog";
import { SITE_SOCIAL_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Tom Schoorstra",
  description:
    "Notes on HubSpot, CRM structure, automation and data quality, with practical checks and clear limits.",
  alternates: { canonical: "/blog" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "Blog — Tom Schoorstra",
    description:
      "Notes on HubSpot, CRM structure, automation and data quality, with practical checks and clear limits.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "Blog — Tom Schoorstra",
    description: "Notes on HubSpot, CRM structure, automation and data quality, with practical checks and clear limits.",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <header className="relative overflow-hidden py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <Container size="narrow" className="relative">
          <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-text sm:text-5xl lg:text-6xl">Blog</h1>
        </Container>
      </header>
      <section className="pb-12 lg:pb-16">
        <Container>
          {posts.length === 0 ? (
            <p className="text-text-muted">More posts coming soon.</p>
          ) : (
            <ul className="grid gap-5 md:grid-cols-2" data-content-cards>
              {posts.map(post => (
                <li key={post.slug}>
                  <SoftContentCard href={`/blog/${post.slug}`} title={post.title} description={post.excerpt} icon="article" date={{ value: post.date, label: formatDate(post.date) }} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </main>
  );
}
