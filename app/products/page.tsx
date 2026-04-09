'use client';

import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/lib/db/schema';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters, FilterOptions } from '@/components/products/product-filters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, SlidersHorizontal, ArrowUpDown, X, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Flavor category mapping
const FLAVOR_CATEGORIES = {
  mint: ['Cool Mint', 'Spearmint', 'Peppermint'],
  fruit: ['Cherry', 'Watermelon', 'Strawberry', 'Raspberry', 'Blueberry', 'Grape', 'Peach'],
  citrus: ['Citrus'],
  unique: ['Cola', 'Wintergreen', 'Applemint'],
};

type SortOption = 'name-asc' | 'name-desc' | 'strength-asc' | 'strength-desc' | 'price-asc' | 'price-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'strength-asc', label: 'Strength: Low to High' },
  { value: 'strength-desc', label: 'Strength: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    strength: null,
    flavorCategory: null,
    featured: false,
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.flavor?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Apply strength filter
    if (filters.strength) {
      filtered = filtered.filter(
        (product) => product.nicotineStrength === filters.strength
      );
    }

    // Apply flavor category filter
    if (filters.flavorCategory) {
      const categoryFlavors = FLAVOR_CATEGORIES[filters.flavorCategory as keyof typeof FLAVOR_CATEGORIES];
      filtered = filtered.filter(
        (product) => product.flavor && categoryFlavors.includes(product.flavor)
      );
    }

    // Apply featured filter
    if (filters.featured) {
      filtered = filtered.filter((product) => product.isFeatured);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'strength-asc': {
          const aStrength = parseInt(a.nicotineStrength?.replace('mg', '') || '0');
          const bStrength = parseInt(b.nicotineStrength?.replace('mg', '') || '0');
          return aStrength - bStrength;
        }
        case 'strength-desc': {
          const aStrength = parseInt(a.nicotineStrength?.replace('mg', '') || '0');
          const bStrength = parseInt(b.nicotineStrength?.replace('mg', '') || '0');
          return bStrength - aStrength;
        }
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  const handleClearFilters = () => {
    setFilters({
      strength: null,
      flavorCategory: null,
      featured: false,
    });
    setSearchQuery('');
  };

  const getSortLabel = () => {
    return SORT_OPTIONS.find((option) => option.value === sortBy)?.label || 'Sort by';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading our premium collection...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Video Hero Section */}
      <section className="relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Skip to Products Button */}
          <div className="text-center mb-8">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-black backdrop-blur-sm text-base px-8 transition-all"
            >
              <Link href="#shop">
                Skip to All Products →
              </Link>
            </Button>
          </div>

          {/* Video Cards */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {/* Grape Video */}
            <div className="group relative aspect-[9/16] md:aspect-[9/14] rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/Puxx Grape Video.mp4" type="video/mp4" />
              </video>

              {/* Overlay with CTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="text-center">
                  <h3 className="text-3xl lg:text-4xl font-heading text-white mb-3 drop-shadow-lg">
                    Bold Grape Flavor
                  </h3>
                  <p className="text-white/90 mb-5 text-base lg:text-lg drop-shadow-md">
                    Intense & Smooth
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-purple-900 hover:bg-white/90 font-bold shadow-xl text-base"
                  >
                    <Link href="/products#shop" onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                        if (searchInput) {
                          searchInput.value = 'grape';
                          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                      }, 500);
                    }}>
                      Explore Grape →
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>

            {/* Strawberry Video */}
            <div className="group relative aspect-[9/16] md:aspect-[9/14] rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/Puxx Strawberry Video.mp4" type="video/mp4" />
              </video>

              {/* Overlay with CTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="text-center">
                  <h3 className="text-3xl lg:text-4xl font-heading text-white mb-3 drop-shadow-lg">
                    Sweet Strawberry
                  </h3>
                  <p className="text-white/90 mb-5 text-base lg:text-lg drop-shadow-md">
                    Fresh & Fruity
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-pink-900 hover:bg-white/90 font-bold shadow-xl text-base"
                  >
                    <Link href="/products#shop" onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                        if (searchInput) {
                          searchInput.value = 'strawberry';
                          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                      }, 500);
                    }}>
                      Explore Strawberry →
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Section */}
      <div id="shop" className="bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar filters - Desktop Only */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl border shadow-md p-5">
                  <h2 className="text-lg font-heading mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    Filters
                  </h2>
                  <ProductFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Compact Controls */}
              <div className="flex flex-col gap-3 mb-6">
                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search flavors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Filters and Sort - Horizontal on Mobile */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex-1"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex-1 lg:w-auto lg:min-w-[180px]">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">{getSortLabel()}</span>
                        <span className="sm:hidden">Sort</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      {SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile filters dropdown */}
                {showMobileFilters && (
                  <div className="lg:hidden bg-white rounded-xl border shadow-md p-4">
                    <ProductFilters
                      filters={filters}
                      onFilterChange={setFilters}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                )}

                {/* Compact results count - only show if filtering */}
                {(searchQuery || filters.strength || filters.flavorCategory || filters.featured) && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> results
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-primary h-8"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Product grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <ProductGrid products={filteredAndSortedProducts} />
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-heading mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    {products.length === 0 ? 'Configure your database to see products' : 'Try different filters'}
                  </p>
                  {products.length > 0 && (
                    <Button onClick={handleClearFilters} className="gradient-emerald">
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
