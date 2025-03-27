import NextAuth from 'next-auth';
import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import EmailProvider from 'next-auth/providers/email';
import {connectToDatabase} from '@/lib/mongodb';

const clientPromise = (async () => {
    const {client} = await connectToDatabase();
    return client;
})();

export const { GET, POST, handlers, auth } = NextAuth( {

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
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/signin/error',
        // verifyRequest: '/auth/signin/verify-request',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.phone = user.email; // Add phone for SMS auth
            }
            return token;
        },
        async session({session, token}) {
            if (token?.sub && session.user) {
                (session.user as { id: string }).id = token.sub;
                // Add phone number if available
                if (token.phone) {
                    session.user.email = token.email;
                }
            }
            return session;
        },
        // Handle the email verification callback
        async signIn({  }) {
            // Allow all email sign-ins to proceed
            return true;
        },
        // Handle the redirect after successful sign-in
        async redirect({ url, baseUrl }) {
            // Always redirect to dashboard after successful authentication
            if (url.startsWith("/")) return `${baseUrl}/dashboard`
            else if (new URL(url).origin === baseUrl) return `${baseUrl}/dashboard`
            return baseUrl
        }
    },
});
