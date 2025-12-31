"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionBar } from "@/components/ui";
import {
  ArrowBackSharpIcon,
  EllipsisVerticalIcon,
} from "@/components/ui/Icons";

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
 * Standard Toolbar Props
 */
interface StandardToolbarProps {
  title: string;
  onMenuClick?: () => void;
  showBackButton?: boolean;
}

/**
 * Standard Toolbar Component - Android-style app toolbar
 * Leading: Back button + Title
 * Trailing: Three-dot menu
 */
export const StandardToolbar: React.FC<StandardToolbarProps> = ({
  title,
  onMenuClick,
  showBackButton = true,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <ActionBar>
      {/* Leading: Back button */}
      {showBackButton && (
        <ToolbarButton onClick={handleBack} title="Go back">
          <ArrowBackSharpIcon size={18} />
        </ToolbarButton>
      )}

      {/* Title - aligned to leading edge */}
      <div className="flex-1 flex items-center">
        <span
          className="text-base font-sans font-medium"
          style={{ color: "var(--eink-ink)" }}
        >
          {title}
        </span>
      </div>

      {/* Trailing: Menu button */}
      <ToolbarButton onClick={onMenuClick} title="More options">
        <EllipsisVerticalIcon size={18} />
      </ToolbarButton>
    </ActionBar>
  );
};

export default StandardToolbar;
