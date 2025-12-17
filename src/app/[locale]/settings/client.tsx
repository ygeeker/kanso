"use client";

import { TLocale } from "@/types/index";
import { List, ListItem, ListItemText } from "@/components/ui";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface HomePageProps {
  locale: TLocale;
}

const SettingsPage = (props: HomePageProps) => {
  const t = useTranslations("settingsPage");

  return (
    <>
      <div>
        <List>
          <ListItem>
            <ListItemText primary={t("exportPosts")} />
          </ListItem>
          <Link href="/rss/feed.xml">
            <ListItem>
              <ListItemText primary="XML" />
            </ListItem>
          </Link>

          <ListItem>
            <ListItemText primary={t("openSource")} />
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default SettingsPage;
