import { signOut } from "@/auth"
import {LogOutIcon} from "lucide-react";

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                // @ts-ignore
                await signOut({redirect: "/"})
            }}
        >
            <button type="submit" className={`flex items-center cursor-pointer text-primary-content`} aria-label={"Log Out"}><span className={`inline`}>Logout</span><LogOutIcon className={`inline ml-2`}/></button>
        </form>
    )
}
