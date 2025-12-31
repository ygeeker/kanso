"use client";

import React, { useState, useEffect } from "react";
import { BatteryIcon } from "../Icons";
import { useAtom, useSetAtom } from "jotai";
import {
  wirelessSettingsAtom,
  setAirplaneModeAtom,
  setWifiEnabledAtom,
  setBluetoothEnabledAtom,
} from "@/system/atoms/deviceSettings";
import {
  AirplaneModeIcon,
  BluetoothIcon,
  SyncIcon,
  SettingsIcon,
  DarkModeIcon,
  ChevronDownIcon,
} from "./StatusBarIcons";

/**
 * Control Center (Kindle-style)
 * A panel that slides down from the top with device controls
 */

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

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
  battery: number;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  isOpen,
  onClose,
  deviceName,
  battery,
}) => {
  const [wireless] = useAtom(wirelessSettingsAtom);
  const setAirplaneMode = useSetAtom(setAirplaneModeAtom);
  const setWifiEnabled = useSetAtom(setWifiEnabledAtom);
  const setBluetoothEnabled = useSetAtom(setBluetoothEnabledAtom);
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

