"use client"
import { useSession } from 'next-auth/react';
import PerfectLayout from '../components/PerfectLayout';
import SignIn from '@/components/sign-in';

export default function Home() {

  const session = useSession();

  if (session.status !== 'authenticated') {
    return (
      <div>
        <SignIn/>
      </div>
    )
  }

  return (
    <PerfectLayout/>
  );
}
