'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Magic } from 'magic-sdk';
import Image from 'next/image';

// Initialize Magic instance on client-side
const magic = typeof window !== 'undefined'
  ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PK || '')
  : null;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      setIsLoading(true);
      setMessage('Sending magic link...');

      // Option 1: Use Magic SDK directly
      if (magic) {
        const didToken = await magic.auth.loginWithMagicLink({ email });

        // Sign in with Next-Auth using the DID token

        const result = await signIn('credentials', {
          didToken,
          redirect: true,
          callbackUrl: '/dashboard',
        });
      }
      // Option 2: Use Next-Auth's email provider
      else {
        await signIn('email', {
          email,
          redirect: true,
          callbackUrl: '/dashboard',
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen absolute inset-0 w-full h-full bg-base-100 bg-gradient-to-br from-transparent blend-color to-info">
      <div className={"flex items-center justify-center min-h-screen absolute inset-0 w-full h-full bg-base-100 bg-gradient-to-tl from-transparent to-primary"}>
        <div
            className="relative z-50 w-full max-w-md p-8 bg-gradient-to-br from-gray-100/70 to-white/70 ring-2 ring-white rounded-xl shadow-2xl border-t-4 border-primary/20 shadow-zinc-500/50 bg-opacity-40">
          <div className="flex justify-center mb-6">
            <Image
                src="/images/logo.png"
                alt="FSC Logo"
                width={512}
                height={512}
                className="max-h-50 max-w-50"
                priority={true}
            />
          </div>

          <h1 className="text-4xl  mb-4 text-center  uppercase"><span className={`text-secondary`}>Success</span>
            <span className={`text-warning`}>Tracker</span></h1>
          <div className="flex w-full flex-col">
            <div className="divider my-10">Please enter your email.</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded bg-base-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
              />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-accent text-white rounded hover:bg-accent/60 disabled:bg-blue-300"
                disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          {message && (
              <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
