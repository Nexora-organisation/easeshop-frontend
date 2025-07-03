// next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        id_token?: string;  // On ajoute id_token optionnel dans Session
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id_token?: string;  // On ajoute id_token optionnel dans JWT (token)
    }
}
