import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import { getAllPosts, getPost } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post niet gevonden — Tom Schoorstra" };

  const metaDescription = post.description ?? post.excerpt;

  return {
    title: `${post.title} — Tom Schoorstra`,
    description: metaDescription,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} — Tom Schoorstra`,
      description: metaDescription,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["https://tomschoorstra.com/about"],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const siteUrl = "https://tomschoorstra.com";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const postUrl = `${siteUrl}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description ?? post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    author: {
      "@type": "Person",
      name: "Tom Schoorstra",
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Tom Schoorstra",
      url: siteUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border-subtle py-20 lg:py-28">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
        <Container>
          <div className="relative max-w-2xl">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-accent transition-colors"
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All posts
              </Link>
              <time className="text-xs font-semibold uppercase tracking-widest text-accent-2">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-text lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary">
              {post.excerpt}
            </p>
          </div>
        </Container>
      </header>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="prose-blog max-w-2xl">
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
        </Container>
      </section>

      <CTASection
        title="Questions about your HubSpot setup?"
        description="I'm happy to think along — even if you're not sure yet what you need."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />
    </main>
  );
}
