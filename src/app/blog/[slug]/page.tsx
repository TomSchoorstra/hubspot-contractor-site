import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Container from "@/components/ui/Container";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { getAllPosts, getPost } from "@/lib/blog";
import { SITE_URL, SITE_SOCIAL_IMAGE } from "@/lib/site";

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
  const socialImage = post.ogImage ?? post.coverImage ?? SITE_SOCIAL_IMAGE.url;

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
      authors: [`${SITE_URL}/about`],
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
  return new Date(dateStr).toLocaleDateString("en-GB", {
    timeZone: "UTC",
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
      <ReadingProgress />
      <header className="pt-10 lg:pt-14">
        <Container size="narrow">
          <Link href="/blog" className="tlink text-sm">← All posts</Link>
          <h1 className="t-h1 mt-8" style={{ fontSize: "clamp(2.75rem, 1.9rem + 3.6vw, 4.75rem)" }}>{post.title}</h1>
          <p className="mt-6 max-w-[40rem] text-xl leading-relaxed text-ink-2 lg:text-2xl lg:leading-snug">{post.excerpt}</p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-y-2 border-ink py-3 text-sm font-semibold leading-relaxed text-ink-2">
            <span>By <Link href="/about" className="tlink text-ink">{post.author ?? "Tom Schoorstra"}</Link></span>
            <span>Published <time dateTime={post.date}>{formatDate(post.date)}</time></span>
            {post.updated && <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
          </p>
        </Container>
      </header>

      {/* Content */}
      <section className="pt-10 pb-16 lg:pt-12 lg:pb-24">
        <Container size="narrow">
          <article className="prose-blog max-w-[40rem]">
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>
        </Container>
      </section>

    </main>
  );
}
