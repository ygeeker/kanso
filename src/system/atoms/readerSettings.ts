import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface ReaderSettings {
  theme: 'compact' | 'comfortable' | 'spacious';
  fontSize: number;
  fontFamily: 'bookerly' | 'amazon-ember' | 'noto-serif' | 'system';
  marginHorizontal: number;
  lineHeight: number;
}

export const readerSettingsAtom = atomWithStorage<ReaderSettings>(
  'kindle-reader-settings',
  {
    theme: 'comfortable',
    fontSize: 18,
    fontFamily: 'bookerly',
    marginHorizontal: 16,
    lineHeight: 1.6,
  }
);

// Theme presets
const themePresets = {
  compact: { fontSize: 16, marginHorizontal: 8, lineHeight: 1.4 },
  comfortable: { fontSize: 18, marginHorizontal: 16, lineHeight: 1.6 },
  spacious: { fontSize: 20, marginHorizontal: 24, lineHeight: 1.8 },
};

export const updateReaderSettingsAtom = atom(
  null,
  (get, set, updates: Partial<ReaderSettings>) => {
    set(readerSettingsAtom, {
      ...get(readerSettingsAtom),
      ...updates,
    });
  }
);

export const applyThemePresetAtom = atom(
  null,
  (get, set, theme: ReaderSettings['theme']) => {
    const preset = themePresets[theme];
    set(readerSettingsAtom, {
      ...get(readerSettingsAtom),
      ...preset,
      theme,
    });
  }
);

export const resetReaderSettingsAtom = atom(null, (get, set) => {
  set(readerSettingsAtom, {
    theme: 'comfortable',
    fontSize: 18,
    fontFamily: 'bookerly',
    marginHorizontal: 16,
    lineHeight: 1.6,
  });
});
