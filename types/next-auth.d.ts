import "next-auth";
import "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      level?: string;
      username?: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    level?: string;
    username?: string;
    image?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    level?: string;
    username?: string;
  }
}
