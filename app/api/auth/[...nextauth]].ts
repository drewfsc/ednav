import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCollection } from "@/lib/mongodb";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "text" },
            },
            async authorize(credentials) {
                const username = credentials?.username;
                const password = credentials?.password;

                if (!username || !password) return null;

                const usersCollection = await getCollection("educationNavigators");
                const user = await usersCollection.findOne({ username });

                if (user && user.password === password) {
                    return {
                        id: user._id.toString(),
                        username: user.username,
                        name: user.name,
                    };
                }

                return null;
            },
        }),
    ],
};

// ✅ App Router requires exporting `GET` and `POST` handlers separately
export const { auth, handlers } = NextAuth(authOptions);

export const GET = handlers.GET;
export const POST = handlers.POST;
