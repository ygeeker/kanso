"use client";

import React, { useState } from "react";

/**
 * Kindle-style Tab Components
 * Minimal tab navigation that matches the E-ink aesthetic
 * Features color inversion on active/tap state like real Kindle
 */

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`
        flex items-center gap-1
        pb-2 mb-4
        overflow-x-auto
        scrollbar-thin
        ${className}
      `}
      style={{ borderBottom: '1px solid var(--eink-divider)' }}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};

interface TabItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({
  active = false,
  className = "",
  children,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Kindle-style invert on tap
  const normalStyles = {
    color: active ? 'var(--eink-ink)' : 'var(--eink-ink-muted)',
    backgroundColor: 'transparent',
    borderBottomColor: active ? 'var(--eink-ink)' : 'transparent',
  };

  const pressedStyles = {
    color: 'var(--eink-paper)',
    backgroundColor: 'var(--eink-ink)',
    borderBottomColor: 'var(--eink-ink)',
  };

  const currentStyles = isPressed ? pressedStyles : normalStyles;

  return (
    <button
      role="tab"
      aria-selected={active}
      className={`
        px-3 py-1.5
        text-sm font-sans font-medium
        whitespace-nowrap
        transition-colors duration-75
        select-none
        ${className}
      `}
      style={{
        ...currentStyles,
        borderBottom: active ? '2px solid var(--eink-ink)' : '2px solid transparent',
      }}
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

