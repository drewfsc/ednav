// "use client"
// import { signIn } from "next-auth/react"

export function SignIn() {
    // const sendgridAction = (formData: FormData) => {
    //     signIn("sendgrid", Object.fromEntries(formData.entries())).then( )
    // }

    return (
        <form>
            <label htmlFor="email-sendgrid">
                Email
                <input type="email" id="email-sendgrid" name="email" />
            </label>
            <input type="submit" value="Signin with Sendgrid" />
        </form>
    )
}
