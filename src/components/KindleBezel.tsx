"use client";

import React from "react";

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
 * - Subtle texture and shadows for realism
 * - Responsive: shows bezel on desktop, full screen on mobile
 */
const KindleBezel: React.FC<KindleBezelProps> = ({ children, dark = false }) => {
  return (
    <div className={dark ? "dark" : ""} data-theme={dark ? "dark" : "light"}>
      {/* Desktop: Show device frame */}
      <div className="hidden md:flex items-center justify-center min-h-screen py-8 px-4 bg-gradient-to-br from-device-bg-start to-device-bg-end">
        {/* Device outer shell */}
        <div 
          className="relative flex shadow-kindle-bezel rounded-kindle"
          style={{
            background: `linear-gradient(145deg, var(--bezel-accent) 0%, var(--bezel-outer) 50%, var(--bezel-inner) 100%)`,
          }}
        >
          {/* Left grip area (Oasis-style asymmetric design) */}
          <div 
            className="hidden lg:flex flex-col items-center justify-center w-16 rounded-l-kindle"
            style={{
              background: `linear-gradient(180deg, var(--bezel-accent) 0%, var(--bezel-outer) 100%)`,
            }}
          >
            {/* Page turn buttons */}
            <div className="space-y-4 py-8">
              <div 
                className="w-8 h-12 rounded-md opacity-60"
                style={{
                  background: `linear-gradient(180deg, var(--bezel-inner) 0%, var(--bezel-outer) 100%)`,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)',
                }}
                title="Page Back"
              />
              <div 
                className="w-8 h-12 rounded-md opacity-60"
                style={{
                  background: `linear-gradient(180deg, var(--bezel-inner) 0%, var(--bezel-outer) 100%)`,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)',
                }}
                title="Page Forward"
              />
            </div>
          </div>

          {/* Main bezel frame */}
          <div className="p-3">
            {/* Inner bezel edge */}
            <div 
              className="p-0.5 rounded-kindle-screen"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
              }}
            >
              {/* Screen container with E-ink appearance */}
              <div 
                className="relative rounded-kindle-screen overflow-hidden shadow-kindle-screen"
                style={{
                  width: 'min(500px, 80vw)',
                  height: 'min(700px, 85vh)',
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
                    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.03)',
                  }}
                />

                {/* Actual content area */}
                <div 
                  className="relative z-0 h-full overflow-y-auto scrollbar-thin"
                  style={{ 
                    backgroundColor: 'var(--eink-paper)',
                    color: 'var(--eink-ink)'
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* Right side thin bezel */}
          <div 
            className="hidden lg:block w-3 rounded-r-kindle"
            style={{
              background: `linear-gradient(180deg, var(--bezel-accent) 0%, var(--bezel-outer) 100%)`,
            }}
          />
        </div>

        {/* Power button indicator (small LED) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 rounded-full bg-green-600/30" />
        </div>
      </div>

      {/* Mobile: Full screen without bezel */}
      <div 
        className="md:hidden min-h-screen"
        style={{ 
          backgroundColor: 'var(--eink-paper)',
          color: 'var(--eink-ink)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default KindleBezel;

