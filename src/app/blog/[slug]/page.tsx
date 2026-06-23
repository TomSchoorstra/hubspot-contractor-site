import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import { getAllPosts, getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

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
  const socialImage = post.ogImage ?? post.coverImage;

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
      ...(socialImage ? { images: [{ url: socialImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Tom Schoorstra`,
      description: metaDescription,
      ...(socialImage ? { images: [socialImage] } : {}),
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

function cleanText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown links -> link text
    .replace(/[*_`]/g, "") // emphasis / inline code markers
    .replace(/\s+/g, " ")
    .trim();
}

// Extracts Q&A pairs from a "## Frequently Asked Questions" section so the page
// can emit FAQPage structured data. Returns [] when the post has no FAQ.
function extractFaqItems(markdown: string): { question: string; answer: string }[] {
  const lines = markdown.split("\n");

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+(frequently asked questions|faq)\b/i.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return [];

  const items: { question: string; answer: string }[] = [];
  let current: { question: string; answerLines: string[] } | null = null;

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s+/.test(line)) break; // next H2 ends the FAQ section

    const heading = line.match(/^###\s+(.*)$/);
    if (heading) {
      if (current) {
        items.push({
          question: current.question,
          answer: cleanText(current.answerLines.join(" ")),
        });
      }
      current = { question: cleanText(heading[1]), answerLines: [] };
    } else if (current) {
      current.answerLines.push(line);
    }
  }
  if (current) {
    items.push({
      question: current.question,
      answer: cleanText(current.answerLines.join(" ")),
    });
  }

  return items.filter((item) => item.question && item.answer);
}

const siteUrl = SITE_URL;

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

  const faqItems = extractFaqItems(post.content);
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
