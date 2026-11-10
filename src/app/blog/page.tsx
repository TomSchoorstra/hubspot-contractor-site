import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
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
      <header className="pt-12 pb-8 lg:pt-20 lg:pb-12">
        <Container>
          <h1 className="t-h1">Blog</h1>
        </Container>
      </header>
      <section className="pb-16 lg:pb-24">
        <Container>
          {posts.length === 0 ? (
            <p className="text-text-muted">More posts coming soon.</p>
          ) : (
            // Posts are stops on one line, newest first.
            <div className="journey journey--static" data-line="ink">
              <div aria-hidden="true" className="journey__track" />
              <ul className="space-y-2" data-content-cards>
                {posts.map(post => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group grid gap-x-10 gap-y-2 py-5 lg:grid-cols-[11rem_minmax(0,1fr)] lg:py-7">
                      <time dateTime={post.date} className="ring-stop font-semibold text-ink-3 lg:pt-2" style={{ "--ring-top": "0.05em" } as React.CSSProperties}>{formatDate(post.date)}</time>
                      <div className="row-title max-w-3xl">
                        <h2 className="t-h3">{post.title}</h2>
                        <p className="mt-3 text-lg leading-relaxed text-ink-2">{post.excerpt}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
