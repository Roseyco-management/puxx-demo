export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="bg-white border-b mb-8 rounded-lg p-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border p-4">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-4 w-full bg-gray-200 rounded animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main content skeleton */}
          <div className="flex-1 min-w-0">
            {/* Search bar skeleton */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 h-9 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-[180px] h-9 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Product grid skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-lg border overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
