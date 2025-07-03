import {NextResponse} from "next/server";
import {fetchProductsFromBackend} from "@/lib/api/products";

export async function GET() {

    try {
        const products = await fetchProductsFromBackend();
        return NextResponse.json(products);
    } catch (error) {
        console.error("Erreur API backend :", error);
        return NextResponse.json({error: "Erreur de chargement"}, {status: 500});
    }
}
