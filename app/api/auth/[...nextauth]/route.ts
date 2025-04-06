import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import Credentials from 'next-auth/providers/credentials';
import Email from 'next-auth/providers/email';
import { connectToDatabase } from '@/lib/mongodb';
import client from '@/lib/db';

async function fetchAdditionalData(email: string) {
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });
  return {
    email,
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    level: user?.level ?? null,
    id: user?._id?.toString() ?? null,
  };
}

const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const { username } = credentials ?? {};
        const user = await db.collection('users').findOne({ username });
        console.log(user);
        return user ? {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          level: user.level
        } : null;
      }
    })
  ],
  session: {
    strategy: 'database' as const,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    session: async ({ session, user }: { session: any; user: any }) => {
      const additionalData = await fetchAdditionalData(user.email);
      session.user = { ...session.user, ...additionalData };
      return session;
    }
  }
}

const handler = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);