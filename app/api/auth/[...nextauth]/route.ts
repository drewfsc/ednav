import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { Magic } from '@magic-sdk/admin';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/mongodb';

// Initialize Magic instance
const magic = new Magic(process.env.MAGIC_SK);

// Create a promise for the MongoDB client
const clientPromise = (async () => {
  const { client } = await connectToDatabase();
  return client;
})();

// Configure NextAuth handler
const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: {
      strategy: 'jwt', // Changed from 'database' to 'jwt' for better compatibility
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.JWT_SECRET,
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/signin/error',  // Updated to match the actual error path
      verifyRequest: '/auth/verify-request',
    },
    providers: [
      // Email Magic Link provider
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER || '',
          port: 587,
          auth: {
            user: process.env.EMAIL_SERVER_USER || '',
            pass: process.env.EMAIL_SERVER_PASSWORD || '',
            // Use this for SendGrid if needed
            apiKey: process.env.SENDGRID_API_KEY || '',
          },
        },
        from: process.env.EMAIL_FROM || 'noreply@example.com',
      }),
      // Magic SDK provider
      CredentialsProvider({
        name: 'Magic Link',
        credentials: {
          didToken: { label: 'DID Token', type: 'text' },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.didToken) {
              return null;
            }

            // Validate Magic DID token
            magic.token.validate(credentials.didToken);

            // Get user metadata from Magic
            const metadata = await magic.users.getMetadataByToken(credentials.didToken);

            // Return user info
            return {
              id: metadata.issuer || '',
              email: metadata.email || '',
              name: metadata.email?.split('@')[0] || '',
            };
          } catch (error) {
            console.error('Magic Link authentication error:', error);
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        // Add user data to token
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        // Add user ID to session from token
        if (token?.sub && session.user) {
          (session.user as { id: string }).id = token.sub;
        }
        return session;
      },
    },
});

export { handler as GET, handler as POST };
