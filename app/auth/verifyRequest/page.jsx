'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginForm from "../../../components/LoginForm";

export default function VerifyRequestPage() {
  const {status } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async ({email}) => {
    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/auth/callback',
      });

      if (result?.error) {
        setError('Invalid email or PIN');
      } else {
        // Force a refresh to update the session
        router.refresh();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An error occurred during authentication');
    }
  };

  // If authenticated, show a simple dashboard
  if (status === 'authenticated') {
    return (

      <div>
        <h1>Signin</h1>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name || session.user.email}</h1>
          <p>You are now logged in.</p>
        </div>
      </div>
    );
  }

  // If not authenticated or still loading, show login form
  return (
    <div className={`overflow-y-scroll no-scrollbar`}>
      <LoginForm
        action={handleSubmit}
        title="Sign in to Success Tracker"
        userData={null}
      />
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
}
