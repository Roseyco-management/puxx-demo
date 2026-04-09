import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Package,
  Leaf,
  Smile,
  Star,
  ShoppingBag,
  Truck,
  Shield
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  nicotineStrength: string | null;
  flavor: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  sku: string | null;
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products?featured=true&limit=4`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden min-h-[700px] lg:min-h-[800px]">
        {/* Background Banner Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-banner.jpg"
            alt="PUXX Premium Nicotine Pouches Ireland - Tobacco-Free Fresh Fruit Flavors Collection"
            fill
            priority
            className="object-cover object-center"
            quality={90}
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          {/* Irish green accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent mix-blend-overlay" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          {/* Hero Content - Centered */}
          <div className="text-center w-full">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight text-white leading-[1.1] mb-8">
              Ireland's Premium
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black">
                  <span className="text-green-500">Toba</span><span className="text-white">cco-</span><span className="text-orange-500">Free</span>
                </span>
              </span>
              <br />
              <span className="mt-2 inline-block">Nicotine Pouches</span>
            </h1>

            <p className="mt-8 text-xl sm:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto font-medium">
              14 delicious flavors. Clean satisfaction. Delivered to your door.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-emerald hover:opacity-90 text-lg px-8 py-6 text-xl">
                <Link href="/products">
                  Shop All Flavors
                  <ShoppingBag className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 text-xl bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center gap-8 justify-center text-base lg:text-lg text-white/90">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-accent" />
                <span className="font-medium">Age Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-accent" />
                <span className="font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-accent" />
                <span className="font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground">
              Featured Flavors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular nicotine pouches, loved by customers across Ireland
            </p>
          </div>

          {/* Products Grid */}
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products available at the moment.</p>
            </div>
          )}

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why PUXX Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center mb-16">
            {/* Left side - Why PUXX Image */}
            <div className="mb-12 lg:mb-0">
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <Image
                  src="/images/marketing/puxx-why.png"
                  alt="PUXX nicotine pouches collection - 14 premium tobacco-free flavors with fast Ireland delivery"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>

            {/* Right side - Text Content */}
            <div>
              <div className="text-center lg:text-left mb-12">
                <h2 className="text-3xl sm:text-4xl font-heading text-foreground">
                  Why Choose PUXX?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Premium quality nicotine pouches designed for the modern Irish lifestyle
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Benefit 1 */}
                <div className="text-center lg:text-left group">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading mb-3">Tobacco-Free & Clean</h3>
                  <p className="text-muted-foreground">
                    100% tobacco-free pouches made with premium ingredients for a clean experience
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="text-center lg:text-left group">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading mb-3">14 Delicious Flavors</h3>
                  <p className="text-muted-foreground">
                    From refreshing mint to exotic fruits, find your perfect flavor match
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="text-center lg:text-left group">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                    <Smile className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading mb-3">Discreet & Convenient</h3>
                  <p className="text-muted-foreground">
                    Use anywhere, anytime without smoke or smell. Perfect for on-the-go
                  </p>
                </div>

                {/* Benefit 4 */}
                <div className="text-center lg:text-left group">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading mb-3">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    Carefully crafted pouches that deliver consistent satisfaction every time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-background">
        <div className="w-full">
          <div className="relative w-full aspect-[16/5] lg:aspect-[21/5] overflow-hidden">
            <Image
              src="/images/marketing/puxxbanner.jpg"
              alt="PUXX Ireland nicotine pouches banner - Premium quality tobacco-free products"
              fill
              className="object-cover object-center"
              sizes="100vw"
              loading="lazy"
              quality={85}
            />
          </div>
        </div>
      </section>

      {/* Worldwide Quality Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-emerald p-12 lg:p-16">
            <div className="relative z-10 text-center text-white">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-[16/9] w-full max-w-3xl mx-auto mb-8">
                  <Image
                    src="/images/marketing/BLACK-POUCHES-WORLDWIDE.png"
                    alt="PUXX nicotine pouches worldwide distribution - Premium quality trusted internationally, now in Ireland"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    loading="lazy"
                    quality={85}
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading mb-4 text-gradient-emerald">
                  Premium Quality Trusted Worldwide
                </h2>
                <p className="text-xl text-gradient-emerald mb-2 font-semibold">
                  Now Available in Ireland
                </p>
                <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                  Join thousands of satisfied customers who trust PUXX for their nicotine needs
                </p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg">
                  <Link href="/products">
                    Explore Our Range
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with PUXX is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white text-3xl font-heading mb-6">
                  1
                </div>
                <h3 className="text-2xl font-heading mb-4">Choose Your Flavor</h3>
                <p className="text-muted-foreground">
                  Browse our collection of 14 premium flavors and find the ones that suit your taste
                </p>
              </div>
              {/* Arrow connector - hidden on mobile */}
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white text-3xl font-heading mb-6">
                  2
                </div>
                <h3 className="text-2xl font-heading mb-4">Place Your Order</h3>
                <p className="text-muted-foreground">
                  Add your favorites to the cart and complete our secure checkout process
                </p>
              </div>
              {/* Arrow connector - hidden on mobile */}
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white text-3xl font-heading mb-6">
                3
              </div>
              <h3 className="text-2xl font-heading mb-4">Enjoy Delivered</h3>
              <p className="text-muted-foreground">
                Fast delivery to your door. Start enjoying your PUXX pouches right away
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-irish p-12 lg:p-16 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-6">
                Ready to Try PUXX?
              </h2>
              <p className="text-xl text-white/90 mb-4">
                Experience Ireland's finest nicotine pouches today
              </p>
              <p className="text-lg text-white/80 mb-8">
                Free delivery on orders over €150
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg">
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
