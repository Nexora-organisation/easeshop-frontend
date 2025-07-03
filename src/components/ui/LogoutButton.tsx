"use client";

import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import {Button} from "@/components/ui/button";

export default function LogoutButton() {
    const { data: session } = useSession();

    const handleLogout = useCallback(async () => {
        // 1. Déconnecter NextAuth sans redirection automatique
        await signOut({ redirect: false });

        // 2. Récupérer le id_token de la session
        const idToken = session?.id_token;

        if (!idToken) {
            alert("ID Token non trouvé, impossible de se déconnecter proprement.");
            return;
        }

        // 3. Construire l'URL de logout Keycloak avec id_token_hint
        const keycloakLogoutUrl = new URL(
            "http://localhost:8080/realms/ease-shop-keycloack/protocol/openid-connect/logout"
        );
        keycloakLogoutUrl.searchParams.set(
            "post_logout_redirect_uri",
            "http://localhost:3000"
        );
        keycloakLogoutUrl.searchParams.set("id_token_hint", idToken);

        // 4. Rediriger vers Keycloak pour terminer la déconnexion
        window.location.href = keycloakLogoutUrl.toString();
    }, [session]);

    return <Button variant="outline" onClick={handleLogout}>Se déconnecter</Button>;
}
