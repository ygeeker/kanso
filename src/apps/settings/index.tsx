"use client";

import { TLocale } from "@/types/index";
import {
  List,
  ListItem,
  ListItemText,
  Section,
  SectionTitle,
  Switch,
  ChevronRightIcon,
} from "@/components/ui";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  wirelessSettingsAtom,
  setAirplaneModeAtom,
  setWifiEnabledAtom,
  setBluetoothEnabledAtom,
} from "@/system/atoms/deviceSettings";
import AppToolbar from "@/system/components/AppToolbar";

interface SettingsAppProps {
  locale: TLocale;
}

export default function SettingsApp(props: SettingsAppProps) {
  const t = useTranslations("settingsPage");

  // Get wireless settings from jotai atoms
  const [wireless] = useAtom(wirelessSettingsAtom);
  const setAirplaneMode = useSetAtom(setAirplaneModeAtom);
  const setWifiEnabled = useSetAtom(setWifiEnabledAtom);
  const setBluetoothEnabled = useSetAtom(setBluetoothEnabledAtom);

  // Local states for other settings
  const [pageRefresh, setPageRefresh] = useState(true);
  const [showCover, setShowCover] = useState(true);
  const [parentalControls, setParentalControls] = useState(false);

  return (
    <>
      <AppToolbar
        type="standard"
        title="Settings"
        onMenuClick={() => console.log("Menu clicked")}
      />
      <div className="pb-8 px-4 md:px-6">
      {/* Wireless Section */}
      <Section>
        <SectionTitle>Wireless</SectionTitle>
        <List>
          <ListItem>
            <ListItemText
              primary="Airplane Mode"
              secondary="Disable all wireless connections"
            />
            <Switch
              checked={wireless.airplaneMode}
              onChange={setAirplaneMode}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Wi-Fi"
              secondary={wireless.wifiEnabled ? `Connected to ${wireless.wifiNetwork}` : "Off"}
            />
            <Switch
              checked={wireless.wifiEnabled}
              onChange={setWifiEnabled}
              disabled={wireless.airplaneMode}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bluetooth"
              secondary={wireless.bluetoothEnabled ? "On" : "Off"}
            />
            <Switch
              checked={wireless.bluetoothEnabled}
              onChange={setBluetoothEnabled}
              disabled={wireless.airplaneMode}
            />
          </ListItem>
        </List>
      </Section>

      {/* Device Options Section */}
      <Section>
        <SectionTitle>Device Options</SectionTitle>
        <List>
          <ListItem>
            <ListItemText
              primary="Device Name"
              secondary="River's Kindle"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Language and Dictionaries"
              secondary="English (United States)"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Date and Time"
              secondary="Set automatically"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Device Passcode"
              secondary="Off"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Restart" />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Reset Device"
              secondary="Restore to factory defaults"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
        </List>
      </Section>

      {/* Display Settings Section */}
      <Section>
        <SectionTitle>Display Settings</SectionTitle>
        <List>
          <ListItem>
            <ListItemText
              primary="Font Size"
              secondary="Size 4 of 14"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bold"
              secondary="Level 2 of 5"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Page Refresh"
              secondary="Refresh every page turn"
            />
            <Switch
              checked={pageRefresh}
              onChange={setPageRefresh}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Show Cover"
              secondary="Display book cover on lock screen"
            />
            <Switch
              checked={showCover}
              onChange={setShowCover}
            />
          </ListItem>
        </List>
      </Section>

      {/* Reading Options Section */}
      <Section>
        <SectionTitle>Reading Options</SectionTitle>
        <List>
          <ListItem>
            <ListItemText
              primary="Popular Highlights"
              secondary="Off"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Vocabulary Builder"
              secondary="On"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Page Turn Buttons"
              secondary="Standard"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Reading Progress"
              secondary="Location in book"
            />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
        </List>
      </Section>

      {/* Parental Controls Section */}
      <Section>
        <SectionTitle>Parental Controls</SectionTitle>
        <List>
          <ListItem>
            <ListItemText
              primary="Parental Controls"
              secondary={parentalControls ? "On" : "Off"}
            />
            <Switch
              checked={parentalControls}
              onChange={setParentalControls}
            />
          </ListItem>
        </List>
      </Section>

      {/* Blog Export Section */}
      <Section>
        <SectionTitle>{t("exportPosts")}</SectionTitle>
        <List>
          <Link href="/rss/feed.xml">
            <ListItem>
              <ListItemText
                primary="RSS Feed"
                secondary="Subscribe via XML"
              />
              <ChevronRightIcon size={18} className="opacity-40" />
            </ListItem>
          </Link>
          <a href="https://github.com/nicepkg/kanso" target="_blank" rel="noopener noreferrer">
            <ListItem>
              <ListItemText
                primary={t("openSource")}
                secondary="View on GitHub"
              />
              <ChevronRightIcon size={18} className="opacity-40" />
            </ListItem>
          </a>
        </List>
      </Section>

      {/* Legal Section */}
      <Section>
        <SectionTitle>Legal</SectionTitle>
        <List>
          <ListItem>
            <ListItemText primary="Terms of Use" />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Privacy Notice" />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Legal Notices" />
            <ChevronRightIcon size={18} className="opacity-40" />
          </ListItem>
        </List>
      </Section>

      {/* Device Info Section */}
      <Section>
        <SectionTitle>Device Info</SectionTitle>
        <List>
          <ListItem>
            <ListItemText
              primary="Serial Number"
              secondary="G000AB1234567890"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Wi-Fi MAC Address"
              secondary="00:11:22:33:44:55"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Firmware Version"
              secondary="Kindle 5.16.2.1.1"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Available Storage"
              secondary="6.2 GB of 8 GB"
            />
          </ListItem>
        </List>
      </Section>
    </div>
    </>
  );
}
