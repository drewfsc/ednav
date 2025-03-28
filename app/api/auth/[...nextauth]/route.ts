import NextAuth from 'next-auth';
import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import EmailProvider from 'next-auth/providers/email';
import {connectToDatabase} from '@/lib/mongodb';

const clientPromise = (async () => {
    const {client} = await connectToDatabase();
    return client;
})();

const authOptions = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
    },
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        })
    ],
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signIn',
        signOut: '/auth/signOut',
        error: '/auth/error',
        verifyRequest: '/auth/verifyRequest',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.phone = user.email;
            }
            return token;
        },
        async session({session, token}) {
            if (token?.sub && session.user) {
                (session.user as { id: string }).id = token.sub;
                if (token.phone) {
                    session.user.email = token.email;
                }
            }
            return session;
        },
        async signIn({  }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}/`;
            else if (new URL(url).origin === baseUrl) return `${baseUrl}/`;
            return baseUrl;
        }
    },
});
export const GET = NextAuth(authOptions).GET;
export const POST = NextAuth(authOptions).POST;