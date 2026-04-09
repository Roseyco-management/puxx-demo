/**
 * PUXX Ireland Image Component Usage Examples
 *
 * This file contains comprehensive examples of how to use all image components
 * in the PUXX Ireland image library.
 *
 * Copy and paste these examples into your components as needed.
 */

import {
  LogoImage,
  HeroImage,
  HeroImageWithOverlay,
  ProductImage,
  ProductImageGrid,
  MarketingImage,
  MarketingSection,
  BackgroundImage,
  BackgroundPattern,
} from '@/components/images';

// ============================================================================
// Example 1: Header with Logo
// ============================================================================

export function HeaderExample() {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto px-4">
        <LogoImage
          variant="white"
          size="medium"
          href="/"
          priority
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}

// ============================================================================
// Example 2: Light Background with Black Logo
// ============================================================================

export function LightHeaderExample() {
  return (
    <header className="bg-white border-b py-4">
      <div className="container mx-auto px-4">
        <LogoImage
          variant="black"
          size="medium"
          href="/"
          priority
        />
      </div>
    </header>
  );
}

// ============================================================================
// Example 3: Hero Banner (Simple)
// ============================================================================

export function SimpleHeroExample() {
  return (
    <HeroImage
      variant="fruit"
      priority
      height={600}
      className="w-full"
    />
  );
}

// ============================================================================
// Example 4: Hero Banner with Overlay and Content
// ============================================================================

export function HeroWithContentExample() {
  return (
    <HeroImageWithOverlay
      variant="fruit"
      priority
      overlayOpacity={0.5}
      overlayGradient="to-bottom"
      height={700}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Premium Nicotine Pouches
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Delivered Across Ireland
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
          Shop Now
        </button>
      </div>
    </HeroImageWithOverlay>
  );
}

// ============================================================================
// Example 5: Product Display (Single)
// ============================================================================

export function SingleProductExample({ product }: { product: any }) {
  return (
    <div className="max-w-md mx-auto">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        size="large"
        priority
        className="rounded-lg shadow-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-3xl font-bold mt-4">€{product.price}</p>
    </div>
  );
}

// ============================================================================
// Example 6: Product Grid
// ============================================================================

export function ProductGridExample({ products }: { products: any[] }) {
  const handleProductClick = (productId: string) => {
    // Navigate to product page
    window.location.href = `/products/${productId}`;
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Products
        </h2>
        <ProductImageGrid
          products={products}
          columns={3}
          size="medium"
          onProductClick={handleProductClick}
        />
      </div>
    </section>
  );
}

// ============================================================================
// Example 7: Marketing Section (Why PUXX)
// ============================================================================

export function WhyPuxxExample() {
  return (
    <MarketingSection
      variant="whyPuxx"
      title="Why Choose PUXX?"
      description="PUXX offers premium nicotine pouches with a wide range of flavors and strengths. Our products are tobacco-free, discreet, and perfect for on-the-go use."
      imagePosition="left"
      containerClassName="bg-gray-50"
    >
      <ul className="space-y-3 mb-6">
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          100% Tobacco-Free
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          Wide Range of Flavors
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          Fast Delivery Across Ireland
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          Premium Quality Guaranteed
        </li>
      </ul>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
        Learn More
      </button>
    </MarketingSection>
  );
}

// ============================================================================
// Example 8: Marketing Section (Reversed)
// ============================================================================

export function GlobalReachExample() {
  return (
    <MarketingSection
      variant="pouchesWorldwide"
      title="Available Worldwide"
      description="PUXX is trusted by customers around the globe. We ship internationally and provide excellent customer service."
      imagePosition="right"
    >
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">50+</p>
          <p className="text-gray-600">Countries</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">100K+</p>
          <p className="text-gray-600">Customers</p>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
        Order Now
      </button>
    </MarketingSection>
  );
}

// ============================================================================
// Example 9: Background Image with Content
// ============================================================================

