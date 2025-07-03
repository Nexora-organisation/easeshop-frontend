// lib/keycloak.ts

export async function getRefreshedToken(refresh_token: string) {
    const response = await fetch(`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
            client_id: process.env.AUTH_KEYCLOAK_ID!,
            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error_description || "Erreur inconnue");

    return {
        access_token: data.access_token,
        id_token: data.id_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
    };
}


export function expire(expires_at?: number): boolean {
    if (!expires_at) return true;
    const now = Math.floor(Date.now() / 1000);
    const buffer = 60;
    return now >= (expires_at - buffer);
}