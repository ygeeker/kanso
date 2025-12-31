"use client";

import React, { createContext, useContext } from "react";
import { createPortal } from "react-dom";

interface DialogPortalContextType {
  portalRef: React.RefObject<HTMLDivElement | null>;
}

export const DialogPortalContext = createContext<DialogPortalContextType>({
  portalRef: { current: null },
});

export const useDialogPortal = () => useContext(DialogPortalContext);

export const DialogPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { portalRef } = useDialogPortal();

  if (!portalRef.current) return null;

  return createPortal(children, portalRef.current);
};