export function BackgroundSectionExample() {
  return (
    <BackgroundImage
      variant="tradingPlatform"
      overlay={0.7}
      overlayColor="black"
      minHeight="600px"
      priority={false}
    >
      <div className="container mx-auto px-4 py-20 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Premium Quality, Every Time
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience the difference with PUXX. Our nicotine pouches are crafted
          with care and delivered with excellence.
        </p>
        <button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg text-lg font-semibold">
          Explore Products
        </button>
      </div>
    </BackgroundImage>
  );
}

// ============================================================================
// Example 10: Background Pattern (Subtle)
// ============================================================================

export function PatternSectionExample() {
  return (
    <BackgroundPattern
      variant="tradingPlatform"
      opacity={0.05}
      patternSize="200px"
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* FAQ content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">
              What are nicotine pouches?
            </h3>
            <p className="text-gray-700">
              Nicotine pouches are small, tobacco-free pouches containing nicotine...
            </p>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
}

// ============================================================================
// Example 11: Complete Homepage Layout
// ============================================================================

export function CompleteHomepageExample({ products }: { products: any[] }) {
  return (
    <main>
      {/* Header */}
      <header className="bg-black py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <LogoImage variant="white" size="medium" href="/" priority />
          <nav className="hidden md:flex gap-6 text-white">
            <a href="/products">Products</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroImageWithOverlay
        variant="fruit"
        priority
        overlayOpacity={0.4}
        overlayGradient="to-bottom"
        height={700}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Premium Nicotine Pouches
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Delivered Across Ireland
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
          Shop Now
        </button>
      </HeroImageWithOverlay>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured Products
          </h2>
          <ProductImageGrid
            products={products.slice(0, 6)}
            columns={3}
            size="medium"
            onProductClick={(id) => (window.location.href = `/products/${id}`)}
          />
        </div>
      </section>

      {/* Why PUXX Section */}
      <MarketingSection
        variant="whyPuxx"
        title="Why Choose PUXX?"
        description="Premium quality, wide selection, and fast delivery."
        imagePosition="left"
        containerClassName="bg-gray-50 py-16"
      >
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
          Learn More
        </button>
      </MarketingSection>

      {/* Background CTA Section */}
      <BackgroundImage
        variant="tradingPlatform"
        overlay={0.7}
        minHeight="500px"
      >
        <div className="container mx-auto px-4 py-20 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers across Ireland.
          </p>
          <button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg text-lg font-semibold">
            Shop Now
          </button>
        </div>
      </BackgroundImage>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <LogoImage variant="white" size="small" className="mx-auto mb-6" />
          <p className="text-gray-400">
            © 2025 PUXX Ireland. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

// ============================================================================
// Example 12: Loading States
// ============================================================================

export function LoadingStatesExample() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Show skeleton while loading */}
      <ProductImage
        src="/placeholder.jpg"
        alt="Loading product"
        size="medium"
        showSkeleton={true}
      />

      {/* No skeleton */}
      <ProductImage
        src="/placeholder.jpg"
        alt="Loading product"
        size="medium"
        showSkeleton={false}
      />

      {/* Custom fallback */}
      <ProductImage
        src="/broken-url.jpg"
        alt="Error loading"
        size="medium"
        fallback="/images/placeholders/product-placeholder.webp"
      />
    </div>
  );
}

// ============================================================================
// Example 13: Responsive Logo Sizes
// ============================================================================

export function ResponsiveLogoExample() {
  return (
    <div className="space-y-4">
      {/* Small logo for mobile */}
      <div className="md:hidden">
        <LogoImage variant="white" size="small" href="/" />
      </div>

      {/* Medium logo for tablet */}
      <div className="hidden md:block lg:hidden">
        <LogoImage variant="white" size="medium" href="/" />
      </div>

      {/* Large logo for desktop */}
      <div className="hidden lg:block">
        <LogoImage variant="white" size="large" href="/" />
      </div>
    </div>
  );
}

// ============================================================================
// Export all examples
// ============================================================================

export const examples = {
  HeaderExample,
  LightHeaderExample,
  SimpleHeroExample,
  HeroWithContentExample,
  SingleProductExample,
  ProductGridExample,
  WhyPuxxExample,
  GlobalReachExample,
  BackgroundSectionExample,
  PatternSectionExample,
  CompleteHomepageExample,
  LoadingStatesExample,
  ResponsiveLogoExample,
};

export default examples;
