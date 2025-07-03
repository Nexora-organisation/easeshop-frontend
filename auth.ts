import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import {getRefreshedToken} from "@/lib/keycloak";
import {expire} from "@/lib/keycloak";

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [
        KeycloakProvider({
            clientId: process.env.AUTH_KEYCLOAK_ID,
            clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
            issuer: process.env.AUTH_KEYCLOAK_ISSUER,
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.refreshtoken = account.refresh_token;
                token.expires_at = Math.floor(Date.now() / 1000) + (account.expires_in ?? 300);

                if (expire(token.expires_at as number)) {
                    const refreshedConfig = await getRefreshedToken(token.refreshtoken as string);
                    token.access_token = refreshedConfig.access_token;
                    token.refreshtoken = refreshedConfig.refresh_token;
                    token.id_token = refreshedConfig.id_token;
                    token.expires_at = Math.floor(Date.now() / 1000) + (refreshedConfig.expires_in ?? 300);
                    console.log("token", token);
                }

            }

            return token;
        },
        async session({session, token}) {
            session.id_token = token.id_token as string;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
})

