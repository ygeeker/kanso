"use client";

import React from "react";

/**
 * Kindle-style Tab Components
 * Minimal tab navigation that matches the E-ink aesthetic
 */

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`
        flex items-center gap-1
        border-b border-[var(--eink-divider)]
        pb-2 mb-4
        overflow-x-auto
        scrollbar-thin
        ${className}
      `}
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
  return (
    <button
      role="tab"
      aria-selected={active}
      className={`
        px-3 py-1.5
        text-sm font-sans font-medium
        whitespace-nowrap
        transition-all duration-150
        border-b-2
        ${className}
      `}
      style={{
        color: active ? 'var(--eink-ink)' : 'var(--eink-ink-muted)',
        borderBottomColor: active ? 'var(--eink-ink)' : 'transparent',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

