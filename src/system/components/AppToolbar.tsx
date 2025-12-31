"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { customToolbarAtom } from "@/system/atoms/toolbar";
import StandardToolbar from "./StandardToolbar";
import ReaderToolbar from "@/apps/book-reader/components/ReaderToolbar";

type ToolbarType = "standard" | "reader" | "browser" | "none";

interface BaseToolbarProps {
  type: ToolbarType;
}

interface StandardToolbarProps extends BaseToolbarProps {
  type: "standard";
  title: string;
  onMenuClick?: () => void;
  showBackButton?: boolean;
}

interface ReaderToolbarProps extends BaseToolbarProps {
  type: "reader";
  title: string;
  onTocClick?: () => void;
  onMenuClick?: () => void;
}

interface BrowserToolbarProps extends BaseToolbarProps {
  type: "browser";
  // Browser toolbar is managed internally by browser app
}

interface NoneToolbarProps extends BaseToolbarProps {
  type: "none";
}

type AppToolbarProps = StandardToolbarProps | ReaderToolbarProps | BrowserToolbarProps | NoneToolbarProps;

/**
 * AppToolbar - Declarative toolbar component for apps
 *
 * Usage:
 * ```tsx
 * <AppToolbar type="standard" title="Settings" />
 * <AppToolbar type="reader" title="Article Title" />
 * <AppToolbar type="none" /> // Uses default search header
 * ```
 */
export function AppToolbar(props: AppToolbarProps) {
  const setCustomToolbar = useSetAtom(customToolbarAtom);

  useEffect(() => {
    if (props.type === "none") {
      // Use default header (search bar for launcher)
      setCustomToolbar(null);
      return;
    }

    if (props.type === "standard") {
      setCustomToolbar(
        <StandardToolbar
          title={props.title}
          onMenuClick={props.onMenuClick}
          showBackButton={props.showBackButton}
        />
      );
    } else if (props.type === "reader") {
      setCustomToolbar(
        <ReaderToolbar
          title={props.title}
          onTocClick={props.onTocClick}
          onMenuClick={props.onMenuClick}
        />
      );
    }
    // Browser toolbar is handled internally by browser app component

    return () => {
      setCustomToolbar(null);
    };
  }, [props.type, ...(props.type === "standard" ? [props.title] : props.type === "reader" ? [props.title] : [])]);

  return null; // This component doesn't render anything
}

export default AppToolbar;
