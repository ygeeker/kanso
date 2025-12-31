"use client";

import { useMemo } from "react";
import { useAtom } from "jotai";
import { activeCategoryAtom } from "./atoms";
import {
  Button,
  Grid,
  GridItem,
  Section,
  SectionTitle,
} from "@/components/ui";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import type { IPost } from "@/types/index";
import Link from "next/link";
import CategoryLabel from "./components/CategoryLabel";
import PostList from "./components/PostList";
import BottomNav from "./components/BottomNav";
import AppToolbar from "@/system/components/AppToolbar";

interface LauncherAppProps {
  allPosts: any;
  falttedPosts: IPost[];
  locale: string;
  allCategories: { slug: string; config: { name: string } }[];
}

export default function LauncherApp(props: LauncherAppProps) {
  const { allPosts, falttedPosts, locale, allCategories } = props;
  const [activeCategory, setActiveCategory] = useAtom(activeCategoryAtom);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "home";
  const t = useTranslations();
  const tCommon = useTranslations("common");
  const tCategories = useTranslations("categories");

  const categoryLabels = useMemo<{ name: string; text: string }[]>(
    () =>
      [{ name: "All", text: tCommon("all") }].concat(
        allCategories.map((item) => {
          // Use translated name if available, fallback to slug
          const translatedName = tCategories.has(item.slug)
            ? tCategories(item.slug)
            : item.slug;
          return { name: item.slug, text: translatedName };
        })
      ),
    [allCategories, tCategories, tCommon]
  );

  return (
    <>
      <AppToolbar type="none" />
      <div className="pb-16">
        {activeTab === "home" && (
          <>
            <Section>
              <SectionTitle label={t("homePage.features")} showArrow />

              <Grid>
                <GridItem
                  href={`/${locale}/browser?url=${encodeURIComponent("https://github.com/RiverTwilight/Awesome-Machine-Learning-Playground?tab=readme-ov-file")}`}
                  src="/image/cover/machine-learning.png"
                />
                <GridItem
                  href={`/${locale}/browser?url=${encodeURIComponent("https://febook.rene.wang")}`}
                  src="/image/cover/febook.png"
                />
                <GridItem
                  href={`/${locale}/browser?url=${encodeURIComponent("https://geekits.ygeeker.com")}`}
                  src="/image/cover/geekits.png"
                />
              </Grid>
            </Section>
            <Section>
              <div className="flex flex-wrap gap-2 mb-4">
                {categoryLabels.map((category) => (
                  <CategoryLabel
                    key={category.name}
                    text={category.text}
                    selected={activeCategory === category.name}
                    onClick={() => setActiveCategory(category.name)}
                  />
                ))}
              </div>

              <PostList
                activeCategory={activeCategory}
                allPosts={allPosts}
                falttedPosts={falttedPosts}
                locale={locale}
              />

              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link href="/archive">
                  <Button variant="outline">
                    {t("postList.allPosts", { count: falttedPosts.length })}
                  </Button>
                </Link>
              </div>
            </Section>
          </>
        )}

        {activeTab === "library" && (
          <Section>
            <div className="flex items-center justify-center min-h-[60vh]">
              <p
                className="text-center"
                style={{ color: "var(--eink-ink-muted)" }}
              >
                Library - Coming Soon
              </p>
            </div>
          </Section>
        )}
      </div>
      <BottomNav locale={locale} />
    </>
  );
}
