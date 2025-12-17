import fs from "fs";
import path from "path";
import { globSync } from "glob";
import matter from "gray-matter";
import type { IPost } from "@/types/index";
import parseDate from "./parseDateStr";

const POSTS_DIR = path.join(process.cwd(), "posts");

interface IFileData {
	path: string;
	content: string;
}

/**
 * Get all MD files from posts directory (flat structure)
 */
function getPostFiles(locale?: string): IFileData[] {
	const pattern = locale
		? `${POSTS_DIR}/${locale}/*.md`
		: `${POSTS_DIR}/**/*.md`;

	const files = globSync(pattern, { nodir: true });

	return files.map((filePath) => ({
		path: filePath,
		content: fs.readFileSync(filePath, "utf-8"),
	}));
}

export interface GetAllPostsOption {
	pocessRes?: {
		/**文档内容处理函数 */
		markdownBody?: (content: string) => string;
		id?: (id: string) => string;
	};
	enableSort?: boolean;
	/**
	 * If true, it will return a flatten array with posts in it.
	 */
	enableFlat?: boolean;
	/**
	 * Whether include the article content in the result.
	 */
	enableContent?: boolean;
	locale?: string;
}

export default function getAllPosts(options: GetAllPostsOption): IPost[] {
	const {
		locale,
		enableContent,
		enableSort,
		pocessRes = {
			markdownBody: (content: string) => content,
			id: (content: string) => content,
		},
	} = options;

	const files = getPostFiles(locale);

	const posts: IPost[] = files.map((file) => {
		const slug = path.basename(file.path, ".md").trim();
		const id = pocessRes.id ? pocessRes.id(slug) : slug;

		const document = matter(file.content);
		const { data: frontmatter, content: markdownBody } = document;

		if (frontmatter.date) {
			frontmatter.date = parseDate(frontmatter.date).toLocaleDateString();
		}

		// Get category from frontmatter tag
		const category = frontmatter.tag || "Uncategorized";

		return {
			defaultTitle: slug,
			frontmatter,
			id,
			slug,
			markdownBody: enableContent
				? pocessRes.markdownBody
					? pocessRes.markdownBody(markdownBody)
					: markdownBody
				: "",
			locale: locale || "en-US",
			category,
		};
	}).filter(Boolean);

	if (enableSort) {
		return posts.sort((a, b) => {
			const dateA = new Date(a.frontmatter.date);
			const dateB = new Date(b.frontmatter.date);
			return dateB.getTime() - dateA.getTime();
		});
	}

	return posts;
}

/**
 * Get a single post by slug and locale
 */
export function getPostBySlug(slug: string, locale: string): { frontmatter: any; content: string } | null {
	const filePath = path.join(POSTS_DIR, locale, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const content = fs.readFileSync(filePath, "utf-8");
	const document = matter(content);

	return {
		frontmatter: document.data,
		content: document.content,
	};
}

/**
 * Get all post slugs for static path generation
 */
export function getAllPostSlugs(locale?: string): { slug: string; locale: string }[] {
	const files = getPostFiles(locale);

	return files.map((file) => {
		const relativePath = path.relative(POSTS_DIR, file.path);
		const parts = relativePath.split(path.sep);
		const fileLocale = parts[0];
		const slug = path.basename(file.path, ".md");

		return {
			slug,
			locale: fileLocale,
		};
	});
}
