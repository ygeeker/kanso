import React from "react";
import getAllPosts from "@/utils/getAllPosts";
import type { TLocale } from "@/types/index";
import { setRequestLocale } from "next-intl/server";
import CatalogApp from "@/apps/catalog";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ArchivePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const allPosts = getAllPosts({
    enableFlat: true,
    locale: locale,
  });

  return (
    <CatalogApp
      allPosts={allPosts}
      flattedPosts={allPosts}
      locale={locale}
    />
  );
}
