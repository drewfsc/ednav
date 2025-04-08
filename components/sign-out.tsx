import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className={`bg-accent/40 hover:bg-secondary border-accent text-accent-content cursor-pointer rounded-lg border-1 py-1.5`}
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
