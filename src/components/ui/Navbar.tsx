"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BatteryIcon,
  WifiIcon,
  SearchIcon,
  MenuIcon,
  CloseIcon,
  EllipsisVerticalIcon,
  ShoppingCartIcon,
} from "./Icons";
import { useDeviceSettings } from "@/contexts/deviceSettings";

/**
 * Kindle-style Navigation Components
 * Status bar, action bar, and navigation elements
 */

// ============================================
// Status Bar Icons
// ============================================

// Airplane mode icon (outline/filled)
const AirplaneModeIcon: React.FC<{
  size?: number;
  className?: string;
  filled?: boolean;
}> = ({ size = 20, className = "", filled = false }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? "0" : "1.5"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {filled ? (
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    ) : (
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    )}
  </svg>
);

// Bluetooth icon (outline/filled)
const BluetoothIcon: React.FC<{
  size?: number;
  className?: string;
  filled?: boolean;
}> = ({ size = 20, className = "", filled = false }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? "0" : "1.5"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {filled ? (
      <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
    ) : (
      <>
        <path d="M6.5 6.5l11 11M6.5 17.5l11-11" />
        <path d="M12 2v20" />
        <path d="M17.5 6.5L12 2v7.5" />
        <path d="M17.5 17.5L12 22v-7.5" />
      </>
    )}
  </svg>
);

// Sync icon (outline/filled)
const SyncIcon: React.FC<{
  size?: number;
  className?: string;
  filled?: boolean;
}> = ({ size = 20, className = "", filled = false }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {filled ? (
      <>
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8h6V2L6.89 4.11A11.5 11.5 0 0 1 12 1a11 11 0 0 1 11 11z" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16h-6v6l2.11-2.11A11.5 11.5 0 0 1 12 23 11 11 0 0 1 1 12z" />
      </>
    ) : (
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
    )}
  </svg>
);

// Settings icon (outline/filled)
const SettingsIcon: React.FC<{
  size?: number;
  className?: string;
  filled?: boolean;
}> = ({ size = 20, className = "", filled = false }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {filled ? (
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    ) : (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    )}
  </svg>
);

// Dark mode icon (outline/filled)
const DarkModeIcon: React.FC<{
  size?: number;
  className?: string;
  filled?: boolean;
}> = ({ size = 20, className = "", filled = false }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {filled ? (
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
    ) : (
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    )}
  </svg>
);

// Chevron down icon with wide ~120 degree angle (Kindle-style)
const ChevronDownIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 9 12 14 20 9" />
  </svg>
);

// ============================================
// Control Center (Kindle-style)
// ============================================

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
  battery: number;
}

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  icon,
  label,
  active = false,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center"
    style={{
      color: active ? "var(--eink-paper)" : "var(--eink-ink)",
      backgroundColor: active ? "var(--eink-ink)" : "transparent",
      border: active ? "none" : "1.5px solid var(--eink-ink)",
      borderRadius: "50%",
      width: "52px",
      height: "52px",
    }}
  >
    {icon}
  </button>
);

