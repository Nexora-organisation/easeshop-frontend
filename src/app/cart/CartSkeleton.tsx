import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
			<div className="h-10 w-48 mb-6">
				<Skeleton className="h-full w-full" />
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Colonne gauche : articles */}
				<div className="flex-1 space-y-6">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className="flex items-center gap-6 border-b pb-4">
							<Skeleton className="h-[100px] w-[100px] rounded-lg" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-5 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<Skeleton className="h-4 w-1/3" />
							</div>
							<Skeleton className="h-8 w-24" />
						</div>
					))}
				</div>

				{/* Colonne droite : total + bouton */}
				<div className="w-full lg:w-[300px] self-start sticky top-24">
					<div className="border p-6 rounded-lg shadow-md bg-gray-50 space-y-4">
						<Skeleton className="h-6 w-2/3 ml-auto" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
			</div>
		</main>
	);
}
