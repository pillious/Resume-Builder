import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
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
            if (account && account.provider === "google") {
                const prof: GoogleProfile = profile as GoogleProfile;
                if (prof.email_verified && prof.email.endsWith("@gmail.com"))
                    return true;
                else if (!prof.email_verified) return "/auth/verify";
            }
            return false;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/signin",
        verifyRequest: "/auth/verify",
    },
};

// https://next-auth.js.org/configuration/initialization
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    return await NextAuth(req, res, authOptions);
}
