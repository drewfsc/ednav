import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
// import {getCollection} from "@/lib/mongodb";
// import { userFromDB } from "./utils/getUserFromDb"
// import { saltAndHashPassword } from "@/utils/password"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async () => {
                let user = null

                // const pwHash = saltAndHashPassword(credentials.password)

                // user = await getCollection("educationNavigators").then(collection =>
                //     collection.findOne({ email: credentials.email }))
user = {_id: "123", email: "<EMAIL>", name: "test"}
                if(!user) {
                    throw new Error("Invalid username or password")
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name || null,
                }
            }
        }),
    ],

})
