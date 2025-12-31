"use client";

import React, { useState } from "react";

/**
 * Action Bar (navigation buttons)
 * Kindle-style navigation bar with action items
 */

interface ActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center px-2 py-1 gap-1 border-b ${className}`}
      style={{ borderColor: "var(--eink-ink-muted)" }}
    >
      {children}
    </div>
  );
};

interface ActionGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ActionGroup: React.FC<ActionGroupProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>{children}</div>
  );
};

export const ActionBarSpace: React.FC = () => <div className="flex-1" />;

interface ActionItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  changeFill?: boolean;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  children,
  className = "",
  changeFill = true,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Kindle-style invert on tap
  const normalStyles = {
    color: "var(--eink-ink-secondary)",
    backgroundColor: "transparent",
  };

  const pressedStyles = {
    color: "var(--eink-paper)",
    backgroundColor: "var(--eink-ink)",
  };

  const currentStyles = isPressed ? pressedStyles : normalStyles;

  return (
    <button
      className={`
        flex flex-col items-center justify-center
        px-2 py-1
        transition-colors duration-75
        text-xs font-sans
        min-w-[50px]
        select-none
        ${className}
      `}
      style={currentStyles}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
};

