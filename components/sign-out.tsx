import { signOut } from "next-auth/react"

export function SignOutButton() {
  return <button className={`bg-accent/40 hover:bg-secondary border-1 border-accent cursor-pointer text-accent-content py-1.5 rounded-lg`} onClick={() => signOut()}>Sign Out</button>
}