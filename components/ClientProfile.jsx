"use client"
import React, {useEffect, useState} from "react"
import ClientProfileDetails from "./ClientProfileDetails";
import {useClients} from "@/contexts/ClientsContext";
import {XCircle} from "phosphor-react"

export default function ClientProfile({client, setEditing}) {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedNavigator, setSelectedNavigator] = useState("");

    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            setSelectedNavigator(storedNavigator);
        }
    }, [selectedNavigator]);

    const {selectedClient, setSelectedClient} = useClients();
    const [tabState] = useState("Profile");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className="w-full px-5 h-screen overflow-y-scroll no-scrollbar relative">
            <div
                className={`text-xl h-16 font-extralight absolute flex justify-between items-center px-6 left-0 right-0 bg-accent text-accent-content`}>
                <div className={`font-medium`}>{selectedClient && selectedClient.name}</div>
                <div>Case #: {selectedClient && selectedClient.caseNumber}</div>
                <div>Age Group: {selectedClient && selectedClient.group}</div>
                <div>Status: {selectedClient && selectedClient.clientStatus}</div>
                <div onClick={() => {
                    setEditing(null)
                    setSelectedClient(null)
                }}
                     className={``}>
                    <XCircle size={33} color={'#2f2f2f'}/>
                </div>
            </div>

            <div className="w-full">
                <div className="w-full ">
                    <div className={`items-center gap-4`}>
                        <div className={`flex gap-10 pt-20`}>
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

