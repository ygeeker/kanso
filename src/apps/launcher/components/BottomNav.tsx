"use client";

import { useContext } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DialogPortalContext } from "@/system/contexts/dialogPortal";

interface BottomNavProps {
  locale: string;
}

export default function BottomNav({ locale }: BottomNavProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "home";
  const portalContext = useContext(DialogPortalContext);

  const tabs = [
    { id: "home", label: "Home" },
    { id: "library", label: "Library" },
  ];

  const navContent = (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full border-t pointer-events-auto"
      style={{
        borderColor: "var(--eink-ink-muted)",
        backgroundColor: "var(--eink-paper)",
        zIndex: 40,
      }}
    >
      <div className="flex items-center justify-around h-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={`/${locale}?tab=${tab.id}`}
              className="flex-1 flex flex-col items-center justify-center h-full gap-1"
            >
              <span
                className="text-sm font-sans"
                style={{
                  color: isActive
                    ? "var(--eink-ink)"
                    : "var(--eink-ink-secondary)",
                }}
              >
                {tab.label}
              </span>
              <div
                className="h-0.5 w-12"
                style={{
                  backgroundColor: isActive ? "var(--eink-ink)" : "transparent",
                }}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );

  // Use portal to render outside scrollable container
  if (portalContext?.portalRef?.current) {
    return createPortal(navContent, portalContext.portalRef.current);
  }

  // Fallback for when portal is not available
  return navContent;
}
