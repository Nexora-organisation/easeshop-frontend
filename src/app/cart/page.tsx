"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import EmptyCart from "./EmptyCart";
import useCartStore from "@/stores/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartSkeleton from "./CartSkeleton";

type CartItem = {
	id: number;
	quantity: number;
	productId: number;
	productName: string;
	productPrice: number;
	productImageUrl: string;
};

const apiUrlProxy = "/api/apiclient";

export default function CartPage() {
	const queryClient = useQueryClient();
	const { decrementItem } = useCartStore();
	const [deletingId, setDeletingId] = useState<number | null>(null);
	const router = useRouter();

	const {
		data: items = [],
		isLoading,
		isError,
		error,
	} = useQuery<CartItem[]>({
		queryKey: ["cart"],
		queryFn: async () => {
			const res = await axios.get<CartItem[]>(`${apiUrlProxy}/cart`);
			return res.data;
		},
		staleTime: 1000 * 60 * 5,
	});

	const removeMutation = useMutation({
		mutationFn: async (productId: number) => {
			await axios.delete(`${apiUrlProxy}/cart/remove/${productId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			toast.success("Produit supprimé du panier");
			setDeletingId(null);
		},
		onError: () => {
			toast.error("Erreur lors de la suppression");
		},
	});

	const handleOrder = async () => {
		try {
			// 1. Créer la commande
			const response = await axios.post(`${apiUrlProxy}/payments/cinetpay`);

			// 2. Invalider le cache des produits dans le panier
			queryClient.invalidateQueries({ queryKey: ["cart"] });

			// 3. Rediriger vers l'URL de paiement
			const paymentUrl = response.data.paymentUrl;
			router.push(paymentUrl);
		} catch (error) {
			toast.error("Erreur lors de la commande");
			console.error(error);
		}
	};

	const getTotal = () => items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

	const handleRemove = (productId: number) => {
		setDeletingId(productId);
		removeMutation.mutate(productId);
		if (!removeMutation.isError) {
			decrementItem();
		}
		setDeletingId(null);
	};

	if (isLoading) return <CartSkeleton />;
	if (isError) return <p className="text-red-500 p-4">{(error as Error)?.message || "Erreur lors du chargement du panier."}</p>;
	if (items.length === 0) return <EmptyCart />;

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  min-h-screen ">
			<h1 className="text-3xl font-bold mb-6">Votre panier</h1>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Colonne gauche : articles */}
				<div className="flex-1 space-y-6">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex items-center gap-6 border-b pb-4"
						>
							<Image
								src={item.productImageUrl || "/placeholder.svg"}
								alt={item.productName}
								width={100}
								height={100}
								className="rounded-lg object-cover"
							/>
							<div className="flex-1">
								<h2 className="text-lg font-semibold">{item.productName}</h2>
								<p className="text-gray-600">
									{item.quantity} × {item.productPrice.toFixed(2)} €
								</p>
								<p className="text-sm text-gray-800 font-medium mt-1">Total : {(item.productPrice * item.quantity).toFixed(2)} €</p>
							</div>
							<Button
								variant="destructive"
								className="text-sm"
								onClick={() => handleRemove(item.productId)}
								disabled={deletingId === item.productId && removeMutation.isPending}
							>
								{deletingId === item.productId && removeMutation.isPending ? "Suppression..." : "Supprimer"}
							</Button>
						</div>
					))}
				</div>

				{/* Colonne droite : total + bouton */}
				<div className="w-full lg:w-[300px] self-start sticky top-24">
					<div className="border p-6 rounded-lg shadow-md bg-gray-50">
						<h2 className="text-xl font-bold mb-4 text-right">Total général : {getTotal().toFixed(2)} €</h2>
						<Button
							className="w-full"
							disabled={removeMutation.isPending}
							onClick={handleOrder}
						>
							Passer la commande
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
