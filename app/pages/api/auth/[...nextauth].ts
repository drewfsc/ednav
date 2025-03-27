import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Magic } from '@magic-sdk/admin';

const magic = new Magic(process.env.MAGIC_SK);

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        // override signIn page so we can integrate with Magic
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/new-user',
    },
    providers: [
        CredentialsProvider({
            name: 'Magic Link',
            credentials: {
                didToken: { label: 'DID Token', type: 'text' },
            },
            async authorize(credentials: Record<'didToken', string> | undefined) {
                // validate magic DID token
                magic.token.validate(credentials?.didToken || '');

                // fetch user metadata
                const metadata = await magic.users.getMetadataByToken(credentials?.didToken || '');

                // return user info
                return {
                    id: metadata.issuer ?? '', // Ensure `id` is a non-null string
                    name: metadata.username ?? null,
                    email: metadata.email ?? null,
                    image: null,
                };
            },
        }),
    ],
});
