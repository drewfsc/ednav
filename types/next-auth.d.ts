// types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string; // This will hold 'user', 'IT', 'admin', etc.
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
  }
}