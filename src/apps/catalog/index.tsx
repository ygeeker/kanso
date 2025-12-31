"use client";

import { useMemo } from "react";
import { Typography } from "@/components/ui";
import { sortByDate } from "@/utils/sortPosts";
import Link from "next/link";
import { useTranslations } from "next-intl";
import AppToolbar from "@/system/components/AppToolbar";

const groupByYear = (posts: any[]) => {
  return posts.reduce((acc, post) => {
    const year = new Date(post.frontmatter.createAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, any[]>);
};

interface CatalogAppProps {
  allPosts: any[];
  flattedPosts: any[];
  locale: string;
}

export default function CatalogApp({
  allPosts,
  flattedPosts,
  locale,
}: CatalogAppProps) {
  const t = useTranslations("archivePage");

  const sortedPosts = useMemo(() => sortByDate(flattedPosts), [flattedPosts]);
  const postsByYear = useMemo(() => groupByYear(sortedPosts), [sortedPosts]);
  const sortedYears = useMemo(
    () => Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a)),
    [postsByYear]
  );

  const locales = [
    { localeString: "简体中文", routeName: "zh" },
    { localeString: "English", routeName: "en" },
  ];

  const localeLinks = locales
    .map((l) => {
      if (l.routeName === locale) {
        return <span key={l.routeName}>{l.localeString}</span>;
      }
      return (
        <Link href={`/${l.routeName}/archive`} key={l.routeName}>
          {l.localeString}
        </Link>
      );
    })
    .reduce(
      (prev, curr, idx) => (idx === 0 ? [curr] : [...prev, " | ", curr]),
      [] as React.ReactNode[]
    );

  return (
    <>
      <AppToolbar
        type="standard"
        title="Archive"
        onMenuClick={() => console.log("Menu clicked")}
      />
      <div className="px-4 md:px-6 pb-8">
        <Typography>
          <h1>{t("title")}</h1>
        <p>{localeLinks}</p>
        {sortedYears.map((year) => (
          <div key={year}>
            <h2>{year}</h2>
            <ul>
              {postsByYear[year].map((post: any) => (
                <li key={post.id}>
                  <Link href={"/p/" + post.id}>
                    {post.frontmatter.title || post.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </Typography>
      </div>
    </>
  );
}
