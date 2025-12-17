"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { BatteryIcon, WifiIcon, SearchIcon, MenuIcon, CloseIcon } from "./Icons";
import { useDeviceSettings } from "@/contexts/deviceSettings";

/**
 * Kindle-style Navigation Components
 * Status bar, action bar, and navigation elements
 */

// ============================================
// Status Bar (top bar with time, battery, etc.)
// ============================================

// Airplane mode icon
const AirplaneModeIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

// Bluetooth icon
const BluetoothIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
  </svg>
);

interface StatusBarProps {
  deviceName?: string;
  battery?: number;
}

export const StatuBar: React.FC<StatusBarProps> = ({
  deviceName = "Kindle",
  battery = 100,
}) => {
  const [time, setTime] = useState("");
  const { wireless } = useDeviceSettings();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center justify-between px-3 py-2 md:py-1.5 border-b"
      style={{ 
        borderColor: 'var(--eink-divider)', 
        backgroundColor: 'var(--eink-paper)' 
      }}
    >
      <span 
        className="text-sm md:text-xs font-sans truncate max-w-[140px] md:max-w-[120px]"
        style={{ color: 'var(--eink-ink-secondary)' }}
      >
        {deviceName}
      </span>
      <div className="flex items-center gap-3 md:gap-2" style={{ color: 'var(--eink-ink-secondary)' }}>
        {/* Airplane Mode indicator */}
        {wireless.airplaneMode && (
          <AirplaneModeIcon size={18} className="md:hidden" />
        )}
        {wireless.airplaneMode && (
          <AirplaneModeIcon size={14} className="hidden md:block" />
        )}

        {/* WiFi indicator */}
        {wireless.wifiEnabled && !wireless.airplaneMode && (
          <div className="flex items-center gap-1.5 md:gap-1">
            <WifiIcon size={18} className="md:hidden" strength={wireless.wifiSignal} />
            <WifiIcon size={14} className="hidden md:block" strength={wireless.wifiSignal} />
          </div>
        )}

        {/* Bluetooth indicator */}
        {wireless.bluetoothEnabled && !wireless.airplaneMode && (
          <>
            <BluetoothIcon size={18} className="md:hidden" />
            <BluetoothIcon size={14} className="hidden md:block" />
          </>
        )}

        {/* Battery indicator */}
        <div className="flex items-center gap-1.5 md:gap-1">
          <span className="text-xs md:text-[10px] font-sans">{battery}%</span>
          <BatteryIcon size={18} className="md:hidden" level={battery} />
          <BatteryIcon size={14} className="hidden md:block" level={battery} />
        </div>

        {/* Time */}
        <span className="text-sm md:text-xs font-sans tabular-nums">{time}</span>
      </div>
    </div>
  );
};

// ============================================
// Action Bar (navigation buttons)
// ============================================

interface ActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center px-2 py-1 gap-1 ${className}`}>
      {children}
    </div>
  );
};

interface ActionGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ActionGroup: React.FC<ActionGroupProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {children}
    </div>
  );
};

export const ActionBarSpace: React.FC = () => <div className="flex-1" />;

interface ActionItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  changeFill?: boolean;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  children,
  className = "",
  changeFill = true,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Kindle-style invert on tap
  const normalStyles = {
    color: 'var(--eink-ink-secondary)',
    backgroundColor: 'transparent',
  };

  const pressedStyles = {
    color: 'var(--eink-paper)',
    backgroundColor: 'var(--eink-ink)',
  };

  const currentStyles = isPressed ? pressedStyles : normalStyles;

  return (
    <button
      className={`
        flex flex-col items-center justify-center
        px-2 py-1
        transition-colors duration-75
        text-xs font-sans
        min-w-[50px]
        select-none
        ${className}
      `}
      style={currentStyles}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
};

// ============================================
// Search Bar
// ============================================

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="relative flex items-center">
      {isExpanded ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative">
            <SearchIcon size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--eink-ink-muted)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="
                pl-8 pr-3 py-1.5
                w-40
                text-sm font-sans
                bg-[var(--eink-paper-warm)]
                border border-[var(--eink-border)]
                rounded
                focus:outline-none focus:border-[var(--eink-ink-muted)]
                text-[var(--eink-ink)]
                placeholder:text-[var(--eink-ink-muted)]
              "
              autoFocus
              onBlur={() => !query && setIsExpanded(false)}
            />
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="
            flex items-center gap-1.5
            px-2 py-1.5
            text-[var(--eink-ink-secondary)]
            hover:text-[var(--eink-ink)]
            hover:bg-[var(--eink-paper-warm)]
            rounded
            transition-colors duration-150
          "
        >
          <SearchIcon size={16} />
          <span className="text-sm font-sans">{placeholder}</span>
        </button>
      )}
    </div>
  );
};

// ============================================
// Action Bar Menu (dropdown menu)
// ============================================

interface MenuItem {
  textPrimary: string;
  component?: "a" | "button";
  href?: string;
  onClick?: () => void;
}

interface ActionBarMenuProps {
  items: MenuItem[];
}

export const ActionBarMenu: React.FC<ActionBarMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Kindle-style invert on tap
  const buttonStyles = isPressed ? {
    color: 'var(--eink-paper)',
    backgroundColor: 'var(--eink-ink)',
  } : {
    color: 'var(--eink-ink-secondary)',
    backgroundColor: 'transparent',
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        className="
          p-2
          transition-colors duration-75
          select-none
        "
        style={buttonStyles}
      >
        <MenuIcon size={18} />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-full mt-1
            min-w-[160px]
            py-1 z-50
          "
          style={{
            backgroundColor: 'var(--eink-paper)',
            border: '1px solid var(--eink-border)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {items.map((item, index) => {
            const commonClasses = `
              block w-full text-left
              px-4 py-2
              text-sm font-sans
              text-[var(--eink-ink)]
              hover:bg-[var(--eink-paper-warm)]
              transition-colors duration-150
            `;

            if (item.component === "a" && item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={commonClasses}
                  onClick={() => setIsOpen(false)}
                >
                  {item.textPrimary}
                </a>
              );
            }

            return (
              <button
                key={index}
                className={commonClasses}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {item.textPrimary}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================
// Navbar Container
// ============================================

interface NavbarProps {
  children: React.ReactNode;
  fixed?: boolean;
  autoClose?: boolean;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  children,
  fixed = false,
  autoClose = false,
  className = "",
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navStyle: React.CSSProperties = {
    backgroundColor: 'var(--eink-paper)',
    borderColor: 'var(--eink-divider)',
    ...(fixed && isMobile ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
    } : fixed ? {
      position: 'sticky',
      top: 0,
      zIndex: 40,
    } : {})
  };

  return (
    <nav
      className={`border-b ${className}`}
      style={navStyle}
    >
      {children}
    </nav>
  );
};

