"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ActionGroup,
  ArrowBackSharpIcon,
  ActionItem,
  ActionBarSpace,
  Navbar,
  Dialog,
  DialogContent,
  DialogAction,
  SearchBar,
  StatuBar,
  Button,
  ActionBar,
  ActionBarMenu,
  HomeOutlineIcon,
  CogSharpIcon,
  DialogTitle,
} from "@/components/ui";
import { useTranslations } from "next-intl";
import { ICurrentPage, ISiteConfig } from "@/types/index";

interface HeaderProps {
  siteConfig?: ISiteConfig;
  currentPage?: ICurrentPage;
  lang?: string;
  containerEle: any;
  menuItems?: any[];
}

const Header: React.FC<HeaderProps> = ({ menuItems = [] }) => {
  const router = useRouter();
  const t = useTranslations();

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var pageMenuItems: any[] = [];

  return (
    <Navbar autoClose fixed>
      <StatuBar battery={86} deviceName={t("nav.deviceName")} />
      <ActionBar>
        <ActionGroup>
          <ActionItem
            onClick={() => {
              router.push("/");
            }}
            changeFill={false}
          >
            <HomeOutlineIcon size={18} />
            <span className="whitespace-nowrap">{t("nav.homePage")}</span>
          </ActionItem>
          <ActionItem
            onClick={() => {
              router.back();
            }}
            changeFill={false}
          >
            <ArrowBackSharpIcon size={18} />
            <span className="whitespace-nowrap">{t("nav.back")}</span>
          </ActionItem>
          <ActionItem
            onClick={() => {
              router.push("/settings");
            }}
          >
            <CogSharpIcon size={18} />
            <span className="whitespace-nowrap">{t("nav.settings")}</span>
          </ActionItem>
        </ActionGroup>
        <ActionBarSpace />
        <ActionGroup>
          <SearchBar />
          <ActionBarMenu
            items={[
              ...menuItems,
              ...pageMenuItems,
              {
                textPrimary: "GitHub",
                component: "a",
                href: "https://github.com/renewang",
              },
              {
                textPrimary: "Pixiv",
                component: "a",
                href: "https://www.pixiv.net/en/users/35572742",
              },
              {
                textPrimary: "X",
                component: "a",
                href: "https://x.com/renewang",
              },
              {
                textPrimary: t("nav.about.title"),
                onClick: handleClick,
              },
            ]}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>About</DialogTitle>
            <DialogContent>
              <p>{t("nav.about.content")}</p>
            </DialogContent>
            <DialogAction>
              <Button
                variant="secondary"
                onClick={() => {
                  window.open("mailto://contact@rene.wang");
                }}
              >
                Email me
              </Button>
            </DialogAction>
          </Dialog>
        </ActionGroup>
      </ActionBar>
    </Navbar>
  );
};

export default Header;
