// components/client/products-loading.tsx
export default function ProductsLoading() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border rounded-xl overflow-hidden">
            <div className="aspect-square bg-muted animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
              <div className="h-6 bg-muted animate-pulse rounded w-1/3"></div>
              <div className="h-10 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }