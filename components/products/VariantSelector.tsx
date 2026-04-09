'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/db/schema';

interface VariantSelectorProps {
  currentSlug: string;
  currentFlavor: string;
  currentStrength: string;
  region: string;
}

interface ProductsAPIResponse {
  success: boolean;
  count: number;
  products: Product[];
}

function parseMg(strength: string | null): number {
  if (!strength) return 0;
  const match = strength.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-14 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-20 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function VariantSelector({
  currentSlug,
  currentFlavor,
  currentStrength,
  region,
}: VariantSelectorProps) {
  const router = useRouter();
  const [strengthVariants, setStrengthVariants] = useState<Product[]>([]);
  const [flavourVariants, setFlavourVariants] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentFlavor && !currentStrength) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchVariants() {
      setLoading(true);

      const [strengthRes, flavourRes] = await Promise.all([
        currentFlavor
          ? fetch('/api/products?flavor=' + encodeURIComponent(currentFlavor))
          : Promise.resolve(null),
        currentStrength
          ? fetch('/api/products?strength=' + encodeURIComponent(currentStrength))
          : Promise.resolve(null),
      ]);

      if (cancelled) return;

      const [strengthData, flavourData]: [ProductsAPIResponse | null, ProductsAPIResponse | null] =
        await Promise.all([
          strengthRes ? (strengthRes.json() as Promise<ProductsAPIResponse>) : Promise.resolve(null),
          flavourRes ? (flavourRes.json() as Promise<ProductsAPIResponse>) : Promise.resolve(null),
        ]);

      if (cancelled) return;

      const byStrength = strengthData?.success ? strengthData.products : [];
      const byFlavour = flavourData?.success ? flavourData.products : [];

      // Sort strength variants ascending by mg value
      const sortedByStrength = [...byStrength].sort(
        (a, b) => parseMg(a.nicotineStrength) - parseMg(b.nicotineStrength)
      );

      setStrengthVariants(sortedByStrength);
      setFlavourVariants(byFlavour);
      setLoading(false);
    }

    fetchVariants().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [currentFlavor, currentStrength]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const hasMultipleStrengths = strengthVariants.length > 1;
  const hasMultipleFlavours = flavourVariants.length > 1;

  // No siblings — single variant product
  if (!hasMultipleStrengths && !hasMultipleFlavours) {
    return null;
  }

  function navigate(slug: string) {
    router.push('/' + region + '/products/' + slug);
  }

  return (
    <div className="space-y-4">
      {hasMultipleStrengths && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Strength</p>
          <div className="flex flex-wrap gap-2">
            {strengthVariants.map((variant) => {
              const isActive = variant.slug === currentSlug;
              return (
                <button
                  key={variant.slug}
                  onClick={() => navigate(variant.slug)}
                  className={
                    isActive
                      ? 'px-3 py-1.5 text-sm font-medium rounded bg-gray-900 text-white'
                      : 'px-3 py-1.5 text-sm font-medium rounded border border-gray-300 text-gray-700 hover:border-gray-900 transition-colors'
                  }
                  aria-current={isActive ? 'true' : undefined}
                >
                  {variant.nicotineStrength}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasMultipleFlavours && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Flavour</p>
          <div className="flex flex-wrap gap-2">
            {flavourVariants.map((variant) => {
              const isActive = variant.slug === currentSlug;
              return (
                <button
                  key={variant.slug}
                  onClick={() => navigate(variant.slug)}
                  className={
                    isActive
                      ? 'px-3 py-1.5 text-sm font-medium rounded bg-gray-900 text-white'
                      : 'px-3 py-1.5 text-sm font-medium rounded border border-gray-300 text-gray-700 hover:border-gray-900 transition-colors'
                  }
                  aria-current={isActive ? 'true' : undefined}
                >
                  {variant.flavor}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
