import { signOut } from "@/_auth"

export default function SignOutBtn() {
    return (
       <div onClick={() => signOut()}>goooooo</div>
    )
}
