'use client';

import { usePathname, useRouter } from 'next/navigation';
import { REGIONS, VALID_REGIONS, type RegionCode } from '@/lib/config/regions';

export function RegionSelector() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current region from path
  const segments = pathname.split('/').filter(Boolean);
  const currentRegion = (VALID_REGIONS.includes(segments[0] as RegionCode)
    ? segments[0]
    : 'uk') as RegionCode;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value as RegionCode;
    // Replace first path segment with new region
    const rest = segments.slice(1);
    const newPath = `/${newRegion}${rest.length ? '/' + rest.join('/') : ''}`;
    router.push(newPath);
  };

  return (
    <select
      value={currentRegion}
      onChange={handleChange}
      className="rounded-md border border-border bg-background px-2 py-1 text-sm font-medium text-foreground hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      aria-label="Select region"
    >
      {VALID_REGIONS.map((code) => {
        const cfg = REGIONS[code];
        return (
          <option key={code} value={code}>
            {cfg.flagEmoji} {cfg.currency}
          </option>
        );
      })}
    </select>
  );
}
