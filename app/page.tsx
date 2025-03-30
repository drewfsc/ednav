"use client"
// import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PerfectLayout from '../components/PerfectLayout';

export default function Home() {
  const session = useSession();
  console.log(session);
  // if (session.status === 'authenticated'){
  //   redirect('/dashboard');
  // } else {
  //   redirect('/auth/signIn');
  // }
  return (
    <PerfectLayout/>
  );
}
