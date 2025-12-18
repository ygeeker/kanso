"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import KindleBezel from "@/components/KindleBezel";
import { ICurrentPage, ISiteConfig } from "@/types/index";
import { ColorSchemeProvider } from "@/contexts/colorScheme";
import { DeviceSettingsProvider } from "@/contexts/deviceSettings";
import "kindle-fonts/bookerly.css";
import "kindle-fonts/amazon-ember.css";

const Layout = (props: {
  /**网站配置 */
  siteConfig?: ISiteConfig;
  /**全部文章 */
  allPosts?: ISiteConfig[];
  /** 当前页面 */
  currentPage?: ICurrentPage;
  locale?: string;
  children: React.ReactNode;
  menuItems?: any[];
}) => {
  const { currentPage, siteConfig, locale, children, menuItems = [] } = props;

  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const containerEle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Query the system preference for color scheme
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(darkMediaQuery.matches ? "dark" : "light");

    // Listen for changes in system preference
    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? "dark" : "light");
    };
    darkMediaQuery.addEventListener("change", handleChange);

    return () => darkMediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Reset scroll position when page changes
    const container = containerEle.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, [currentPage]);

  return (
    <ColorSchemeProvider value={{ colorScheme, setColorScheme }}>
      <DeviceSettingsProvider>
        {/* Device label at bottom-left of viewport */}
        <div 
          className="hidden md:block fixed bottom-4 left-4 pointer-events-none z-50"
          style={{
            fontSize: '10px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: 'rgba(80, 80, 80, 0.5)',
            lineHeight: '1.5',
          }}
        >
          <span>Kindle Oasis.</span>
          <br />
          <span>My actual device is KPW5</span>
          <br />
          <span>© 2021 Rene Wang</span>
        </div>

        <KindleBezel dark={colorScheme === "dark"}>
          <div ref={containerEle}>
            <Header
              menuItems={menuItems}
              lang={locale}
              currentPage={currentPage}
              siteConfig={siteConfig}
              containerEle={containerEle}
            />
            {/* Spacer for fixed navbar on mobile */}
            <div className="h-[88px] md:hidden" />
            <main className="min-h-[80vh] pb-8 px-4 md:px-6">
              {children}
            </main>
          </div>
        </KindleBezel>
      </DeviceSettingsProvider>
    </ColorSchemeProvider>
  );
};

export default Layout;
