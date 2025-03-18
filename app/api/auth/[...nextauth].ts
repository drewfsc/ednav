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
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
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
    pages: {
        signIn: "/auth/signin", // Customize sign-in page if needed
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    name: token.name,
                };
            }
            return session;
        },
        async jwt({ token, user, account, profile, trigger, isNewUser }: { token: any; user?: { id: string; username: string; name: string }; account?: any; profile?: any; trigger?: "signIn" | "signUp" | "update"; isNewUser?: boolean }) {
            if (user) {
                token = {
                    ...token,
                    id: user.id,
                    username: user.username,
                    name: user.name,
                };
            }
            return token;
        },
    },
};

// ✅ Fix: Export `GET` and `POST` separately for App Router compatibility

// @ts-ignore
const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };
