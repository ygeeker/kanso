"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionBar } from "@/components/ui";
import {
  ArrowBackSharpIcon,
  EllipsisVerticalIcon,
  TocIcon,
} from "@/components/ui/Icons";
import ReaderSettingsSheet from "./ReaderSettingsSheet";
import { Table2Icon } from "lucide-react";

/**
 * Reader Style Settings Icon (Aa)
 */
const TextStyleIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <text
      x="2"
      y="17"
      fontSize="14"
      fontWeight="bold"
      fill="currentColor"
      stroke="none"
    >
      A
    </text>
    <text x="12" y="17" fontSize="10" fill="currentColor" stroke="none">
      a
    </text>
  </svg>
);

/**
 * Toolbar Button Component
 */
interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  children,
  onClick,
  disabled = false,
  title,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const normalStyles = {
    color: disabled ? "var(--eink-ink-muted)" : "var(--eink-ink-secondary)",
    backgroundColor: "transparent",
  };

  const pressedStyles = {
    color: "var(--eink-paper)",
    backgroundColor: "var(--eink-ink)",
  };

  const currentStyles = isPressed && !disabled ? pressedStyles : normalStyles;

  return (
    <button
      className="flex items-center justify-center p-2 select-none disabled:cursor-not-allowed"
      style={currentStyles}
      onClick={onClick}
      disabled={disabled}
      title={title}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
};

/**
 * Reader Toolbar Props
 */
interface ReaderToolbarProps {
  title: string;
  onTocClick?: () => void;
  onMenuClick?: () => void;
}

/**
 * Reader Toolbar Component - Kindle-style reading toolbar
 */
export const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
  title,
  onTocClick,
  onMenuClick,
}) => {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleBack = () => {
    router.back();
  };

  // Truncate title if too long
  const displayTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;

  return (
    <>
      <ActionBar>
        {/* Leading: Back button and title */}
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <ToolbarButton onClick={handleBack} title="Go back">
            <ArrowBackSharpIcon size={18} />
          </ToolbarButton>

          <span
            className="text-sm font-sans truncate"
            style={{ color: "var(--eink-ink)" }}
            title={title}
          >
            {displayTitle}
          </span>
        </div>

        {/* Trailing: ToC, Settings and menu */}
        <div className="flex items-center">
          <ToolbarButton onClick={onTocClick} title="Table of contents">
            <Table2Icon size={18} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => setSettingsOpen(true)}
            title="Reader settings"
          >
            <TextStyleIcon size={20} />
          </ToolbarButton>

          <ToolbarButton onClick={onMenuClick} title="More options">
            <EllipsisVerticalIcon size={18} />
          </ToolbarButton>
        </div>
      </ActionBar>

      {/* Reader Settings Bottom Sheet */}
      <ReaderSettingsSheet
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default ReaderToolbar;
