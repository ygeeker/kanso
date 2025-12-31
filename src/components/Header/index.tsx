"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogAction,
  SearchBar,
  Button,
  ActionBarMenu,
  DialogTitle,
  ShoppingCartIcon,
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

/**
 * Header ActionBar Component
 * Only renders the action bar content - StatusBar and Navbar wrapper are now in Layout
 */
const Header: React.FC<HeaderProps> = ({ menuItems = [] }) => {
  const router = useRouter();
  const t = useTranslations();

  const [open, setOpen] = useState<boolean>(false);
  const [cartPressed, setCartPressed] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Kindle-style invert on tap
  const buttonStyles = (pressed: boolean) => pressed
    ? {
        color: "var(--eink-paper)",
        backgroundColor: "var(--eink-ink)",
      }
    : {
        color: "var(--eink-ink)",
        backgroundColor: "transparent",
      };

  var pageMenuItems: any[] = [];

  return (
    <div className="flex items-center px-3 py-2 md:py-1.5 gap-2">
      {/* Search bar takes most of the space */}
      <SearchBar />

      {/* Shopping cart icon */}
      <button
        onClick={() => {
          window.open("https://www.ygeeker.com", "_blank");
        }}
        onMouseDown={() => setCartPressed(true)}
        onMouseUp={() => setCartPressed(false)}
        onMouseLeave={() => setCartPressed(false)}
        onTouchStart={() => setCartPressed(true)}
        onTouchEnd={() => setCartPressed(false)}
        className="p-2 rounded transition-colors duration-75 select-none"
        style={buttonStyles(cartPressed)}
      >
        <ShoppingCartIcon size={20} className="md:hidden" />
        <ShoppingCartIcon size={18} className="hidden md:block" />
      </button>

      {/* Three-dot menu dropdown */}
      <ActionBarMenu
        items={[
          {
            textPrimary: t("nav.homePage"),
            onClick: () => router.push("/"),
          },
          {
            textPrimary: t("nav.back"),
            onClick: () => router.back(),
          },
          {
            textPrimary: t("nav.settings"),
            onClick: () => router.push("/settings"),
          },
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

      {/* About dialog */}
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
    </div>
  );
};

export default Header;
