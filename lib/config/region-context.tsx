'use client';

import { createContext, useContext } from 'react';
import type { RegionContextValue } from './regions';

export { type RegionContextValue };

export const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({
  value,
  children,
}: {
  value: RegionContextValue;
  children: React.ReactNode;
}) {
  return (
    <RegionContext.Provider value={value}>{children}</RegionContext.Provider>
  );
}

export function useRegion(): RegionContextValue {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error('useRegion must be used within RegionProvider');
  return ctx;
}
