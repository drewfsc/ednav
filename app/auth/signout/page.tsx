'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const handleSignOut = async () => {
      setIsSigningOut(true);
      await signOut({ callbackUrl: '/' });
    };

    handleSignOut();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-10 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-100 to-white ring-2 ring-white rounded-xl shadow-xl shadow-zinc-200">
        <div className="flex justify-center mb-6">
          <Image
            src="/fsc-logo.png"
            alt="FSC Logo"
            width={150}
            height={60}
            priority
          />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">Signing out...</h1>

        <p className="text-center text-gray-700">
          {isSigningOut ? 'You are being signed out.' : 'You have been signed out.'}
        </p>
      </div>
    </div>
  );
}
