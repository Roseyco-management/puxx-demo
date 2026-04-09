import { redirect } from 'next/navigation';
import { VALID_REGIONS, type RegionCode } from '@/lib/config/regions';
import { notFound } from 'next/navigation';

interface RegionPageProps {
  params: Promise<{ region: string }>;
}

export default async function RegionHomePage({ params }: RegionPageProps) {
  const { region } = await params;

  if (!VALID_REGIONS.includes(region as RegionCode)) {
    notFound();
  }

  redirect(`/${region}/products`);
}

export async function generateStaticParams() {
  return VALID_REGIONS.map((region) => ({ region }));
}
