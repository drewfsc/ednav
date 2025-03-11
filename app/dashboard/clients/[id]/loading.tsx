export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 bg-base-300 animate-pulse rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-64 bg-base-300 animate-pulse rounded"></div>
        <div className="md:col-span-2 h-64 bg-base-300 animate-pulse rounded"></div>
      </div>
    </div>
  )
}