const ControlCenter: React.FC<ControlCenterProps> = ({
  isOpen,
  onClose,
  deviceName,
  battery,
}) => {
  const { wireless, setAirplaneMode, setWifiEnabled, setBluetoothEnabled } =
    useDeviceSettings();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const date = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setDateTime(`${time} · ${date}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        onClick={onClose}
      />
      {/* Control Center panel */}
      <div
        className="fixed inset-x-0 top-0 z-50"
        style={{
          height: "auto",
          maxHeight: "50vh",
          backgroundColor: "var(--eink-paper)",
          borderBottom: "2px solid var(--eink-border)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header with device name and date */}
        <div
          className="px-4 pt-3 pb-2 border-b"
          style={{ borderColor: "var(--eink-divider)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                className="text-base font-sans font-medium"
                style={{ color: "var(--eink-ink)" }}
              >
                {deviceName}
              </div>
              <div
                className="text-sm font-sans mt-0.5"
                style={{ color: "var(--eink-ink-secondary)" }}
              >
                {dateTime}
              </div>
            </div>
            <div
              className="flex items-center gap-1.5"
              style={{ color: "var(--eink-ink-secondary)" }}
            >
              <span className="text-sm font-sans">{battery}%</span>
              <BatteryIcon size={20} level={battery} />
            </div>
          </div>
        </div>

        {/* Control buttons grid */}
        <div className="p-4">
          <div className="flex justify-center gap-3 flex-wrap">
            {/* Airplane Mode */}
            <div className="flex flex-col items-center gap-1">
              <ControlButton
                icon={
                  <AirplaneModeIcon size={22} filled={wireless.airplaneMode} />
                }
                label="Airplane"
                active={wireless.airplaneMode}
                onClick={() => setAirplaneMode(!wireless.airplaneMode)}
              />
              <span
                className="text-[10px] font-sans"
                style={{ color: "var(--eink-ink-secondary)" }}
              >
                {wireless.airplaneMode ? "On" : "Off"}
              </span>
            </div>

            {/* Bluetooth */}
            <div className="flex flex-col items-center gap-1">
              <ControlButton
                icon={
                  <BluetoothIcon size={22} filled={wireless.bluetoothEnabled} />
                }
                label="Bluetooth"
                active={wireless.bluetoothEnabled}
                onClick={() => setBluetoothEnabled(!wireless.bluetoothEnabled)}
              />
              <span
                className="text-[10px] font-sans"
                style={{ color: "var(--eink-ink-secondary)" }}
              >
                {wireless.bluetoothEnabled ? "On" : "Off"}
              </span>
            </div>

            {/* Dark Mode */}
            <div className="flex flex-col items-center gap-1">
              <ControlButton
                icon={<DarkModeIcon size={22} filled={false} />}
                label="Dark Mode"
                active={false}
              />
              <span
                className="text-[10px] font-sans"
                style={{ color: "var(--eink-ink-secondary)" }}
              >
                Dark Mode
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3 flex-wrap mt-3">
            {/* Sync */}
            <div className="flex flex-col items-center gap-1">
              <ControlButton
                icon={<SyncIcon size={22} filled={false} />}
                label="Sync"
                active={false}
              />
              <span
                className="text-[10px] font-sans"
                style={{ color: "var(--eink-ink-secondary)" }}
              >
                Sync
              </span>
            </div>

            {/* All Settings */}
            <div className="flex flex-col items-center gap-1">
              <ControlButton
                icon={<SettingsIcon size={22} filled={false} />}
                label="All Settings"
                active={false}
              />
              <span
                className="text-[10px] font-sans"
                style={{ color: "var(--eink-ink-secondary)" }}
              >
                All Settings
              </span>
            </div>
          </div>
        </div>

        {/* Brightness slider */}
        <div className="px-4 pb-3">
          <div
            className="text-sm font-sans mb-2"
            style={{ color: "var(--eink-ink)" }}
          >
            Brightness
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--eink-ink-muted)" }}>−</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="24"
                defaultValue="10"
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  backgroundColor: "var(--eink-border)",
                  accentColor: "var(--eink-ink)",
                }}
              />
            </div>
            <span style={{ color: "var(--eink-ink-muted)" }}>+</span>
          </div>
        </div>

        {/* Close handle */}
        <div
          className="flex justify-center py-2 cursor-pointer"
          onClick={onClose}
        >
          <ChevronDownIcon
            size={20}
            className="rotate-180"
            style={{ color: "var(--eink-ink-muted)" }}
          />
        </div>
      </div>
    </>
  );
};

// ============================================
// Status Bar (top bar with time, battery, etc.)
// ============================================

interface StatusBarProps {
  deviceName?: string;
  battery?: number;
}

export const StatuBar: React.FC<StatusBarProps> = ({
  deviceName = "Kindle",
  battery = 100,
}) => {
  const [time, setTime] = useState("");
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const { wireless } = useDeviceSettings();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2 md:py-1.5 border-b cursor-pointer select-none"
        style={{
          borderColor: "var(--eink-divider)",
          backgroundColor: "var(--eink-paper)",
        }}
        onClick={() => setControlCenterOpen(!controlCenterOpen)}
      >
        {/* Time on the left */}
        <span
          className="text-base md:text-sm font-sans tabular-nums flex-1"
          style={{ color: "var(--eink-ink)" }}
        >
          {time}
        </span>

        {/* Center chevron indicator */}
        <div className="flex-1 flex justify-center">
          <ChevronDownIcon
            size={20}
            className="md:hidden"
            style={{ color: "var(--eink-ink)" }}
          />
          <ChevronDownIcon
            size={16}
            className="hidden md:block"
            style={{ color: "var(--eink-ink)" }}
          />
        </div>

        {/* Status icons on the right */}
        <div
          className="flex items-center gap-3 md:gap-2 flex-1 justify-end"
          style={{ color: "var(--eink-ink)" }}
        >
          {/* Airplane Mode indicator */}
          {wireless.airplaneMode && (
            <AirplaneModeIcon size={20} className="md:hidden" filled />
          )}
          {wireless.airplaneMode && (
            <AirplaneModeIcon size={16} className="hidden md:block" filled />
          )}

          {/* WiFi indicator - only show when not in airplane mode */}
          {wireless.wifiEnabled && !wireless.airplaneMode && (
            <div className="flex items-center gap-1.5 md:gap-1">
              <WifiIcon
                size={20}
                className="md:hidden"
                strength={wireless.wifiSignal}
              />
              <WifiIcon
                size={16}
                className="hidden md:block"
                strength={wireless.wifiSignal}
              />
            </div>
          )}

          {/* Bluetooth indicator - only show when not in airplane mode */}
          {wireless.bluetoothEnabled && !wireless.airplaneMode && (
            <>
              <BluetoothIcon size={20} className="md:hidden" filled />
              <BluetoothIcon size={16} className="hidden md:block" filled />
            </>
          )}

          {/* Battery indicator */}
          <div className="flex items-center gap-1.5 md:gap-1">
            <span className="text-sm md:text-xs font-sans tabular-nums">
              {battery}%
            </span>
            <BatteryIcon size={22} className="md:hidden" level={battery} />
            <BatteryIcon
              size={18}
              className="hidden md:block"
              level={battery}
            />
          </div>
        </div>
      </div>

      {/* Control Center overlay */}
      <ControlCenter
        isOpen={controlCenterOpen}
        onClose={() => setControlCenterOpen(false)}
        deviceName={deviceName}
        battery={battery}
      />
    </>
  );
};

// ============================================
// Action Bar (navigation buttons)
// ============================================

interface ActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  children,
  className = "",
}) => {
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

export const ActionGroup: React.FC<ActionGroupProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>{children}</div>
  );
};

export const ActionBarSpace: React.FC = () => <div className="flex-1" />;

interface ActionItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    color: "var(--eink-ink-secondary)",
    backgroundColor: "transparent",
  };

  const pressedStyles = {
    color: "var(--eink-paper)",
    backgroundColor: "var(--eink-ink)",
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
// Search Bar (Kindle-style)
// ============================================

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search Kindle",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 mx-2">
      <div className="relative">
        <SearchIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:block"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="
            w-full pl-10 md:pl-9 pr-4 py-2 md:py-1.5 text-base md:text-sm font-sans
            border-2 md:border
            rounded-full
            focus:outline-none
            transition-colors duration-150
            placeholder-(--eink-ink)
            bg-(--eink-paper)
            border-(--eink-ink)
            text-(--eink-ink)
          "
        />
      </div>
    </form>
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
  const buttonStyles = isPressed
    ? {
        color: "var(--eink-paper)",
        backgroundColor: "var(--eink-ink)",
      }
    : {
        color: "var(--eink-ink-secondary)",
        backgroundColor: "transparent",
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
        <EllipsisVerticalIcon size={18} />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-full mt-1
            min-w-[160px]
            py-1 z-50
          "
          style={{
            backgroundColor: "var(--eink-paper)",
            border: "1px solid var(--eink-border)",
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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navStyle: React.CSSProperties = {
    backgroundColor: "var(--eink-paper)",
    borderColor: "var(--eink-divider)",
    ...(fixed && isMobile
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
        }
      : fixed
      ? {
          position: "sticky",
          top: 0,
          zIndex: 40,
        }
      : {}),
  };

  return (
    <nav className={`border-b ${className}`} style={navStyle}>
      {children}
    </nav>
  );
};
