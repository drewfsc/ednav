import NextAuth from 'next-auth';
import { authOptions } from './auth-options';

const handler = NextAuth(authOptions);

// Export as separate named constants for App Router
export const GET = handler.GET;
export const POST = handler.POST;
