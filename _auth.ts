// export const runtime = "nodejs";  // Force Node.js runtime

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {getCollection} from "@/lib/mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (!email || !password) {
                    return null;
                }

                const usersCollection = await getCollection("educationNavigators");
                const user = await usersCollection.findOne({ email });

                if (user && user.password === password) {
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                    };
                }

                return null;
            }
        }),
    ],

})
