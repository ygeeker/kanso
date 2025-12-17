"use client";

import React, { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";

/**
 * Kindle-style Dialog Components
 * Modal dialogs that match the E-ink aesthetic
 */

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40
        animate-fadeIn
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="
          relative
          w-full max-w-md mx-4
          bg-[var(--eink-paper)]
          border border-[var(--eink-border)]
          rounded-lg
          shadow-lg
          animate-slideUp
        "
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            p-1
            text-[var(--eink-ink-muted)]
            hover:text-[var(--eink-ink)]
            hover:bg-[var(--eink-paper-warm)]
            rounded
            transition-colors duration-150
          "
          aria-label="Close dialog"
        >
          <CloseIcon size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <h2
      className={`
        px-5 pt-5 pb-2
        text-lg font-sans font-semibold
        text-[var(--eink-ink)]
        ${className}
      `}
    >
      {children}
    </h2>
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div
      className={`
        px-5 py-3
        text-sm font-serif
        text-[var(--eink-ink-secondary)]
        leading-relaxed
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface DialogActionProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogAction: React.FC<DialogActionProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div
      className={`
        px-5 py-4
        flex items-center justify-end gap-3
        border-t border-[var(--eink-divider)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

