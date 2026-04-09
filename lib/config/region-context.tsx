'use client';

import { createContext, useContext } from 'react';
import type { RegionContextValue } from './regions';

export { type RegionContextValue };

export const RegionContext = createContext<RegionContextValue | null>(null);

export function useRegion(): RegionContextValue {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error('useRegion must be used within RegionProvider');
  return ctx;
}
