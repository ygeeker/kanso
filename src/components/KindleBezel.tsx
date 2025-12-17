"use client";

import React, { useRef } from "react";
import { DialogPortalContext } from "@/contexts/dialogPortal";

interface KindleBezelProps {
  children: React.ReactNode;
  dark?: boolean;
}

/**
 * KindleBezel - A custom device frame mimicking Amazon Kindle Oasis
 * 
 * Features:
 * - Asymmetric design like Kindle Oasis with grip area on the left
 * - E-ink paper-like screen appearance
 * - Locked aspect ratio (7:10) for consistent appearance
 * - Responsive: shows bezel on desktop/tablet, full screen on mobile
 */

// Kindle screen aspect ratio (width:height) - approximately 7:10
const SCREEN_ASPECT_RATIO = 7 / 10;

const KindleBezel: React.FC<KindleBezelProps> = ({ children, dark = false }) => {
  const desktopPortalRef = useRef<HTMLDivElement>(null);
  const mobilePortalRef = useRef<HTMLDivElement>(null);

  return (
    <div className={dark ? "dark" : ""} data-theme={dark ? "dark" : "light"}>
      {/* Desktop/Tablet: Show device frame with locked aspect ratio */}
      <div 
        className="hidden md:flex items-center justify-center min-h-screen py-2 px-4"
        style={{
          background: `linear-gradient(135deg, var(--device-bg-gradient-start) 0%, var(--device-bg-gradient-end) 100%)`,
        }}
      >
        {/* Device outer shell */}
        <div 
          className="relative flex overflow-hidden"
          style={{
            background: `linear-gradient(145deg, var(--bezel-accent) 0%, var(--bezel-outer) 50%, var(--bezel-inner) 100%)`,
            borderRadius: '1.5rem',
            boxShadow: '0 20px 60px -10px var(--bezel-shadow), 0 10px 20px -5px var(--bezel-shadow)',
            // Lock max height to viewport
            maxHeight: 'calc(100vh - 1rem)',
          }}
        >
          {/* Left grip area (Oasis-style asymmetric design) */}
          <div 
            className="hidden lg:flex flex-col items-center justify-center w-14 shrink-0"
            style={{
              background: `linear-gradient(180deg, var(--bezel-accent) 0%, var(--bezel-outer) 100%)`,
            }}
          >
            {/* Page turn buttons */}
            <div className="space-y-3 py-6">
              <div 
                className="w-7 h-10 rounded-md opacity-60"
                style={{
                  background: `linear-gradient(180deg, var(--bezel-inner) 0%, var(--bezel-outer) 100%)`,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)',
                }}
                title="Page Back"
              />
              <div 
                className="w-7 h-10 rounded-md opacity-60"
                style={{
                  background: `linear-gradient(180deg, var(--bezel-inner) 0%, var(--bezel-outer) 100%)`,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)',
                }}
                title="Page Forward"
              />
            </div>
          </div>

          {/* Main bezel frame */}
          <div className="p-2">
            {/* Inner bezel edge */}
            <div 
              className="p-0.5"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
                borderRadius: '0.25rem',
              }}
            >
              {/* Screen container with locked aspect ratio */}
              <div 
                className="relative overflow-hidden"
                style={{
                  // Height based on viewport, width calculated from aspect ratio
                  height: 'min(680px, calc(100vh - 2rem))',
                  width: `min(476px, calc((100vh - 2rem) * ${SCREEN_ASPECT_RATIO}))`,
                  minWidth: '320px',
                  borderRadius: '0.25rem',
                }}
              >
                {/* E-ink paper texture overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10 opacity-[0.015]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                {/* Subtle vignette for screen depth */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.03)',
                  }}
                />

                {/* Dialog portal target - at screen level, above content */}
                <div 
                  ref={desktopPortalRef}
                  className="absolute inset-0 z-50 pointer-events-none [&>*]:pointer-events-auto"
                />

                {/* Actual content area */}
                <DialogPortalContext.Provider value={{ portalRef: desktopPortalRef }}>
                  <div 
                    className="relative z-0 h-full overflow-y-auto overflow-x-hidden scrollbar-thin"
                    style={{ 
                      backgroundColor: 'var(--eink-paper)',
                      color: 'var(--eink-ink)'
                    }}
                  >
                    {children}
                  </div>
                </DialogPortalContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile (xs/sm): Full screen without bezel */}
      <div 
        className="md:hidden h-screen overflow-y-auto overflow-x-hidden relative"
        style={{ 
          backgroundColor: 'var(--eink-paper)',
          color: 'var(--eink-ink)'
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
