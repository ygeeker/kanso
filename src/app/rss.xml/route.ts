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

function generateRssXml(locale: string): string {
	const baseUrl = siteConfig.root;
	const title = siteConfig.title[locale as keyof typeof siteConfig.title] || siteConfig.title["en-US"];
	const description = siteConfig.description[locale as keyof typeof siteConfig.description] || siteConfig.description["en-US"];
	const author = siteConfig.author;

	const posts = getAllPosts({
		locale,
		enableSort: true,
		enableContent: true,
	});

	const items = posts
		.slice(0, 50) // Limit to 50 most recent posts
		.map((post) => {
			const postTitle = escapeXml(post.frontmatter.title || post.defaultTitle);
			const postUrl = `${baseUrl}/${locale}/p/${post.id}`;
			const pubDate = post.frontmatter.date
				? new Date(post.frontmatter.date).toUTCString()
				: new Date().toUTCString();
			const summary = escapeXml(post.frontmatter.summary || post.markdownBody?.slice(0, 200) || "");
			const category = escapeXml(post.category || "");

			return `
    <item>
      <title>${postTitle}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${summary}</description>
      ${category ? `<category>${category}</category>` : ""}
      <author>${escapeXml(author.email)} (${escapeXml(author.name)})</author>
    </item>`;
		})
		.join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js</generator>
    <copyright>All rights reserved ${new Date().getFullYear()}, ${escapeXml(author.name)}</copyright>
    ${items}
  </channel>
</rss>`;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const locale = searchParams.get("locale") || "zh-CN";

	const rssXml = generateRssXml(locale);

	return new NextResponse(rssXml, {
		status: 200,
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
}

