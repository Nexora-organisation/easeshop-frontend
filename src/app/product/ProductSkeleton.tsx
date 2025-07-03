export default function ProductSkeleton() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
                {/* Skeleton Image */}
                <div className="mb-8 lg:mb-0">
                    <div className="aspect-square rounded-lg bg-gray-300" />
                </div>

                {/* Skeleton Text */}
                <div className="lg:pt-8 space-y-6">
                    <div className="h-10 bg-gray-300 rounded w-3/4" /> {/* titre */}
                    <div className="h-8 bg-gray-300 rounded w-1/4" />  {/* prix */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-5/6" />
                    </div>
                    <div className="h-12 bg-gray-300 rounded w-1/2" /> {/* bouton */}
                    <div className="space-y-2 pt-6 border-t border-gray-200">
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-4/5" />
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                    </div>
                </div>
            </div>
        </main>
    );
}
