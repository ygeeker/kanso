"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

/**
 * Kindle-style Button
 * Clean, minimal buttons that match the E-ink aesthetic
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-sans font-medium
    transition-all duration-150
    border-2
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--eink-ink-muted)]
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const variantStyles = {
    primary: `
      bg-[var(--eink-ink)] text-[var(--eink-paper)]
      border-[var(--eink-ink)]
      hover:bg-[var(--eink-ink-secondary)]
    `,
    secondary: `
      bg-[var(--eink-paper-warm)] text-[var(--eink-ink)]
      border-[var(--eink-border)]
      hover:bg-[var(--eink-divider)]
    `,
    outline: `
      bg-transparent text-[var(--eink-ink)]
      border-[var(--eink-ink)]
      hover:bg-[var(--eink-paper-warm)]
    `,
    ghost: `
      bg-transparent text-[var(--eink-ink)]
      border-transparent
      hover:bg-[var(--eink-paper-warm)]
    `,
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 text-base rounded-md",
    lg: "px-6 py-3 text-lg rounded-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

