"use server";

import { signIn, signOut } from "../auth";
import { Button } from "./ui/button"
import React from "react";

const handleSignIn = async () => {
    signIn('google').then()
}

const handleSignOut = async () => {
    signOut().then()
}

export async function SignIn(props) {
    return (
    <form id="sign-in-form" action={() => handleSignIn()}>
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export async function SignOut(props) {
    return (
    <form id="sign-out-form" action={() => handleSignOut()} className="w-full">
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}
