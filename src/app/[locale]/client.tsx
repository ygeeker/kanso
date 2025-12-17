"use client";

import React, { useMemo, useState } from "react";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  EllipsisVerticalIcon,
  Grid,
  GridItem,
  Section,
  SectionTitle,
} from "@/components/ui";
import Tab from "@/components/Tab";
import { useTranslations } from "next-intl";
import type { IPost } from "@/types/index";
import Link from "next/link";

const MAX_POST_COUNT = 15;

function PostList({
  allPosts,
  falttedPosts,
  activeCategory,
}: {
  activeCategory: string;
  allPosts: any;
  falttedPosts: IPost[];
}) {
  const classfiedPosts =
    activeCategory !== "All"
      ? falttedPosts.filter((post) => post.category === activeCategory)
      : falttedPosts;

  return (
    <>
      {classfiedPosts.slice(0, MAX_POST_COUNT).map((post) => (
        <Link key={post.id} href={"/p/" + post.id} style={{ textDecoration: "none" }}>
          <ListItem
            style={{
              cursor: "pointer",
            }}
          >
            <ListItemText
              primary={post.frontmatter ? post.frontmatter.title : post.slug}
              second={post.frontmatter ? post.frontmatter.date : "1970/01/01"}
              allowWrap
            />
            <ListItemIcon
              onClick={(e) => {
                e.preventDefault();
                console.log("Clicked");
              }}
            >
              <EllipsisVerticalIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
      ))}
    </>
  );
}

interface HomeProps {
  allPosts: any;
  falttedPosts: IPost[];
  locale: string;
  allCategories: { slug: string; config: { name: string } }[];
}

const Home = (props: HomeProps) => {
  const { allPosts, falttedPosts, locale, allCategories } = props;
  const [activeCategory, setActiveCategory] = useState("All");
  const t = useTranslations();
  const tCommon = useTranslations("common");

  const tabs = useMemo<{ name: string; text: string }[]>(
    () =>
      [{ name: "All", text: tCommon("all") }].concat(
        allCategories.map((item) => {
          return { name: item.slug, text: item.config.name };
        })
      ),
    [allCategories, tCommon]
  );

  return (
    <>
      <Section>
        <SectionTitle label={t("homePage.features")} />

        <Grid>
          <GridItem
            href="https://github.com/RiverTwilight/Awesome-Machine-Learning-Playground?tab=readme-ov-file"
            src="/image/cover/machine-learning.png"
          />
          <GridItem
            href="https://febook.rene.wang"
            src="/image/cover/febook.png"
          />
          <GridItem
            href="https://geekits.ygeeker.com"
            src="/image/cover/geekits.png"
          />
        </Grid>
      </Section>
      <Section>
        <Tab
          lang={locale}
          tabs={tabs}
          activeIndex={activeCategory}
          onChange={(index) => {
            setActiveCategory(index);
          }}
        />

        <PostList
          activeCategory={activeCategory}
          allPosts={allPosts}
          falttedPosts={falttedPosts}
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
  );
};

export default Home;
