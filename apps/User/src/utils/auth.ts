import type { AuthOptions, User } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials"
import db from "@repo/db/client";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProviders({
            name: "Sign in with Email",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "Enter your phone number" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<"phone" | "password", string> | undefined) {
                const { phone, password }: { phone: string; password: string } = credentials || { phone: '', password: '' };

                if (!phone || !password) return null;

                const user = await db.user.findUnique({
                    where: { phone }
                });

                if (!user) return null;

                const verifyPass = await compare(password, user.password);

                if (!verifyPass) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone
                };
            },
        })
    ],
    callbacks: {
        jwt({ token, user }: any) {
            if (user) {
                token.email = user.email || "";
                token.id = user.id;
                token.name = user.name || "";
                token.phone = user.phone
            }

            return token
        },
        session({ token, session }: any) {
            if (session.user) {
                session.user.id = token.sub;
            }

            return session
        }
    },
    secret: process.env.JWT_SECRET || "secret",
    // pages: {
    //     "signIn": "/signin"
    // }
}