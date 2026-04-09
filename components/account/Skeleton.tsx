export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-gray-200 bg-white p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="h-8 w-20 rounded bg-gray-200"></div>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 h-6 w-48 rounded bg-gray-200"></div>
      <div className="h-[300px] rounded bg-gray-100"></div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 rounded-lg bg-gray-200"></div>
        <div className="h-10 w-24 rounded-lg bg-gray-200"></div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="bg-gray-50 p-4">
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-24 rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-4 flex-1 rounded bg-gray-200"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-48 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 rounded bg-gray-200"></div>
        <div className="h-6 w-20 rounded-full bg-gray-200"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      </div>
      <div className="h-10 w-full rounded-lg bg-gray-200"></div>
    </div>
  );
}
