"use client"
import {useSession} from "next-auth/react";
import React from "react";
import {LoginForm} from "@/components/login-form";
import {redirect} from "next/navigation";

export default function Home() {
    const { data: session } = useSession()
    if(!session) return (
        <div className={`flex w-full h-full items-center justify-center bg-primary text-base-content`}>
            <LoginForm/>
        </div>
    )
  return (
     redirect("/dashboard")
  )
}

