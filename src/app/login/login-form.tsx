"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { type LoginForm, loginSchema } from "@/lib/validationSchemas";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string[]>([]);
    const router = useRouter();
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true);
        setError([]);

        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        console.log("signIn response error raw:", res?.error);

        if (res?.error) {
            try {
                const parsedError = JSON.parse(res.error);
                Object.entries(parsedError).forEach(([field, message]) => {
                    if (field === "global") {
                        setError((prev) => [...prev, message as string]);
                    } else {
                        form.setError(field as keyof LoginForm, {
                            type: "server",
                            message: message as string,
                        });
                    }
                });
            } catch (e) {
                setError(["Une erreur inattendue est survenue"]);
            }
        } else {
            // Connexion réussie → redirection
            router.push("/");
        }

        setIsLoading(false);
    };

    return (
        <div className={cn("flex flex-col gap-6")}>
            {error.length > 0 && (
                <div className="w-full rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-700">
                    {error.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
            )}
            <Card>
                <CardHeader>
                    <CardTitle>Connexion à votre compte</CardTitle>
                    <CardDescription>
                        Entrez votre adresse email ci-dessous pour vous connecter
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Adresse email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="ex: utilisateur@exemple.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="●●●●●●●●"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full">
                                        {isLoading ? "Connexion en cours..." : "Se connecter"}
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Vous n&apos;avez pas encore de compte ?{" "}
                                <Link
                                    href="/register"
                                    className="underline underline-offset-4"
                                >
                                    Créer un compte
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
