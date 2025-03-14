"use client"
import {useSession} from "next-auth/react";
import React from "react";
import {LoginForm} from "@/components/login-form";
import {redirect} from "next/navigation";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export default function Home() {
    // const { data: session } = useSession()
    // if(!session) return (
    //     <div>
    //         <div className={`flex w-full h-full items-center justify-center bg-primary text-base-content`}>
    //             <LoginForm/>
    //         </div>
    //         <PrivacyPolicy/>
    //     </div>
    //
    // )
  return (
     redirect("/dashboard")
  )
}

