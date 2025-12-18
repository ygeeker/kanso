import fs from "fs";
import path from "path";
import { globSync } from "glob";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");

export interface ICategory {
	slug: string;
	config: {
		name?: string;
		description?: string;
	};
}

/**
 * Get all categories for a locale by reading tags from post frontmatter
 */
function getCategories(locale: string): ICategory[] {
	const pattern = `${POSTS_DIR}/${locale}/*.mdx`;
	const files = globSync(pattern, { nodir: true });

	const categorySet = new Map<string, ICategory>();

	files.forEach((filePath) => {
		const content = fs.readFileSync(filePath, "utf-8");
		const { data: frontmatter } = matter(content);

		const tag = frontmatter.tag;
		if (tag && !categorySet.has(tag)) {
			categorySet.set(tag, {
				slug: tag,
				config: {
					name: tag,
					description: "",
				},
			});
		}
	});

	return Array.from(categorySet.values());
}

export default getCategories;
