"use client";
import { useSession } from "next-auth/react";
import PerfectLayout from "../components/layout/PerfectLayout";
import SignIn from "@/components/sign-in";
import Loader from "@/components/layout/Loader";
import { useState } from "react";

export default function Home() {
  const { status } = useSession();
  const [loaded, setLoaded] = useState(false);
  if (status === "loading") {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }
  if (!loaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <img
          src="/images/logo.png"
          width={250}
          height={250}
          alt="EDNAV"
          className={`absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform`}
        />
        <Loader />
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <img src="/images/logo.png" width={160} height={160} alt="EDNAV" />
          <SignIn />
        </div>
      </div>
    );
  }

  return <PerfectLayout />;
}
