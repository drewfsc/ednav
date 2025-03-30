import Email from 'next-auth/providers/email';
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from '@/lib/db';

const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
}
const handler = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);