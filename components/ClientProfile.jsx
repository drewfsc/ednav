"use client"
import React, {useEffect, useState} from "react"
import ClientProfileDetails from "./ClientProfileDetails";
import ClientProfileHeader from "/components/ClientProfileHeader";

export default function ClientProfile({client, setEditing}) {
    const [isMounted, setIsMounted] = useState(false);
    const [, setSelectedNavigator] = useState("");

    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            setSelectedNavigator(storedNavigator);
        }
    }, []);


    const [tabState] = useState("Profile");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className="w-full h-screen overflow-y-scroll no-scrollbar relative">
            <ClientProfileHeader setEditing={setEditing} client={client}/>
            <div className="w-full">
                <div className="w-full ">
                    <div className={`items-center gap-4`}>
                        <div className={`flex gap-10 pt-16 pr-6`}>
                            <div className={`flex-1 ${tabState === "Profile" ? '' : 'hidden'}`}>
                                <ClientProfileDetails client={client}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

