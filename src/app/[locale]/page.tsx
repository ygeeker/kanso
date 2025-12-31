import getAllPosts from "@/utils/getAllPosts";
import getCategories from "@/utils/getCategories";
import { setRequestLocale } from "next-intl/server";
import LauncherApp from "@/apps/launcher";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const allPosts = getAllPosts({
    pocessRes: {
      markdownBody: (content) =>
        `${content.substr(0, 200)}${content.length >= 200 ? "..." : ""}`,
      id: (text) => text,
    },
    enableFlat: true,
    enableSort: true,
    locale: locale,
  }).filter((post: any) => !post.frontmatter.hidden);

  const allCategories = getCategories(locale);

  return (
    <LauncherApp
      allPosts={allPosts}
      falttedPosts={allPosts}
      allCategories={allCategories}
      locale={locale}
    />
  );
}
