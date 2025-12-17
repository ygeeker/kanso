import { NextResponse } from "next/server";
import getAllPosts from "@/utils/getAllPosts";
import siteConfig from "../../site.config";

function escapeXml(text: string): string {
	if (!text) return "";
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function generateAtomXml(locale: string): string {
	const baseUrl = siteConfig.root;
	const title = siteConfig.title[locale as keyof typeof siteConfig.title] || siteConfig.title["en-US"];
	const description = siteConfig.description[locale as keyof typeof siteConfig.description] || siteConfig.description["en-US"];
	const author = siteConfig.author;
	const now = new Date().toISOString();

	const posts = getAllPosts({
		locale,
		enableSort: true,
		enableContent: true,
	});

	const entries = posts
		.slice(0, 50)
		.map((post) => {
			const postTitle = escapeXml(post.frontmatter.title || post.defaultTitle);
			const postUrl = `${baseUrl}/${locale}/p/${post.id}`;
			const updated = post.frontmatter.date
				? new Date(post.frontmatter.date).toISOString()
				: now;
			const summary = escapeXml(post.frontmatter.summary || post.markdownBody?.slice(0, 200) || "");
			const category = post.category || "";

			return `
  <entry>
    <title>${postTitle}</title>
    <link href="${postUrl}" rel="alternate" type="text/html"/>
    <id>${postUrl}</id>
    <updated>${updated}</updated>
    <summary>${summary}</summary>
    ${category ? `<category term="${escapeXml(category)}"/>` : ""}
    <author>
      <name>${escapeXml(author.name)}</name>
      <email>${escapeXml(author.email)}</email>
    </author>
  </entry>`;
		})
		.join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(title)}</title>
  <subtitle>${escapeXml(description)}</subtitle>
  <link href="${baseUrl}" rel="alternate" type="text/html"/>
  <link href="${baseUrl}/feed.xml" rel="self" type="application/atom+xml"/>
  <id>${baseUrl}/</id>
  <updated>${now}</updated>
  <author>
    <name>${escapeXml(author.name)}</name>
    <email>${escapeXml(author.email)}</email>
  </author>
  <generator>Next.js</generator>
  <rights>All rights reserved ${new Date().getFullYear()}, ${escapeXml(author.name)}</rights>
  ${entries}
</feed>`;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const locale = searchParams.get("locale") || "zh-CN";

	const atomXml = generateAtomXml(locale);

	return new NextResponse(atomXml, {
		status: 200,
		headers: {
			"Content-Type": "application/atom+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
}

