"use client"
import { signIn } from "next-auth/react"

export function SignInCredentials() {
    return <button onClick={() => signIn("credentials", {redirectTo: "/dashboard"})}>Sign In</button>
}
