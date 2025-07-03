import React from "react";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mb-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.35m-12.9-4h13.35M7 13l-3-6"
                />
                <circle cx="10" cy="21" r="1" />
                <circle cx="18" cy="21" r="1" />
            </svg>
            <p className="text-xl font-semibold">Votre panier est vide</p>
            <p className="mt-2 text-center max-w-xs text-gray-400">
                Ajoutez des articles à votre panier pour commencer votre commande.
            </p>
        </div>
    );
}
