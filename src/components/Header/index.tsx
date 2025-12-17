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

const Header: React.FC<HeaderProps> = ({
  siteConfig,
  menuItems = [],
  currentPage,
  lang,
}) => {
  const router = useRouter();
  const t = useTranslations();

  const [open, setOpen] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var pageMenuItems: any[] = [];

  useEffect(() => {
    if (typeof window !== 'undefined' && screen.width > 768 && window.location.pathname.match(/\/p\/.+/)) {
      const handleScroll = () => {
        const container = document.querySelector(".content");
        if (!container) return;

        const currentScrollPos = container.scrollTop;

        const visible =
          prevScrollPos > currentScrollPos || currentScrollPos < 10;
        setVisible(visible);
        setPrevScrollPos(currentScrollPos);
      };

      const container = document.querySelector(".content");
      if (container) {
        container.addEventListener("scroll", handleScroll);

        return () => {
          container.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, [prevScrollPos, currentPage]);

  if (!visible) return <div style={{ height: "84px" }}></div>;

  return (
    <Navbar autoClose fixed>
      <StatuBar
        battery={86}
        deviceName={t("nav.deviceName")}
      />
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
                textPrimary: t("nav.about"),
                onClick: handleClick,
              },
            ]}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>About</DialogTitle>
            <DialogContent>
              <p>
                Hello, I'm Rene Wang. I'm a software engineer and a designer.
                I'm a fan of technology and design. I'm a fan of technology and
                design.
              </p>
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
