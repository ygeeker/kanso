"use client";

import React, { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  readerSettingsAtom,
  updateReaderSettingsAtom,
  applyThemePresetAtom,
  ReaderSettings,
} from "@/system/atoms/readerSettings";

/**
 * Icons for the settings sheet
 */
const CheckIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MinusIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PlusIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * Tab Button Component
 */
interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm font-sans transition-colors"
    style={{
      color: active ? "var(--eink-ink)" : "var(--eink-ink-muted)",
      borderBottom: active
        ? "2px solid var(--eink-ink)"
        : "2px solid transparent",
      fontWeight: active ? 500 : 400,
    }}
  >
    {label}
  </button>
);

/**
 * Stepper Control Component
 */
interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}) => {
  const decrease = () => {
    if (value > min) onChange(value - step);
  };

  const increase = () => {
    if (value < max) onChange(value + step);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-sans" style={{ color: "var(--eink-ink)" }}>
        {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={decrease}
          disabled={value <= min}
          className="w-8 h-8 flex items-center justify-center rounded-full border disabled:opacity-30"
          style={{
            borderColor: "var(--eink-border)",
            color: "var(--eink-ink-secondary)",
          }}
        >
          <MinusIcon size={16} />
        </button>
        <span
          className="text-sm font-sans tabular-nums w-16 text-center"
          style={{ color: "var(--eink-ink)" }}
        >
          {value}
          {unit}
        </span>
        <button
          onClick={increase}
          disabled={value >= max}
          className="w-8 h-8 flex items-center justify-center rounded-full border disabled:opacity-30"
          style={{
            borderColor: "var(--eink-border)",
            color: "var(--eink-ink-secondary)",
          }}
        >
          <PlusIcon size={16} />
        </button>
      </div>
    </div>
  );
};

/**
 * Theme Preset Card
 */
interface ThemeCardProps {
  name: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  name,
  description,
  selected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center p-2 px-3 text-center border"
    style={{
      borderColor: selected ? "var(--eink-ink)" : "var(--eink-border)",
      backgroundColor: selected ? "var(--eink-paper-warm)" : "transparent",
      minWidth: "80px",
    }}
  >
    <div
      className="text-sm font-sans font-medium"
      style={{ color: "var(--eink-ink)" }}
    >
      {name}
    </div>
    {selected && (
      <div style={{ color: "var(--eink-ink)" }} className="mt-0.5">
        <CheckIcon size={14} />
      </div>
    )}
  </button>
);

/**
 * Font Family Option
 */
interface FontOptionProps {
  name: string;
  fontFamily: string;
  value: ReaderSettings["fontFamily"];
  selected: boolean;
  onClick: () => void;
}

const FontOption: React.FC<FontOptionProps> = ({
  name,
  fontFamily,
  selected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between p-3 w-full text-left border rounded"
    style={{
      borderColor: selected ? "var(--eink-ink)" : "var(--eink-border)",
      backgroundColor: selected ? "var(--eink-paper-warm)" : "transparent",
    }}
  >
    <span style={{ fontFamily, color: "var(--eink-ink)" }}>{name}</span>
    {selected && (
      <div style={{ color: "var(--eink-ink)" }}>
        <CheckIcon size={18} />
      </div>
    )}
  </button>
);

/**
 * Themes Tab Content
 */
const ThemesTab: React.FC = () => {
  const [settings] = useAtom(readerSettingsAtom);
  const applyThemePreset = useSetAtom(applyThemePresetAtom);

  const themes: {
    key: ReaderSettings["theme"];
    name: string;
    description: string;
  }[] = [
    {
      key: "compact",
      name: "Compact",
      description: "Smaller text, tighter spacing",
    },
    {
      key: "comfortable",
      name: "Comfortable",
      description: "Balanced reading experience",
    },
    {
      key: "spacious",
      name: "Spacious",
      description: "Larger text, more breathing room",
    },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {themes.map((theme) => (
        <ThemeCard
          key={theme.key}
          name={theme.name}
          description={theme.description}
          selected={settings.theme === theme.key}
          onClick={() => applyThemePreset(theme.key)}
        />
      ))}
    </div>
  );
};

/**
 * Font Tab Content
 */
const FontTab: React.FC = () => {
  const [settings] = useAtom(readerSettingsAtom);
  const updateSettings = useSetAtom(updateReaderSettingsAtom);

  const fonts: {
    key: ReaderSettings["fontFamily"];
    name: string;
    fontFamily: string;
  }[] = [
    {
      key: "bookerly",
      name: "Bookerly",
      fontFamily: "'Bookerly', Georgia, serif",
    },
    {
      key: "amazon-ember",
      name: "Amazon Ember",
      fontFamily: "'Amazon Ember', sans-serif",
    },
    {
      key: "noto-serif",
      name: "Noto Serif",
      fontFamily: "'Noto Serif SC', serif",
    },
    { key: "system", name: "System", fontFamily: "system-ui, sans-serif" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Stepper
        label="Font Size"
        value={settings.fontSize}
        min={14}
        max={28}
        step={2}
        unit="px"
        onChange={(fontSize) => updateSettings({ fontSize })}
      />

      <div
        className="border-t"
        style={{ borderColor: "var(--eink-divider)" }}
      />

      <div>
        <div
          className="text-sm font-sans mb-2"
          style={{ color: "var(--eink-ink-secondary)" }}
        >
          Font Family
        </div>
        <div className="flex flex-col gap-2">
          {fonts.map((font) => (
            <FontOption
              key={font.key}
              name={font.name}
              fontFamily={font.fontFamily}
              value={font.key}
              selected={settings.fontFamily === font.key}
              onClick={() => updateSettings({ fontFamily: font.key })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Layout Tab Content
 */
const LayoutTab: React.FC = () => {
  const [settings] = useAtom(readerSettingsAtom);
  const updateSettings = useSetAtom(updateReaderSettingsAtom);

  return (
    <div className="flex flex-col gap-2">
      <Stepper
        label="Margins"
        value={settings.marginHorizontal}
        min={0}
        max={48}
        step={8}
        unit="px"
        onChange={(marginHorizontal) => updateSettings({ marginHorizontal })}
      />

      <div
        className="border-t"
        style={{ borderColor: "var(--eink-divider)" }}
      />

      <Stepper
        label="Line Height"
        value={settings.lineHeight}
        min={1.2}
        max={2.0}
        step={0.1}
        onChange={(lineHeight) =>
          updateSettings({ lineHeight: Math.round(lineHeight * 10) / 10 })
        }
      />
    </div>
  );
};

/**
 * Main Reader Settings Sheet Component
 */
interface ReaderSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaderSettingsSheet: React.FC<ReaderSettingsSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"themes" | "font" | "layout">(
    "themes"
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[200]" onClick={onClose} />

      {/* Bottom Sheet - Fixed height at 50% of viewport */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[201] flex flex-col"
        style={{
          backgroundColor: "var(--eink-paper)",
          borderTop: "2px solid var(--eink-ink)",
          height: "45vh",
        }}
      >
        {/* Tabs */}
        <div className="flex border-b shrink-0 border-b-2 border-b-solid border-b-(--eink-ink)">
          <TabButton
            label="Themes"
            active={activeTab === "themes"}
            onClick={() => setActiveTab("themes")}
          />
          <TabButton
            label="Font"
            active={activeTab === "font"}
            onClick={() => setActiveTab("font")}
          />
          <TabButton
            label="Layout"
            active={activeTab === "layout"}
            onClick={() => setActiveTab("layout")}
          />
        </div>

        {/* Tab Content - Scrollable area takes remaining space */}
        <div className="p-4 overflow-y-auto flex-1">
          {activeTab === "themes" && <ThemesTab />}
          {activeTab === "font" && <FontTab />}
          {activeTab === "layout" && <LayoutTab />}
        </div>
      </div>
    </>
  );
};

export default ReaderSettingsSheet;
