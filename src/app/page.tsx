"use client";

import {useQuery} from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import axios from "axios";
import Product from "@/types/products/product";

interface ErrorProps {
    message: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Homepage() {
    const {data, isLoading, isError, error} = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get<Product[]>(`${apiUrl}/products`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return <Loading/>;
    if (isError) return <Error message={(error as Error).message}/>;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </main>
    );
}


function Error({message}: ErrorProps) {
    return (
        <p className="text-center text-red-600">Erreur : {message}</p>
    );
}

function Loading() {
    return (

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({length: 8}).map((_, index) => (
                    <SkeletonProductCard key={index}/>
                ))}
            </div>
        </main>
    );
}

function SkeletonProductCard() {
    return (
        <div className="animate-pulse border rounded-md p-4 shadow-sm">
            <div className="bg-gray-300 h-48 w-full mb-4 rounded-md"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    );
}
