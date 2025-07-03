export default function ProductSkeleton() {
    const skeletons = Array.from({ length: 6 })

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skeletons.map((_, i) => (
                <div key={i} className="border p-4 rounded animate-pulse space-y-4">
                    <div className="w-full h-40 bg-gray-300 rounded" />
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
            ))}
        </div>
    )
}
