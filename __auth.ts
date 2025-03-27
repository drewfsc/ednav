import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import {randomUUID, randomBytes} from "crypto";

export default NextAuth({
    providers: [
        EmailProvider({server: process.env.SENDGRID_API_KEY || "", from: process.env.SENDGRID_FROM_EMAIL || ""}),
    ],
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60,

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption
        async encode() {
            return ""; // Replace with your implementation that returns a string
        },
        async decode() {
            return null; // Replace with appropriate decoding logic as needed
        },
    }
}) as { handlers: any, auth: any, signIn: any, signOut: any}
