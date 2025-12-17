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
 * Features color inversion on active/tap state like real Kindle
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  // Kindle buttons have sharp corners (no border radius)
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Base styles for all variants
  const baseClass = `
    inline-flex items-center justify-center
    font-sans font-medium
    transition-colors duration-75
    border-2
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    select-none
    ${sizeStyles[size]}
    ${className}
  `;

  // Variant-specific styles with Kindle-style invert on active
  const variantStyles = {
    primary: {
      backgroundColor: 'var(--eink-ink)',
      color: 'var(--eink-paper)',
      borderColor: 'var(--eink-ink)',
    },
    secondary: {
      backgroundColor: 'var(--eink-paper-warm)',
      color: 'var(--eink-ink)',
      borderColor: 'var(--eink-border)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--eink-ink)',
      borderColor: 'var(--eink-ink)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--eink-ink)',
      borderColor: 'transparent',
    },
  };

  const [isActive, setIsActive] = React.useState(false);

  // Inverted styles for active state
  const activeStyles = {
    backgroundColor: 'var(--eink-ink)',
    color: 'var(--eink-paper)',
    borderColor: 'var(--eink-ink)',
  };

  const currentStyles = isActive ? activeStyles : variantStyles[variant];

  return (
    <button
      className={baseClass}
      style={currentStyles}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

