import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import client from "@/lib/db";

async function fetchAdditionalData(email: string) {
  const { db } = await connectToDatabase();
  return await db.collection("users").findOne({ email });
}

const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const { email, password } = credentials ?? {};
        const user = await db.collection("users").findOne({ email, password });
        if (!user) return null;

        if (user) {
          return {
            id: user._id.toString(),
            email: user.email || "",
            name: user.name || "",
            level: user.level || "",
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    "session": async ({ session }: { session: any; user: any }) => {
      const additionalData = await fetchAdditionalData(session.user.email);
      session.user = { ...session.user, ...additionalData };
      return session;
    },
  },
};
NextAuth(authOptions);
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
