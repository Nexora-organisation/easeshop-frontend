"use client";

import {useParams} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Product from "@/types/products/product";
import axios from "axios";
import ProductSkeleton from "@/app/product/ProductSkeleton";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import toast from 'react-hot-toast';
import {useRouter} from "next/navigation";
import useCartStore from "@/stores/cartStore";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiUrlProxy = "/api/apiclient";

export default function ProductDetailPage() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const router = useRouter();
    const incrementItem =useCartStore((state)=>state.incrementItem)

    //recuperer un produit
    const {data: product, isLoading, isError, error} = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await axios.get<Product>(`${apiUrl}/products/${id}`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });

    //muter le panier l'ors de l'ajout d'un prooduit au panier
    const mutation = useMutation({
        mutationFn: (id: number) => addToCart(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["cart"]});
            toast.success("Produit ajouté au panier !");
            router.push("/");
            incrementItem();
        },
        onError: () => {
            toast.error("Le produit est deja present dans le pannier");
        },
    });

    function handleAddToCart(productId: number) {
        mutation.mutate(productId);
    }

    if (isLoading) return <ProductSkeleton/>;

    if (isError) return <div>Erreur : {error?.message}</div>;

    if (!product) return <div>Produit non trouvé</div>;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
                {/* Image */}
                <div className="mb-8 lg:mb-0">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={product.imageProductUrl || "/placeholder.svg"}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Infos */}
                <div className="lg:pt-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <div className="mb-6">
                        <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mb-8">
                        {/* Correction ici : on passe une fonction anonyme pour onClick */}
                        <Button size="lg" className="w-full sm:w-auto px-8" onClick={() => handleAddToCart(product.id)}>
                            Ajouter au panier
                        </Button>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>✓ Paiement sécurisé</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

async function addToCart(productId: number) {
    const response = await axios.post(`${apiUrlProxy}/cart/add/${productId}`,);
    return response.data;
}
