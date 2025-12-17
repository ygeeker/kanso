"use client";

import React from "react";
import { ChevronRightIcon } from "./Icons";
import Link from "next/link";

/**
 * Kindle-style Section Components
 * Content sections with titles and grid layouts
 */

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ 
  className = "", 
  children, 
  ...props 
}) => {
  return (
    <section
      className={`
        py-4
        ${className}
      `}
      {...props}
    >
      {children}
    </section>
  );
};

interface SectionTitleProps {
  label: string;
  href?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  label,
  href,
  className = "",
}) => {
  const content = (
    <div className="flex items-center gap-1">
      <span 
        className="uppercase tracking-wider text-sm font-sans font-semibold"
        style={{ color: 'var(--eink-ink)' }}
      >
        {label}
      </span>
      {href && <ChevronRightIcon size={16} style={{ color: 'var(--eink-ink-muted)' }} />}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={`block mb-3 hover:opacity-80 transition-opacity ${className}`}>
        {content}
      </Link>
    );
  }

  return <div className={`mb-3 ${className}`}>{content}</div>;
};

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
}

export const Grid: React.FC<GridProps> = ({ 
  className = "", 
  children, 
  cols = 3,
  ...props 
}) => {
  const colsClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div
      className={`
        grid ${colsClass[cols]} gap-3
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  href?: string;
  src: string;
  alt?: string;
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  href,
  src,
  alt = "grid item",
  className = "",
}) => {
  const imageContent = (
    <div
      className={`
        relative aspect-[3/4]
        overflow-hidden rounded
        bg-[var(--eink-paper-warm)]
        border border-[var(--eink-divider)]
        hover:border-[var(--eink-border)]
        transition-all duration-200
        hover:shadow-sm
        ${className}
      `}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {imageContent}
      </Link>
    );
  }

  return imageContent;
};

