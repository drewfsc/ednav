"use client"
import { useSession } from 'next-auth/react';
import PerfectLayout from '../components/PerfectLayout';
import SignIn from '@/components/sign-in';

export default function Home() {

  const session = useSession();

  if (session.status !== 'authenticated') {
    return (
      <div className={`w-full h-screen flex justify-center items-center`}>
        <div className={`text-center`}>
          <img src="/images/logo.png" width={160} height={160} alt="EDNAV" />
          <SignIn/>
        </div>
      </div>
    )
  }

  return (
    <PerfectLayout/>
  );
}
