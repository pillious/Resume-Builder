import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../utils/mongodb";

// https://next-auth.js.org/configuration/initialization
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    return await NextAuth(req, res, {
        adapter: MongoDBAdapter(clientPromise),
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            }),
        ],
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signIn: "/auth/signin"
        }
    });
}
