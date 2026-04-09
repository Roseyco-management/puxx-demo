import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Package, Shield, Truck } from 'lucide-react';
import { ProductAPIResponse } from '@/lib/types/product';
import { ProductImage } from '@/components/products/ProductImage';
import { AddToCart } from '@/components/products/AddToCart';
import { ProductTabs } from '@/components/products/ProductTabs';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ProductInfo } from '@/components/products/ProductInfo';
import { VariantSelector } from '@/components/products/VariantSelector';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { TrackProductView } from '@/components/analytics/TrackProductView';
import { getRegionConfig } from '@/lib/config/regions';

interface ProductPageProps {
  params: Promise<{
    region: string;
    slug: string;
  }>;
}

// Fetch product data
async function getProduct(slug: string) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  const data: ProductAPIResponse = await res.json();
  return data.success ? data.product : null;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug, region } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found - PUXX Pouches',
    };
  }

  const baseUrl = process.env.BASE_URL || 'https://puxx.ie';
  const productUrl = `${baseUrl}/${region}/products/${product.slug}`;

  const regionConfig = getRegionConfig(region);

  // Format price using region base price
  const priceAmount = regionConfig.basePrice;

  const title = product.metaTitle ||
    `${product.name} Nicotine Pouches ${product.nicotineStrength || ''} | PUXX`;

  const description = product.metaDescription ||
    `Buy ${product.name} nicotine pouches. ${product.flavor ? `${product.flavor} flavor. ` : ''}${product.nicotineStrength || ''}. ${regionConfig.currencySymbol}${priceAmount.toFixed(2)}. Tobacco-free. 18+ only. Shop PUXX.`;

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: 'website',
      title: `${product.name} - PUXX Pouches`,
      description: product.description,
      url: productUrl,
      siteName: 'PUXX Pouches',
      images: [
        {
          url: product.imageUrl || '',
          width: 800,
          height: 800,
          alt: `${product.name} nicotine pouches ${product.nicotineStrength || ''} - ${product.flavor || 'premium flavor'}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - PUXX Pouches`,
      description: product.description,
      images: [product.imageUrl || ''],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, region } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Product Schema - structured data for SEO */}
      <ProductSchema product={product} />

      {/* Google Analytics - Track Product View */}
      <TrackProductView
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          category: 'Nicotine Pouches',
          variant: product.nicotineStrength,
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href={`/${region}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href={`/${region}/products`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Products
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <ProductImage
              imageUrl={product.imageUrl || ''}
              imageGallery={product.imageGallery || []}
              productName={product.name}
            />

            {/* Product Info and Add to Cart */}
            <div className="space-y-6">
              <ProductInfo product={product} />
              <VariantSelector
                currentSlug={product.slug}
                currentFlavor={product.flavor ?? ''}
                currentStrength={product.nicotineStrength ?? ''}
                region={region}
              />
              <AddToCart product={product} />

              {/* Trust Badges */}
              <div className="pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Free delivery on orders over {getRegionConfig(region).currencySymbol}150</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>100% tobacco-free premium quality</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Package className="w-5 h-5 text-green-600" />
                  <span>Discreet packaging and fast shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <ProductTabs product={product} />
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <RelatedProducts
              currentProductId={product.id}
              nicotineStrength={product.nicotineStrength}
              flavor={product.flavor}
            />
          </div>
        </div>
      </div>
    </>
  );
}
