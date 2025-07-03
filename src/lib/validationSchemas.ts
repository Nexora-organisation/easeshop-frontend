import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
        .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
        .regex(/^[a-zA-Z0-9_]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores"),
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Veuillez entrer une adresse email valide"),
    password: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .max(100, "Le mot de passe ne peut pas dépasser 100 caractères"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Veuillez entrer une adresse email valide"),
    password: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .max(100, "Le mot de passe ne peut pas dépasser 100 caractères"),
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
