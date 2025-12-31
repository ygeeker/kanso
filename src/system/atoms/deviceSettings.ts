import { atom } from 'jotai';

export interface WirelessSettings {
  airplaneMode: boolean;
  wifiEnabled: boolean;
  wifiNetwork: string;
  wifiSignal: number;
  bluetoothEnabled: boolean;
}

export const wirelessSettingsAtom = atom<WirelessSettings>({
  airplaneMode: false,
  wifiEnabled: true,
  wifiNetwork: 'Home_Network',
  wifiSignal: 3,
  bluetoothEnabled: false,
});

// Action atoms for device settings
export const setAirplaneModeAtom = atom(
  null,
  (get, set, enabled: boolean) => {
    set(wirelessSettingsAtom, {
      ...get(wirelessSettingsAtom),
      airplaneMode: enabled,
      wifiEnabled: enabled ? false : get(wirelessSettingsAtom).wifiEnabled,
      bluetoothEnabled: enabled ? false : get(wirelessSettingsAtom).bluetoothEnabled,
    });
  }
);

export const setWifiEnabledAtom = atom(
  null,
  (get, set, enabled: boolean) => {
    set(wirelessSettingsAtom, {
      ...get(wirelessSettingsAtom),
      wifiEnabled: enabled,
      airplaneMode: false,
    });
  }
);

export const setBluetoothEnabledAtom = atom(
  null,
  (get, set, enabled: boolean) => {
    set(wirelessSettingsAtom, {
      ...get(wirelessSettingsAtom),
      bluetoothEnabled: enabled,
      airplaneMode: false,
    });
  }
);
