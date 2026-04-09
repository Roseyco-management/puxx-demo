import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | PUXX Ireland Nicotine Pouches',
  description:
    'Get answers to all your questions about PUXX nicotine pouches. Learn about products, usage, safety, shipping, returns, age verification, and more. Expert support for Irish customers.',
  keywords: 'nicotine pouches FAQ, PUXX questions, tobacco-free pouches Ireland, nicotine pouch safety, shipping Ireland, age verification',
  openGraph: {
    title: 'FAQ - PUXX Ireland Nicotine Pouches',
    description: 'Comprehensive answers to all your questions about nicotine pouches, ordering, and delivery in Ireland',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
