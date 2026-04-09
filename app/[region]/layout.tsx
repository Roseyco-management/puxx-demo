import { notFound } from 'next/navigation';
import { VALID_REGIONS, getRegionConfig, type RegionCode } from '@/lib/config/regions';
import { RegionContext } from '@/lib/config/region-context';
import { PublicLayout } from '@/components/layout/PublicLayout';

interface RegionLayoutProps {
  children: React.ReactNode;
  params: Promise<{ region: string }>;
}

export default async function RegionLayout({ children, params }: RegionLayoutProps) {
  const { region } = await params;

  if (!VALID_REGIONS.includes(region as RegionCode)) {
    notFound();
  }

  const config = getRegionConfig(region);

  return (
    <RegionContext.Provider value={{ region: region as RegionCode, config }}>
      <PublicLayout>{children}</PublicLayout>
    </RegionContext.Provider>
  );
}
