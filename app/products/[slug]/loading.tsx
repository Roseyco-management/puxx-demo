export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Skeleton */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Price */}
            <div className="h-12 bg-gray-200 rounded w-32 animate-pulse" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            </div>

            {/* Stock */}
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-6">
              <div className="h-12 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-14 bg-gray-200 rounded w-full animate-pulse" />
            </div>

            {/* Trust Badges */}
            <div className="pt-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-12">
          <div className="flex space-x-8 border-b">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
          <div className="py-8 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
