import React from "react";
import { ShoppingCart } from "lucide-react"; // ✅ Icône lucide

export default function EmptyCart() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-gray-500 px-4">
            <ShoppingCart className="w-24 h-24 mb-6 text-gray-400" strokeWidth={1.2} />
            <p className="text-xl font-semibold">Votre panier est vide</p>
            <p className="mt-2 text-center max-w-xs text-gray-400">
                Ajoutez des articles à votre panier pour commencer votre commande.
            </p>
        </main>
    );
}
