import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../utils/mongodb";

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            console.log({ account, profile });
            if (account && account.provider === "google") {
                if (
                    profile.email_verified &&
                    profile.email.endsWith("@gmail.com")
                )
                    return true;

                // if email not verified, redirect.
                // res.redirect("/auth/verification");
            }
            return false; // Do different verification for other providers that don't have `email_verified`
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/signin",
        // signOut: "/auth/signout"
    },
};

// https://next-auth.js.org/configuration/initialization
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    return await NextAuth(req, res, authOptions);
}
