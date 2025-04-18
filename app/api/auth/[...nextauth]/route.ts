// app/api/auth/[...nextauth]/route.ts
import type { Session } from 'next-auth';
import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { connectToDatabase } from '@/lib/db';
import { User as DbUser } from '@/models/User'; // Import the default export and rename to avoid conflict
import { compare } from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      level?: string; // Changed from role to level to match your user model
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    level?: string;
    username?: string;
    // @ts-ignore
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    level?: string; // Add level to JWT interface
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectToDatabase();

          // Find the user by email OR username
          const user = await DbUser.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email }
            ]
          });

          if (!user) {
            return null;
          }

          // Check if password is plaintext number or hashed
          let isPasswordValid = false;

          if (/^\d+$/.test(user.password)) {
            // Simple numeric password comparison (like your "2903")
            isPasswordValid = credentials.password === user.password;
          } else {
            // Hashed password comparison
            isPasswordValid = await compare(credentials.password, user.password);
          }

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            level: user.level,
            username: user.username,
            role: user.level // Map level to role to satisfy the User interface
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      // Pass the role from the user object to the token
      if (user) {
        token.id = user.id;
        token.level = user.level;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Pass the level from the token to the session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.level = token.level as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };