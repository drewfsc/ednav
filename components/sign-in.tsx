import { signIn } from "next-auth/react";

const SignInButton = () => (
  <button
    className={`bg-primary/50 hover:bg-primary border-primary text-primary-content mt-8 rounded-lg border-1 px-10 py-2`}
    onClick={() => signIn()}
  >
    Sign in
  </button>
);
export default SignInButton;
