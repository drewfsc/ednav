
import { signIn } from "@/_auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                // @ts-ignore
                await signIn("google", {redirect: "/dashboard"})
            }}
        >
            <button type="submit">Signin with Google</button>
        </form>
    )
}
