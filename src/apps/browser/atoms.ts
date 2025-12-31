import { atom } from 'jotai';

export const currentUrlAtom = atom<string>('');
export const urlInputAtom = atom<string>('');
export const browserHistoryAtom = atom<string[]>([]);
export const historyIndexAtom = atom<number>(-1);
export const isLoadingAtom = atom<boolean>(false);

// Derived atoms
export const canGoBackAtom = atom((get) => get(historyIndexAtom) > 0);
export const canGoForwardAtom = atom(
  (get) => get(historyIndexAtom) < get(browserHistoryAtom).length - 1
);
