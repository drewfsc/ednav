import NextAuth from 'next-auth';
import { authOptions } from './auth-options';

/**
 * NextAuth.js API route
 * @see https://next-auth.js.org/configuration/nextjs#advanced-usage
 */
const handler = NextAuth(authOptions);

// Export the handler functions for GET and POST requests
export { handler as GET, handler as POST };
