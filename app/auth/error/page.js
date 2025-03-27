'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Map error codes to user-friendly messages
  const errorMessages = {
    CredentialsSignin: 'Invalid email or PIN. Please try again.',
    Default: 'An error occurred during authentication.'
  };

  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="flex items-center justify-center min-h-screen p-10 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-600">Authentication Error</h1>

        <p className="text-center text-gray-700 mb-6">
          {errorMessage}
        </p>

        <div className="flex justify-center">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
