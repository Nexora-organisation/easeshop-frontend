import type { NextApiRequest, NextApiResponse } from "next";
import { createApiClient } from "@/lib/apiClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    const { id } = req.query;

    try {
        const apiClient = await createApiClient(req);
        const response = await apiClient.post(`/cart/add/${id}`, {
            productId: req.body.productId,
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
