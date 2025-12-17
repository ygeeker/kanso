"use client";

import React from "react";

/**
 * Kindle-style List Components
 * Clean list styling that matches the E-ink aesthetic
 */

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({ className = "", children, ...props }) => {
  return (
    <ul
      className={`
        divide-y divide-[var(--eink-divider)]
        ${className}
      `}
      {...props}
    >
      {children}
    </ul>
  );
};

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ 
  className = "", 
  children,
  ...props 
}) => {
  return (
    <li
      className={`
        flex items-center justify-between
        py-3 px-2
        hover:bg-[var(--eink-paper-warm)]
        transition-colors duration-150
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </li>
  );
};

interface ListItemTextProps {
  primary: string;
  second?: string;
  allowWrap?: boolean;
  className?: string;
}

export const ListItemText: React.FC<ListItemTextProps> = ({
  primary,
  second,
  allowWrap = false,
  className = "",
}) => {
  return (
    <div className={`flex-1 min-w-0 ${className}`}>
      <p
        className={`
          text-base font-sans font-medium
          ${allowWrap ? "" : "truncate"}
        `}
        style={{ color: 'var(--eink-ink)' }}
      >
        {primary}
      </p>
      {second && (
        <p 
          className="text-sm mt-0.5"
          style={{ color: 'var(--eink-ink-muted)' }}
        >
          {second}
        </p>
      )}
    </div>
  );
};

interface ListItemIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ListItemIcon: React.FC<ListItemIconProps> = ({
  className = "",
  children,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`
        flex-shrink-0 ml-3
        p-1.5 rounded
        text-[var(--eink-ink-tertiary)]
        hover:bg-[var(--eink-paper-highlight)]
        hover:text-[var(--eink-ink)]
        transition-colors duration-150
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

