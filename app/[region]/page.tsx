import { notFound } from 'next/navigation';
import { VALID_REGIONS, getRegionConfig, type RegionCode } from '@/lib/config/regions';

interface RegionPageProps {
  params: Promise<{ region: string }>;
}

export default async function RegionHomePage({ params }: RegionPageProps) {
  const { region } = await params;

  if (!VALID_REGIONS.includes(region as RegionCode)) {
    notFound();
  }

  const config = getRegionConfig(region);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-8 rounded-2xl border border-border shadow-sm text-center">
        <div className="text-6xl mb-4">{config.flagEmoji}</div>
        <h1 className="text-3xl font-heading font-bold mb-6">
          Region: {region.toUpperCase()}
        </h1>
        <div className="space-y-3 text-lg">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Currency</span>
            <span className="font-semibold">
              {config.currencySymbol} {config.currency}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-semibold">{config.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Locale</span>
            <span className="font-semibold">{config.locale}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Country Code</span>
            <span className="font-semibold">{config.countryCode}</span>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          REG-01: Regional config resolves correctly for /{region}
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return VALID_REGIONS.map((region) => ({ region }));
}
