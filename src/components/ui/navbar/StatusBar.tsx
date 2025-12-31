"use client";

import React, { useState, useEffect } from "react";
import { BatteryIcon, WifiIcon } from "../Icons";
import { useAtom } from "jotai";
import { wirelessSettingsAtom } from "@/system/atoms/deviceSettings";
import { ControlCenter } from "./ControlCenter";
import {
  AirplaneModeIcon,
  BluetoothIcon,
  ChevronDownIcon,
} from "./StatusBarIcons";

/**
 * Status Bar (top bar with time, battery, etc.)
 * Displays time, battery, and wireless status indicators
 */

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
  const [wireless] = useAtom(wirelessSettingsAtom);

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
        className="flex items-center justify-between px-4 py-2 md:py-1.5 cursor-pointer select-none"
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

