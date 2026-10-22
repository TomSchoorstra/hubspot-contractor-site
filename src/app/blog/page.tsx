import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
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
      <header className="border-b border-border-subtle py-12 lg:py-16">
        <Container size="narrow">
          <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-text sm:text-5xl lg:text-6xl">Blog</h1>
        </Container>
      </header>
      <section className="py-12 lg:py-16">
        <Container size="narrow">
          <div className="max-w-3xl">
            {posts.length === 0 ? (
              <p className="text-text-muted">More posts coming soon.</p>
            ) : (
              <ul className="divide-y divide-border">
                {posts.map(post => (
                  <li key={post.slug} className="py-6 first:pt-0">
                    <time dateTime={post.date} className="text-sm text-text-secondary">{formatDate(post.date)}</time>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-text">
                      <Link href={`/blog/${post.slug}`} className="underline underline-offset-4 hover:text-accent-text">{post.title}</Link>
                    </h2>
                    <p className="mt-3 text-lg leading-relaxed text-text-secondary">{post.excerpt}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
