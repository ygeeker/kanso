import {
  ListItem,
  ListItemIcon,
  ListItemText,
  EllipsisVerticalIcon,
} from "@/components/ui";
import type { IPost } from "@/types/index";
import Link from "next/link";

const MAX_POST_COUNT = 25;

export default function PostList({
  allPosts,
  falttedPosts,
  activeCategory,
  locale,
}: {
  activeCategory: string;
  allPosts: any;
  falttedPosts: IPost[];
  locale: string;
}) {
  const classfiedPosts =
    activeCategory === "All"
      ? falttedPosts
      : falttedPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      {classfiedPosts.slice(0, MAX_POST_COUNT).map((post) => (
        <Link locale={locale} key={post.id} href={"/p/" + post.id} style={{ textDecoration: "none" }}>
          <ListItem
            style={{
              cursor: "pointer",
            }}
          >
            <ListItemText
              primary={post.frontmatter ? post.frontmatter.title : post.slug}
              second={post.frontmatter ? post.frontmatter.createAt : "1970/01/01"}
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
