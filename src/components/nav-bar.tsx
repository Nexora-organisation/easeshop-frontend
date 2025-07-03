"use client";

import {useSession} from "next-auth/react";
import LoginButton from "@/components/ui/LoginButton";
import LogoutButton from "@/components/ui/LogoutButton";
import Link from "next/link";
import {ShoppingCart} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import useCartStore from "@/stores/cartStore";
import {useEffect} from "react";

export default function NavBar() {
    const {data: session} = useSession();
    const countItem = useCartStore((state) => state.countItem);

    useEffect(() => {
        // Hydrater Zustand avec les données du backend
        useCartStore.getState().initializeCountItemCart();
    }, []);

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            EaseShop
                        </Link>
                    </div>

                    {/* Right section: Cart + Auth */}
                    <div className="flex items-center space-x-6">
                        {/* Cart */}
                        <div className="relative">
                            <Link href="/cart" className="relative">
                                <ShoppingCart className="h-6 w-6 text-gray-700"/>
                                <span className="sr-only">Shopping cart</span>
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                                >
                                    {countItem}
                                </Badge>
                            </Link>
                        </div>

                        {/* Auth */}
                        {session ? (
                            <>
                                <p className="text-gray-900 font-medium">{session.user?.name}</p>
                                <LogoutButton/>
                            </>
                        ) : (
                            <LoginButton/>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
