"use client"
import { useSession } from 'next-auth/react';
import PerfectLayout from '../components/PerfectLayout';
import SignIn from '@/components/sign-in';

export default function Home() {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    // You could show a full-screen spinner, skeleton, or nothing.
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (status !== 'authenticated') {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center">
          <img src="/images/logo.png" width={160} height={160} alt="EDNAV" />
          <SignIn />
        </div>
      </div>
    );
  }

  return <PerfectLayout />;
}
