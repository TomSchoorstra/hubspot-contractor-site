import fs from "fs";
import path from "path";
import { parse } from "yaml";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(raw);
  if (!match) throw new Error("Blog post is missing YAML frontmatter");

  const data: unknown = parse(match[1]);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Blog frontmatter must be a YAML mapping");
  }

  return {
    data: data as Record<string, unknown>,
    content: raw.slice(match[0].length),
  };
}

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description?: string;
  author?: string;
  updated?: string;
  coverImage?: string;
  ogImage?: string;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      description: data.description as string | undefined,
      author: data.author as string | undefined,
      updated: data.updated as string | undefined,
      coverImage: data.coverImage as string | undefined,
      ogImage: data.ogImage as string | undefined,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    description: data.description as string | undefined,
    author: data.author as string | undefined,
    updated: data.updated as string | undefined,
    coverImage: data.coverImage as string | undefined,
    ogImage: data.ogImage as string | undefined,
    content,
  };
}
