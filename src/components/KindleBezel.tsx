"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DialogPortalContext } from "@/contexts/dialogPortal";

interface KindleBezelProps {
  children: React.ReactNode;
  dark?: boolean;
}

/**
 * KindleBezel - Kindle Oasis device frame
 *
 * Accurate recreation of Amazon Kindle Oasis design:
 * - Asymmetric ergonomic grip on the right
 * - Two thin elongated page-turn buttons
 * - Sharp-cornered screen (no border radius)
 * - Raised/beveled edge frame
 * - Graphite metallic finish
 * - Responsive: bezel on desktop/tablet, full screen on mobile
 */

const KindleBezel: React.FC<KindleBezelProps> = ({
  children,
  dark = false,
}) => {
  const desktopPortalRef = useRef<HTMLDivElement>(null);
  const mobilePortalRef = useRef<HTMLDivElement>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset scroll position to 0 when route changes
  useEffect(() => {
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className={dark ? "dark" : ""} data-theme={dark ? "dark" : "light"}>
      {/* Desktop/Tablet: Show Kindle Oasis frame */}
      <div
        className="hidden md:flex items-center justify-center min-h-screen py-4 px-4"
        style={{
          background: `linear-gradient(145deg, var(--device-bg-gradient-start) 0%, var(--device-bg-gradient-end) 100%)`,
        }}
      >
        {/* Kindle Oasis device body */}
        <div
          className="relative flex rounded-[20px] lg:rounded-l-[20px] lg:rounded-r-[24px]"
          style={{
            maxHeight: "calc(100vh - 4rem)",
            // Optimized shadow using box-shadow instead of filter for better performance
            // Realistic shadow: light from top-left, shadow cast to bottom-right
            boxShadow: `
              1px 1px 1px rgba(0,0,0,0.08),
              2px 3px 2px rgba(0,0,0,0.08),
              4px 6px 4px rgba(0,0,0,0.07),
              8px 12px 8px rgba(0,0,0,0.06),
              12px 20px 16px rgba(0,0,0,0.05),
              16px 28px 24px rgba(0,0,0,0.04)`,
            // Force GPU layer for the entire device
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
          }}
        >
          {/* Outer raised edge frame - creates the beveled edge effect */}
          <div
            className="absolute inset-0 rounded-[20px] lg:rounded-l-[20px] lg:rounded-r-[24px] pointer-events-none"
            style={{
              background: `linear-gradient(145deg,
                rgba(255,255,255,0.12) 0%,
                rgba(255,255,255,0.05) 30%,
                transparent 50%,
                rgba(0,0,0,0.1) 80%,
                rgba(0,0,0,0.15) 100%)`,
              boxShadow: `
                inset 0 1px 2px rgba(255,255,255,0.1),
                inset 0 -1px 2px rgba(0,0,0,0.2)`,
              // Promote to GPU layer
              transform: "translate3d(0, 0, 0)",
              willChange: "transform",
            }}
          />

          {/* Main body with screen */}
          <div
            className="relative flex"
            style={{
              background: `linear-gradient(180deg,
                var(--bezel-body-light) 0%,
                var(--bezel-body) 15%,
                var(--bezel-body) 85%,
                var(--bezel-body-dark) 100%)`,
              borderRadius: "18px 0 0 18px",
              // Inner raised edge effect
              boxShadow: `
                inset 2px 0 4px rgba(255,255,255,0.06),
                inset 0 2px 4px rgba(255,255,255,0.08),
                inset 0 -2px 4px rgba(0,0,0,0.12),
                inset -1px 0 2px rgba(0,0,0,0.05)`,
              // Promote to GPU layer
              transform: "translate3d(0, 0, 0)",
              willChange: "transform",
            }}
          >
            {/* Add full radius when grip is hidden on smaller screens */}
            <div
              className="lg:hidden absolute inset-0 rounded-[18px] pointer-events-none"
              style={{
                background: "inherit",
                boxShadow: `
                  inset 2px 0 4px rgba(255,255,255,0.06),
                  inset 0 2px 4px rgba(255,255,255,0.08),
                  inset 0 -2px 4px rgba(0,0,0,0.12),
                  inset -2px 0 4px rgba(255,255,255,0.06)`,
              }}
            />

            {/* Top edge highlight - raised bevel */}
            <div
              className="absolute top-0 left-4 right-4 h-[2px] rounded-full"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.15) 20%, 
                  rgba(255,255,255,0.2) 50%,
                  rgba(255,255,255,0.15) 80%, 
                  transparent 100%)`,
              }}
            />

            {/* Left edge highlight */}
            <div
              className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
              style={{
                background: `linear-gradient(180deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.1) 20%, 
                  rgba(255,255,255,0.12) 50%,
                  rgba(255,255,255,0.1) 80%, 
                  transparent 100%)`,
              }}
            />

            {/* Bottom edge shadow - raised bevel */}
            <div
              className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(0,0,0,0.15) 20%, 
                  rgba(0,0,0,0.2) 50%,
                  rgba(0,0,0,0.15) 80%, 
                  transparent 100%)`,
              }}
            />

            {/* Screen area with bezel padding */}
            <div className="relative m-6 lg:m-7 lg:mr-6">
              {/* Screen inset - recessed effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `
                    inset 0 0 0 1px var(--bezel-screen-border),
                    inset 0 2px 8px rgba(0,0,0,0.25),
                    inset 2px 0 6px rgba(0,0,0,0.15),
                    inset -2px 0 6px rgba(0,0,0,0.15),
                    inset 0 -2px 6px rgba(0,0,0,0.2)`,
                  // Promote to GPU layer
                  transform: "translate3d(0, 0, 0)",
                  willChange: "transform",
                }}
              />

              {/* Screen container - NO border radius */}
              {/* Real Kindle dimensions: 159mm × 141mm = aspect ratio ~1.128:1 */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: "min(720px, calc(100vh - 11rem))",
                  width: "min(576px, calc((100vh - 11rem) * 0.8))",
                  minWidth: "320px",
                  // Create isolated stacking context for the screen
                  isolation: "isolate",
                  // Force GPU layer for entire screen container
                  transform: "translate3d(0, 0, 0)",
                  // Containment to prevent reflow affecting parent elements
                  contain: "layout style",
                }}
              >
                {/* Dialog portal target */}
                <div
                  ref={desktopPortalRef}
                  className="absolute inset-0 z-50 pointer-events-none [&>*]:pointer-events-auto"
                />

                {/* Content area - scrollable */}
                <DialogPortalContext.Provider
                  value={{ portalRef: desktopPortalRef }}
                >
                  <div
                    ref={scrollableContentRef}
                    className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-thin"
                    style={{
                      backgroundColor: "var(--eink-paper)",
                      color: "var(--eink-ink)",
                      // GPU acceleration for smooth scrolling
                      transform: "translate3d(0, 0, 0)",
                      backfaceVisibility: "hidden",
                      willChange: "scroll-position",
                      // Disable overscroll bounce effect
                      overscrollBehavior: "none",
                      // Disable iOS momentum scrolling to prevent bounce
                      WebkitOverflowScrolling: "auto",
                      // CSS containment - isolate this scroll container from the rest of the page
                      // This prevents layout/paint recalculation of parent elements during scroll
                      contain: "layout paint style",
                    }}
                  >
                    {children}
                  </div>
                </DialogPortalContext.Provider>

                {/* Static overlays - BELOW scroll content in DOM but visually above via z-index */}
                {/* These won't repaint during scroll because they're in a separate layer */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    // Subtle vignette effect
                    boxShadow: "inset 0 0 30px rgba(0,0,0,0.02)",
                    // Force GPU layer so it doesn't affect scroll performance
                    transform: "translate3d(0, 0, 0)",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right ergonomic grip - Oasis signature asymmetric design */}
          <div
            className="hidden lg:flex relative shrink-0"
            style={{
              width: "80px",
              background: `linear-gradient(180deg,
                var(--bezel-body-light) 0%,
                var(--bezel-grip) 15%,
                var(--bezel-grip) 85%,
                var(--bezel-body-dark) 100%)`,
              borderRadius: "0 22px 22px 0",
              // Raised edge effect on grip
              boxShadow: `
                inset -2px 0 4px rgba(255,255,255,0.08),
                inset 0 2px 4px rgba(255,255,255,0.06),
                inset 0 -2px 4px rgba(0,0,0,0.15)`,
              // Promote to GPU layer
              transform: "translate3d(0, 0, 0)",
              willChange: "transform",
            }}
          >
            {/* Grip top highlight */}
            <div
              className="absolute top-0 left-0 right-4 h-[2px]"
              style={{
                background: `linear-gradient(90deg, 
                  rgba(255,255,255,0.1) 0%, 
                  rgba(255,255,255,0.15) 50%,
                  transparent 100%)`,
              }}
            />

            {/* Right edge highlight - raised bevel */}
            <div
              className="absolute top-6 bottom-6 right-0 w-[2px] rounded-full"
              style={{
                background: `linear-gradient(180deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.12) 20%, 
                  rgba(255,255,255,0.15) 50%,
                  rgba(255,255,255,0.12) 80%, 
                  transparent 100%)`,
              }}
            />

            {/* Grip bottom shadow */}
            <div
              className="absolute bottom-0 left-0 right-4 h-[2px]"
              style={{
                background: `linear-gradient(90deg, 
                  rgba(0,0,0,0.15) 0%, 
                  rgba(0,0,0,0.2) 50%,
                  transparent 100%)`,
              }}
            />

            {/* Page turn buttons container - thin elongated bars */}
            <div className="relative flex flex-col items-center justify-center w-full gap-3 py-12">
              {/* Page back button (top) - thin long bar */}
              <button
                className="relative cursor-pointer active:opacity-80"
                style={{
                  width: "8px",
                  height: "72px",
                  background: `linear-gradient(90deg, 
                    var(--bezel-button) 0%, 
                    var(--bezel-button-edge) 50%,
                    var(--bezel-button) 100%)`,
                  borderRadius: "4px",
                  boxShadow: `
                    inset 1px 0 0 rgba(255,255,255,0.1),
                    inset -1px 0 2px rgba(0,0,0,0.3),
                    inset 0 1px 1px rgba(255,255,255,0.05),
                    inset 0 -1px 2px rgba(0,0,0,0.2),
                    0 0 4px rgba(0,0,0,0.15)`,
                }}
                title="Previous Page"
                aria-label="Previous Page"
              />

              {/* Page forward button (bottom) - thin long bar */}
              <button
                className="relative cursor-pointer active:opacity-80"
                style={{
                  width: "8px",
                  height: "72px",
                  background: `linear-gradient(90deg, 
                    var(--bezel-button) 0%, 
                    var(--bezel-button-edge) 50%,
                    var(--bezel-button) 100%)`,
                  borderRadius: "4px",
                  boxShadow: `
                    inset 1px 0 0 rgba(255,255,255,0.1),
                    inset -1px 0 2px rgba(0,0,0,0.3),
                    inset 0 1px 1px rgba(255,255,255,0.05),
                    inset 0 -1px 2px rgba(0,0,0,0.2),
                    0 0 4px rgba(0,0,0,0.15)`,
                }}
                title="Next Page"
                aria-label="Next Page"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full screen without bezel */}
      <div
        className="md:hidden min-h-screen relative"
        style={{
          backgroundColor: "var(--eink-paper)",
          color: "var(--eink-ink)",
        }}
      >
        {/* Dialog portal target for mobile */}
        <div
          ref={mobilePortalRef}
          className="fixed inset-0 z-50 pointer-events-none [&>*]:pointer-events-auto"
        />
        <DialogPortalContext.Provider value={{ portalRef: mobilePortalRef }}>
          {children}
        </DialogPortalContext.Provider>
      </div>
    </div>
  );
};

export default KindleBezel;
