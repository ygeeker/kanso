"use client";

import React, { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";
import { DialogPortal } from "@/contexts/dialogPortal";

/**
 * Kindle-style Dialog Components
 * Modal dialogs that match the E-ink aesthetic
 * Dialogs are portaled to the screen level for proper centering within Kindle bezel
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
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const dialogContent = (
    <div
      className="
        absolute inset-0
        flex items-center justify-center
      "
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="
          relative
          w-[90%] max-w-sm
        "
        style={{
          backgroundColor: 'var(--eink-paper)',
          border: '1px solid var(--eink-border)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            p-1
            select-none
          "
          style={{
            color: 'var(--eink-ink-muted)',
          }}
          aria-label="Close dialog"
        >
          <CloseIcon size={18} />
        </button>
        {children}
      </div>
    </div>
  );

  return <DialogPortal>{dialogContent}</DialogPortal>;
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

