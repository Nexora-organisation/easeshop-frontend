// components/ProductCard.tsx
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type Product = {
    id: string | number;
    name: string;
    price: number;
    imageProductUrl?: string;
};

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({product}: ProductCardProps) {
    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Image du produit */}
            <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                    src={product.imageProductUrl || "https://picsum.photos/seed/5ef55434-27ce-44c6-acb6-49b72e678b9c/300/300"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
            </div>

            {/* Infos produit */}
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>

                <Link href={`/product/${product.id}`}>
                    <Button className="w-full" variant="outline">
                        Voir les détails
                    </Button>
                </Link>
            </div>
        </div>
    );
}
