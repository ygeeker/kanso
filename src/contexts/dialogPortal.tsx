"use client";

import React, { createContext, useContext } from "react";
import { createPortal } from "react-dom";

interface DialogPortalContextType {
  portalRef: React.RefObject<HTMLDivElement | null>;
}

export const DialogPortalContext = createContext<DialogPortalContextType | null>(null);

export const useDialogPortal = () => {
  const context = useContext(DialogPortalContext);
  return context?.portalRef?.current || null;
};

// Portal wrapper component for dialogs
export const DialogPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const portalTarget = useDialogPortal();
  
  if (!portalTarget) {
    // Fallback: render in place if portal not available
    return <>{children}</>;
  }
  
  return createPortal(children, portalTarget);
};

