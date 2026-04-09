import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Nicotine Pouches - Shop All Products | PUXX Ireland',
  description:
    'Browse our complete collection of premium nicotine pouches. 14 delicious flavors from mint to fruit. All products €15.00 with fast delivery across Ireland. Tobacco-free and discreet.',
  keywords: [
    'nicotine pouches',
    'tobacco-free',
    'nicotine pouches Ireland',
    'PUXX',
    'mint pouches',
    'fruit pouches',
    'nicotine products',
    'smoke-free',
  ],
  openGraph: {
    title: 'Premium Nicotine Pouches - Shop All Products | PUXX Ireland',
    description:
      'Browse our complete collection of premium nicotine pouches. 14 delicious flavors, all €15.00 with fast delivery across Ireland.',
    type: 'website',
    locale: 'en_IE',
    siteName: 'PUXX Ireland',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Nicotine Pouches | PUXX Ireland',
    description:
      'Browse our complete collection of premium nicotine pouches. 14 delicious flavors, all €15.00.',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
