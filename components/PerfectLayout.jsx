"use client";
import React from "react"
import LeftNavEntire from "@/components/LeftNavEntire";
// import {decrypt, logout} from "@/sharedFunctions";
// import {redirect} from "next/navigation";
import ClientTable from "@/components/ClientTable";
import {FepsLeftProvider} from "@/contexts/FepsLeftContext";
// import {cookies} from "next/headers";

export default function PerfectLayout(props) {
    // async function getSession() {
        // const session =  (await cookies()).get('session')?.value;
        // if (!session) return null;
        // return await decrypt(session);
    // }
  const { children } = props;
    // const session = await getSession();

    // Define empty functions to prevent errors
    const setEditing = () => {};
    let userClients = [];

    // const handleSubmit = async () => {
    //     "use server";
    //     await logout();
    //     redirect("/");
    // }

        return (
            <div className={`w-full h-screen overflow-hidden relative bg-base-100`}>
                <div className={`h-screen overflow-hidden flex`}>
                    <div className="flex max-h-screen overflow-hidden flex-1 ">
                        <div className={`w-30 md:w-60`}>
                            <FepsLeftProvider>
                            <LeftNavEntire setEditing={setEditing}/>
                            </FepsLeftProvider>
                        </div>
                        <div
                            className={`bg-base-100 w-50 md:w-90 overflow-y-scroll no-scrollbar flex-col h-screen border-r border-base-300 z-40 relative drop-shadow-lg`}>
                            <FepsLeftProvider>
                            <ClientTable userClients={userClients} setEditing={setEditing}/>
                            </FepsLeftProvider>
                        </div>
                        <div className={"max-h-full flex-1"}>
                            <main className="h-full flex">
                                <div className={`bg-base-100 flex-1 flex flex-col relative overflow-hidden`}>
                                    {children}
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        )
}
