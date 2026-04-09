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
import { ProductSchema } from '@/components/seo/ProductSchema';
import { TrackProductView } from '@/components/analytics/TrackProductView';

interface ProductPageProps {
  params: Promise<{
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

// Generate metadata for SEO (using Next.js Metadata API for basic meta tags)
// NextSeo component handles Open Graph and additional SEO in the page component
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found - PUXX Ireland',
    };
  }

  const baseUrl = process.env.BASE_URL || 'https://puxx.ie';
  const productUrl = `${baseUrl}/products/${product.slug}`;

  // Format price
  const priceAmount = typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

  // Title pattern from SEO plan (lines 526-528): "{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX"
  const title = product.metaTitle ||
    `${product.name} Nicotine Pouches ${product.nicotineStrength || ''} | Buy in Ireland | PUXX`;

  // Meta description pattern from SEO plan (lines 537-539)
  const description = product.metaDescription ||
    `Buy ${product.name} nicotine pouches in Ireland. ${product.flavor ? `${product.flavor} flavor. ` : ''}${product.nicotineStrength || ''}. €${priceAmount.toFixed(2)}. Tobacco-free. Free delivery over €150. 18+ only. Shop PUXX.`;

  // Determine availability
  const availability = product.stockQuantity > 0 ? 'in stock' : 'out of stock';

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: 'website',
      title: `${product.name} - PUXX Ireland`,
      description: product.description,
      url: productUrl,
      siteName: 'PUXX Ireland',
      locale: 'en_IE',
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
      title: `${product.name} - PUXX Ireland`,
      description: product.description,
      images: [product.imageUrl || ''],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Product Schema - includes ProductJsonLd and BreadcrumbJsonLd (lines 222-246, 421-440 in SEO plan) */}
      {/* Note: Meta tags are handled by generateMetadata() function above using Next.js 15 Metadata API */}
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
                href="/"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href="/products"
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
              <AddToCart product={product} />

              {/* Trust Badges */}
              <div className="pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Free delivery on orders over €150</span>
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
