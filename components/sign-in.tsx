import { signIn } from "next-auth/react"

const SignInButton = () => <button onClick={() => signIn()}>Sign in</button>;
export default SignInButton;