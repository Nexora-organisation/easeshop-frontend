import axios from "axios";
import Product from "@/types/products/product";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProductsFromBackend(): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${apiUrl}/products`,);
    return response.data;
}
