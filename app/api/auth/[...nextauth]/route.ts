import Email from 'next-auth/providers/email';
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from '@/lib/db';
import { connectToDatabase } from '@/lib/mongodb';

async function fetchAdditionalData(email: string) {
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });
  return {
    email,
    first_name,
    last_name,
    level: user?.level,
  };
}

const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: 'database' as const,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    // async signIn({ user, account, profile }: { user: User | AdapterUser; account: Account | null; profile?: Profile | undefined }) {
    //   return true;
    // },
    async session({ session, user }: { session: any; user: any }) {
      const additionalData = await fetchAdditionalData(user.email);
      session.user = { ...session.user, ...additionalData };
      return session;
    }
  }
}
const handler = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);