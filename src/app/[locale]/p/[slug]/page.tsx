import { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs } from "@/utils/getAllPosts";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ArticleClient from "./client";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/CodeBlock";
import ImageBlock from "@/components/ImageBlock";
import HeadingBlock from "@/components/HeadingBlock";
import FrameBlock from "@/components/FrameBlock";

const SITE_ROOT = "https://rene.wang";
const AUTHOR_NAME = "Rene Wang";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Helper to extract SEO fields from the seo array format
function extractSeoField(seo: any[] | undefined, field: string): any {
  if (!seo || !Array.isArray(seo)) return undefined;
  const item = seo.find(
    (obj) => obj && typeof obj === "object" && field in obj
  );
  return item?.[field];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const { frontmatter, content } = post;
  const seo = frontmatter.seo;

  // Extract SEO fields if available, otherwise use fallbacks
  const title = extractSeoField(seo, "title") || frontmatter.title || slug;
  const description =
    extractSeoField(seo, "description") ||
    frontmatter.summary ||
    content.slice(0, 160);
  const keywords = extractSeoField(seo, "keywords") || frontmatter.keywords;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: frontmatter.date
        ? new Date(frontmatter.date).toISOString()
        : undefined,
      authors: [AUTHOR_NAME],
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@" + AUTHOR_NAME,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  return slugs.map(({ slug, locale }) => ({
    locale: locale,
    slug: slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale);

  if (!post) {
    return <div>Post not found</div>;
  }

  const { frontmatter, content } = post;
  const seo = frontmatter.seo;

  // Extract SEO fields for JSON-LD
  const title = extractSeoField(seo, "title") || frontmatter.title || slug;
  const description =
    extractSeoField(seo, "description") ||
    frontmatter.summary ||
    content.slice(0, 160);

  // Build JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: frontmatter.date
      ? new Date(frontmatter.date).toISOString()
      : undefined,
    dateModified: frontmatter.updatedAt
      ? new Date(frontmatter.updatedAt).toISOString()
      : frontmatter.date
      ? new Date(frontmatter.date).toISOString()
      : undefined,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_ROOT,
    },
    publisher: {
      "@type": "Organization",
      name: AUTHOR_NAME,
      url: SITE_ROOT,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_ROOT}/${locale}/p/${slug}`,
    },
    ...(frontmatter.cover && {
      image: {
        "@type": "ImageObject",
        url: frontmatter.cover.startsWith("http")
          ? frontmatter.cover
          : `${SITE_ROOT}${frontmatter.cover}`,
      },
    }),
    ...(frontmatter.keywords && {
      keywords: Array.isArray(frontmatter.keywords)
        ? frontmatter.keywords.join(", ")
        : frontmatter.keywords,
    }),
    inLanguage: locale,
  };

  // Compile MDX content with plugins and custom components
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [rehypeKatex],
      },
    },
    components: {
      code: CodeBlock,
      img: ImageBlock,
      h1: (props) => <HeadingBlock level={1} {...props} />,
      h2: (props) => <HeadingBlock level={2} {...props} />,
      h3: (props) => <HeadingBlock level={3} {...props} />,
      h4: (props) => <HeadingBlock level={4} {...props} />,
      h5: (props) => <HeadingBlock level={5} {...props} />,
      h6: (props) => <HeadingBlock level={6} {...props} />,
      iframe: FrameBlock,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient
        postContent={mdxContent}
        postProps={frontmatter}
        id={slug}
        locale={locale}
      />
    </>
  );
}
