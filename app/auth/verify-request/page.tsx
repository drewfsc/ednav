'use client';

import Image from 'next/image';

export default function VerifyRequest() {
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

        <h1 className="text-2xl font-bold mb-4 text-center">Check your email</h1>

        <p className="text-center text-gray-700 mb-4">
          A sign in link has been sent to your email address.
        </p>

        <p className="text-center text-gray-700">
          Please check your email (including spam folder) and click the link to sign in.
        </p>
      </div>
    </div>
  );
}
