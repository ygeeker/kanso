"use client";

import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Kindle Typography Container
 * Provides consistent typography styling for article content
 */
export const Typography: React.FC<TypographyProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`
        font-serif
        text-[var(--eink-ink)]
        leading-relaxed
        
        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6
        [&_h1]:font-sans [&_h1]:tracking-tight
        
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5
        [&_h2]:font-sans [&_h2]:tracking-tight
        [&_h2]:border-b [&_h2]:border-[var(--eink-divider)] [&_h2]:pb-2
        
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
        [&_h3]:font-sans
        
        [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7
        
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
        [&_li]:text-base [&_li]:leading-7
        
        [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--eink-border)]
        [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4
        [&_blockquote]:bg-[var(--eink-paper-warm)] [&_blockquote]:italic
        [&_blockquote]:text-[var(--eink-ink-secondary)]
        
        [&_a]:underline [&_a]:underline-offset-2
        [&_a]:decoration-[var(--eink-ink-tertiary)]
        [&_a:hover]:decoration-[var(--eink-ink)]
        
        [&_hr]:border-[var(--eink-divider)] [&_hr]:my-8
        
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
        [&_th]:border [&_th]:border-[var(--eink-border)] [&_th]:p-2 [&_th]:bg-[var(--eink-paper-warm)]
        [&_td]:border [&_td]:border-[var(--eink-border)] [&_td]:p-2
        
        [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4
        
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Typography;

