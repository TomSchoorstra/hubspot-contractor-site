import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Tom Schoorstra",
  description:
    "Practical insights on HubSpot, automation, and RevOps — straight from real projects.",
  openGraph: {
    title: "Blog — Tom Schoorstra",
    description:
      "Practical insights on HubSpot, automation, and RevOps — straight from real projects.",
    url: "/blog",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <PageHeader title="Blog" />

      <section className="py-20 lg:py-28">
        <Container>
          {posts.length === 0 ? (
            <p className="text-text-muted">More posts coming soon.</p>
          ) : (
            <div className="max-w-2xl">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

                <div className="flex flex-col gap-0">
                  {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative pl-8 py-4 sm:pl-10">
                      {/* Dot */}
                      <div className="absolute left-0 top-9 -translate-x-1/2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg transition-colors group-hover:bg-accent" />

                      <div className="rounded-2xl border border-border bg-surface px-8 py-7 transition-all duration-300 group-hover:border-accent/40 group-hover:-translate-y-0.5 group-hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)]">
                        <time className="text-xs font-semibold uppercase tracking-widest text-accent-2">
                          {formatDate(post.date)}
                        </time>
                        <h2 className="font-display mt-2 text-xl font-bold text-text transition-colors group-hover:text-accent">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
