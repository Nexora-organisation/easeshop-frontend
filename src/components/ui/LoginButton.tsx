"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginButton() {
    return (
        <Button variant="outline" onClick={() => signIn("keycloak",{
            prompt: "login"
        })}>
            Login
        </Button>
    );
}
