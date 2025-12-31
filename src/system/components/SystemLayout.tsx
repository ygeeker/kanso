"use client";

import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { colorSchemeAtom } from "@/system/atoms/colorScheme";
import { customToolbarAtom } from "@/system/atoms/toolbar";
import KindleBezel from "./KindleBezel";
import { Navbar, StatuBar } from "@/components/ui";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";

interface SystemLayoutProps {
  children: React.ReactNode;
  locale: string;
  menuItems?: any[];
}

export default function SystemLayout({
  children,
  locale,
  menuItems = [],
}: SystemLayoutProps) {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);
  const [customToolbar] = useAtom(customToolbarAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  // System preference detection
  useEffect(() => {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(darkMediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? "dark" : "light");
    };

    darkMediaQuery.addEventListener("change", handleChange);
    return () => darkMediaQuery.removeEventListener("change", handleChange);
  }, [setColorScheme]);

  const hasCustomToolbar = customToolbar !== null;

  return (
    <>
      {/* Device label at bottom-left */}
      <div
        className="hidden md:block fixed bottom-4 left-4 pointer-events-none z-50"
        style={{
          fontSize: "10px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "rgba(80, 80, 80, 0.5)",
          lineHeight: "1.5",
        }}
      >
        <span>Kindle Oasis.</span>
        <br />
        <span>My actual device is KPW5</span>
        <br />
        <span>© 2021 Rene Wang</span>
      </div>

      <KindleBezel dark={colorScheme === "dark"}>
        <div
          ref={containerRef}
          className={hasCustomToolbar ? "flex flex-col h-full" : ""}
        >
          <Navbar autoClose fixed>
            <StatuBar battery={86} deviceName={t("nav.deviceName")} />
            {customToolbar || (
              <Header
                menuItems={menuItems}
                lang={locale}
                containerEle={containerRef}
              />
            )}
          </Navbar>

          <div className="h-[88px] md:hidden shrink-0" />

          <main
            className={
              hasCustomToolbar
                ? "flex-1 overflow-y-auto relative"
                : "min-h-[80vh] pb-8 px-4 md:px-6"
            }
          >
            {children}
          </main>
        </div>
      </KindleBezel>
    </>
  );
}
